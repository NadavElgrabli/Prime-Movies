import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

function MovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`} className="movie-card">
      <h3>{movie.title}</h3>
      <p>{movie.genre}</p>
      <p>{movie.release_year}</p>
    </Link>
  );
}

export default MovieCard;
