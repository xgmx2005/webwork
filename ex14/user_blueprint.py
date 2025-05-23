from flask import Blueprint,request,jsonify,abort
from models import db,User,Token
import jwt
from datetime import datetime,timedelta
from utils.res import api_response
from utils.scrypt import generate_pwd_hash,check_pwd_hash
from utils.auth import token_required
import os

user_bp =Blueprint('user',__name__)
# 从配置文件中获取JWT密钥
from config import Config
jwt_secret_key = Config.JWT_SECRET_KEY


# 用户注册
@user_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    res = None
    if not data or "username" not in data or "password" not in data:
        return api_response(400, "请求注册的用户信息丢失", res)
    username = data["username"]
    password = data["password"]
    print(username,password)
    if User.query.filter_by(username=username).first():
        return api_response(409, "用户名已存在", res)

    salt = os.urandom(16)  # 生成随机盐
    hashed_password = generate_pwd_hash(password, salt)
    new_user = User(username=username, password=hashed_password, salt=salt)
    db.session.add(new_user)
    db.session.commit()
    return api_response(200, "用户注册成功", res)

# 用户登录
@user_bp.route("/login",methods=["POST"])
def login():
    data =request.get_json()or{}
    username=data.get("username")
    password=data.get("password")
    if not username or not password:
        return api_response(400,"用户名或密码不能为空",None)
    user=User.query.filter_by(username=username).first()
    if not user or not check_pwd_hash(password, user.password, user.salt):
        return api_response(401, "用户名或密码错误", None)
    payload = {
        "user_id": user.id,
        "exp": datetime.utcnow() + timedelta(days=1),
        "iat":datetime.utcnow()
    }
    token=jwt.encode(payload, jwt_secret_key, algorithm="HS256")
    return api_response(200, "登录成功", {"token": token})


# 3. 获取当前用户信息
@user_bp.route("/userinfo", methods=["GET"])
@token_required
def get_user_info():
    #token_required装饰器验证通过后继续执行
    return api_response(
        200, "你已通过 token 验证，访问成功", {"msg": "你好，认证用户！"}
    )
# 4. 获取所有用户信息
@user_bp.route("/users", methods=["GET"])
@token_required
def list_users():
    users = User.query.all()
    data=[{"id":u.id,"username":u.username}for u in users]
    return api_response(200, "获取用户列表成功", data)  


# 7.更新单个用户信息 -----
@user_bp.route("/users/<int:user_id>", methods=["PUT"])
@token_required
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return api_response(404, "用户不存在")

    data = request.get_json() or {}
    new_name = data.get("username")
    new_pwd = data.get("password")

    if new_name:
        # 检查新用户名是否被占用
        if User.query.filter(User.username == new_name, User.id != user_id).first():
            return api_response(409, "用户名已存在")
        user.username = new_name

    if new_pwd:
        # 更新密码需重新生成 hash
        salt = os.urandom(16)
        user.password = generate_pwd_hash(new_pwd, salt)
        user.salt = salt

    db.session.commit()
    return api_response(200, "更新成功", {"id": user.id, "username": user.username})


# 6.删除用户 -----
@user_bp.route("/users/<int:user_id>", methods=["DELETE"])
@token_required
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return api_response(404, "用户不存在")
    db.session.delete(user)
    db.session.commit()
    return api_response(200, "删除成功", {"id": user_id})
