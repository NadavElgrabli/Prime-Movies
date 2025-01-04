import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/movies/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="movie-details">
      <h1>{movie.title || "Unknown Title"}</h1>
      <p><strong>Genre:</strong> {movie.genre || "Unknown"}</p>
      <p><strong>Description:</strong> {movie.description || "No description available"}</p>
      <p><strong>Release Year:</strong> {movie.release_year || "Unknown"}</p>
      <p><strong>Length:</strong> {movie.length ? `${movie.length} minutes` : "N/A"}</p>
    </div>
  );
}

export default MovieDetails;
