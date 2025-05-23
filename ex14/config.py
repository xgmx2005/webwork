import os

class Config:
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///users.db'  # 使用 SQLite 数据库
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.urandom(32)  # 生成随机的 JWT 密钥