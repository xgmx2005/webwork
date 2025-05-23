from flask import Flask
from models import db
from user_blueprint import user_bp
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

#创建数据库表
with app.app_context():
    db.create_all()
#注册用户蓝图
app.register_blueprint(user_bp,url_prefix='/api')

               
if __name__ == '__main__':
    app.run(debug=True)