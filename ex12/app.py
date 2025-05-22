import secrets
import jwt
import datetime
from flask import Flask, jsonify, render_template_string, request
from flask_cors import CORS

app = Flask(__name__)

# 设置密钥和过期时间（用于签名））
SECRET_KEY = "zjvivi13107"
EXPRIRATTION = datetime.timedelta(hours=1)
# 模拟的用户数据库
users_db = {
    "user": "zjvivi", 
    "password": "123456"
    }


# 使用JWT生成token
def generate_jwt_token(user_info):
    utc_now = datetime.datetime.now(datetime.timezone.utc)
    payload = {
        "user": user_info,
        "exp": utc_now + EXPRIRATTION,  #  设置token的过期时间
        "iat": utc_now,  # 签发时间
        "iss": "ex11",  # 签发者
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token


@app.route("/")
def hello():
    return "Hello World!"


@app.route("/greet/<name>")
def greet(name):
    return f"Hello, {name}!"


def api_response(code, message, data=None):
    response = {"code": code, "message": message, "data": data}
    return jsonify(response)


@app.route("/api/foods", methods=["GET"])
def get_foods():
    foods = [
        {
            "foodName": "沙拉碗",
            "foodPrice": 25,
            "foodImage": "images/food1.png",
            "foodDescription": "新鲜制作的沙拉碗，选用当季蔬菜与优质生菜搭配，富含膳食纤维和多种维生素。低脂酱料让口感更清爽，是健康饮食的首选。",
            "stock": 1,
        },
        {
            "foodName": "杂粮碗",
            "foodPrice": 22,
            "foodImage": "images/food2.png",
            "foodDescription": "杂粮碗由五种精选粗粮精心熬制而成，富含丰富的碳水化合物和微量元素，有助于增强饱腹感，适合健身人士和追求健康的你。",
            "stock": 80,
        },
        {
            "foodName": "酸奶碗",
            "foodPrice": 18,
            "foodImage": "images/food3.png",
            "foodDescription": "酸奶碗采用天然发酵酸奶，搭配少量蜂蜜和坚果，口感醇厚，富含益生菌，帮助调节肠道菌群，提升消化能力。",
            "stock": 120,
        },
        {
            "foodName": "时令果汁",
            "foodPrice": 15,
            "foodImage": "images/food4.png",
            "foodDescription": "时令果汁选用当季水果鲜榨而成，无添加糖分，保留水果原汁原味，营养丰富，是补充维生素的理想选择。",
            "stock": 150,
        },
    ]
    return api_response(200, "获取食物成功", foods)


@app.route("/api/login", methods=["POST"])
def login():
    username = request.json.get("userName")
    password = request.json.get("userPwd")
    # if username =='zjvivi' and password =='123456':
    if users_db["user"] == username and users_db["password"]== password:
        # token =generate_token()#生成随机token
        token = generate_jwt_token({"username": username})
        return api_response(200, "登录成功", {"token": token})
    else:
        return api_response(401, "用户名或密码错误")


# 用于生成安全的token
def generate_token():
    return secrets.token_hex(16)


# 判断用户是否登录
@app.route("/api/userinfo", methods=["GET"])
def userinfo():
    auth_header = request.headers.get("Authorization")
    print(auth_header)
    if not auth_header or not auth_header.startswith("Bearer "):
        return api_response(401, "缺少有效的token")
    token = auth_header.split(" ")[1]
    print(token)
    user, error = verify_jwt_token(token)
    if error:
        return api_response(401, error)
    return api_response(200, "获取用户信息成功", {"user": user})


# 解析并验证 JWTtoken（可用于后续接口鉴权）
def verify_jwt_token(token):
    try:
        payload = jwt.decode(
            token, SECRET_KEY, algorithms=["HS256"], options={"require_exp": True}
        )
        return payload.get("user"), None
    except jwt.ExpiredSignatureError:
        return None, "token已过期"
    except jwt.InvalidTokenError:
        return None, "无效的token"


CORS(
    app,
    resources={
        r"/api/*": {"origins": ["http://127.0.0.1:5000", "http://localhost:8081"]}
    },
)


if __name__ == "__main__":
    app.run(debug=True)

    
