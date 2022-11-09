from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from database.connection import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = 'userprofile'
    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(String,nullable= False, unique= True)
    password = Column(String,nullable= False)
    firstname = Column(String,nullable= False)
    lastname = Column(String,nullable= False)
    created_at = Column(TIMESTAMP(timezone=True),nullable=False, server_default=text('now()'))

class Donor(Base):
    __tablename__ = 'donors'
    id = Column(Integer, primary_key=True, nullable=False)
    firstname = Column(String,nullable= False)
    lastname = Column(String,nullable= False)
    email = Column(String,nullable= False, unique= True)
    bloodgroup = Column(String,nullable= False)
    city = Column(String,nullable = False)
    state = Column(String,nullable = False)
    contact_number = Column(String,nullable = False)
    created_at = Column(TIMESTAMP(timezone=True),nullable=False, server_default=text('now()'))
    
    owner_id = Column(Integer, ForeignKey(
        "userprofile.id", ondelete="CASCADE"), nullable=False,unique= True)
    owner = relationship("User")

class Feedback(Base):
    __tablename__ ='feedback'
    id = Column(Integer, primary_key=True, nullable=False)
    rating = Column(String,nullable= False)
    comments = Column(String,nullable= False)
    name = Column(String, nullable= False)
    email = Column(String,nullable = False)
