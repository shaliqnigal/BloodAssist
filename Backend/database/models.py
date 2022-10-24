from sqlalchemy import Column, Integer, String
from database.connection import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text

class User(Base):
    __tablename__ = 'userprofile'
    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(String,nullable= False, unique= True)
    password = Column(String,nullable= False)
    firstname = Column(String,nullable= False)
    lastname = Column(String,nullable= False)
    created_at = Column(TIMESTAMP(timezone=True),nullable=False, server_default=text('now()'))


class Donor(Base):
    _tablename_ = 'donors'
    id = Column(Integer, primary_key=True, nullable=False)
    firstname = Column(String,nullable= False)
    lastname = Column(String,nullable= False)
    email = Column(String,nullable= False, unique= True)
    bloodgroup = Column(String,nullable= False)
    contactnumber = Column(Integer,nullable= False)
    created_at = Column(TIMESTAMP(timezone=True),nullable=False, server_default=text('now()'))
    owner_id = Column(Integer, ForeignKey(
        "userprofile.id", ondelete="CASCADE"), nullable=False)
    owner = relationship("User"