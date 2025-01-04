from pydantic import BaseModel
from typing import Optional
from sqlalchemy import Column, Integer, String, Text
from database.database import Base  # Import Base from database.py

# SQLAlchemy Movie model
class Movie(Base):
    __tablename__ = 'prime_movies'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    genre = Column(String(100))
    description = Column(Text)
    release_year = Column(Integer)
    length = Column(Integer)

# Pydantic schema for creating/updating movies
class MovieBase(BaseModel):
    title: str
    genre: str
    description: Optional[str] = None
    release_year: Optional[int] = None
    length: Optional[int] = None

    class Config:
        orm_mode = True  # Tells Pydantic to treat the SQLAlchemy model as a dictionary

# New schema for reading movies (includes id)
class MovieSchema(MovieBase):
    id: int  # Add id to the schema

    class Config:
        orm_mode = True














# from sqlalchemy import Column, Integer, String, Text
# from database.database import Base  # Import Base from database.py

# class Movie(Base):
#     __tablename__ = 'prime_movies'

#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String(255), index=True)
#     genre = Column(String(100))
#     description = Column(Text)
#     release_year = Column(Integer)
#     length = Column(Integer)
