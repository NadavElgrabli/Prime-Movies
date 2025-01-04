from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database URL (adjust the password if needed)
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:dangit65@localhost:5432"

# Create an engine to connect to the database
engine = create_engine(SQLALCHEMY_DATABASE_URL)

with engine.connect() as connection:
    # result = connection.execute(text("SELECT * FROM pg_catalog.pg_tables;"))
    # for row in result:
    #     print(row)

    result = connection.execute(text("SELECT * FROM prime_movies;"))
    for row in result:
        print(row)
        
# Create a base class for defining models
Base = declarative_base()

# Create a session to interact with the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


