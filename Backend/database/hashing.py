#hashing the password 
import hashlib

class Hash():
    def hash(password:str):
        hashed = hashlib.md5(password.encode())
        return hashed.hexdigest()