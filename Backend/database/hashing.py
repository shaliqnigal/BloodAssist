import hashlib


def hash(password:str): # password hashing with md5 algo
    hashed = hashlib.md5(password.encode())
    return hashed.hexdigest()

def verify(plain_password,hashed_password): # function to companre input password while login with existing hashed password in database
    return hash(plain_password) == hashed_password
    