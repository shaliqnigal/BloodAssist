from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
DATABASE_URL = f'postgresql://ugqbmsvoqrhrzw:f31e5c1aff91205157f383f37e716d33619d86bc046d44d439a67842a47357cd@ec2-34-230-110-100.compute-1.amazonaws.com:5432/d6kqoamb023js6'
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()