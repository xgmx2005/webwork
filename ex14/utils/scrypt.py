import scrypt

def generate_pwd_hash(password,salt):
    """
    生成哈希码
    password：用户密码（字符串）
    salt：用于哈希的盐值（字节）
    return 生成加了盐值的32字节哈希密码
    """
    hashed_password=scrypt.hash(password.encode('utf-8'),salt)
    return hashed_password.hex()

def check_pwd_hash(password,hashed_password,salt):
    """
    验证密码是否与哈希值密码匹配
    password:要验证的密码
    salt：盐值
    hashed_password：哈希密码
    key_length：输出的哈希密码长度，默认32字节
    return：如果密码匹配返回True，否则返回False
    """
    try:
        #重新生成哈希密码并比较
        new_hashed_password=generate_pwd_hash(password,salt)
        return new_hashed_password==hashed_password
    except Exception as e:
        print(f"错误信息{e}")
        return False