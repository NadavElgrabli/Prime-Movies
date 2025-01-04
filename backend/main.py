from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.models import Movie, MovieBase, MovieSchema  # Import MovieSchema
from database.database import SessionLocal, engine, Base
from fastapi.middleware.cors import CORSMiddleware


# Create tables in the database
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow all origins for development (or adjust for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to the Prime Movie API!"}

# Endpoint to fetch all movies (use MovieSchema to include id)
@app.get("/movies", response_model=List[MovieSchema])
async def get_movies(db: Session = Depends(get_db)):
    movies = db.query(Movie).all()
    return movies

# Endpoint to fetch a single movie by id (use MovieSchema)
@app.get("/movies/{movie_id}", response_model=MovieSchema)
async def get_movie(movie_id: int, db: Session = Depends(get_db)):
    movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie

# Endpoint to create a new movie (use MovieSchema to return created movie with id)
@app.post("/movies", response_model=MovieSchema)
async def create_movie(movie_data: MovieBase, db: Session = Depends(get_db)):
    movie = Movie(**movie_data.dict())
    db.add(movie)
    db.commit()
    db.refresh(movie)
    return movie

# Endpoint to update a movie by id (use MovieSchema)
@app.put("/movies/{movie_id}", response_model=MovieSchema)
async def update_movie(movie_id: int, movie_data: MovieBase, db: Session = Depends(get_db)):
    movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    movie.title = movie_data.title
    movie.genre = movie_data.genre
    movie.description = movie_data.description
    movie.release_year = movie_data.release_year
    movie.length = movie_data.length
    db.commit()
    db.refresh(movie)
    return movie

# Endpoint to delete a movie by id
@app.delete("/movies/{movie_id}")
async def delete_movie(movie_id: int, db: Session = Depends(get_db)):
    movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    db.delete(movie)
    db.commit()
    return {"message": f"Movie with id {movie_id} has been deleted."}
