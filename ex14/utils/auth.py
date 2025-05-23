from functools import wraps  # 用于装饰器
from flask import request  # 用于获取请求头
import jwt  # 解析 JWT 令牌

from models import User  # 数据库中的用户模型
from utils.res import api_response  # 封装好的返回函数
from config import Config  # JWT 的密钥

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        print(token)
        if not token:
            return api_response(401, '令牌丢失',None)

        try:
            token = token.split(' ')[1]#去掉bearer
            print(token)
            data = jwt.decode(token, Config.JWT_SECRET_KEY, algorithms=["HS256"])
            print(data)
            user_id = data['user_id']
            print(user_id,token)
            user=User.query.get(user_id)
            if not user:
                return api_response(401, '用户不存在',None)
        except jwt.ExipredSignatureError:
            return api_response(401, '令牌已过期',None)
        except  jwt.InvalidTokenError:
            print("Invalid Token")
            return api_response(401, '令牌无效',None)
        return f(*args, **kwargs)
    return decorated
