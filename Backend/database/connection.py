# importing dependencies
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
DATABASE_URL = f'postgresql://ugqbmsvoqrhrzw:f31e5c1aff91205157f383f37e716d33619d86bc046d44d439a67842a47357cd@ec2-34-230-110-100.compute-1.amazonaws.com:5432/d6kqoamb023js6' # database url which is in aws
# DATABASE_URL = f'postgresql://postgres:1234@localhost:5432/postgres'
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) # requests a connection from the engine's connection pool
Base = declarative_base() # contains metadata object where newly defined table objects are collected