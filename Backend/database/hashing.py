import hashlib


def hash(password:str):
    hashed = hashlib.md5(password.encode())
    return hashed.hexdigest()

def verify(plain_password,hashed_password):
    return hash(plain_password) == hashed_password
    