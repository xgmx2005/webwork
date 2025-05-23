from flask import jsonify

def api_response(code,message,data=None):
    """返回统一的格式API相应结果
    参数：
    code -- 状态码 例如200表示成功
    message -- 响应消息，用于描述结果
    data（any，optional） ：需要返回的数据，默认为None
    返回：用于返回json格式响应的数据部分
    """
    response={
        "code":code,
        "message":message,
        "data":data
    }
    return jsonify(response),code
    