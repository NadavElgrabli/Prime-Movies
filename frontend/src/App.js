import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import FilterDropdown from "./Components/FilterDropdown";
import MovieCard from "./Components/MovieCard";
import MovieDetails from "./Components/MovieDetails";
import Footer from "./Components/Footer";
import "./styles.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/movies")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data);
        const genreSet = new Set(data.map((movie) => movie.genre));
        setGenres([...genreSet]);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterMovies(query, selectedGenre);
  };

  const handleFilter = (genre) => {
    setSelectedGenre(genre);
    filterMovies(searchQuery, genre);
  };

  const filterMovies = (query, genre) => {
    let filtered = movies;
    if (query) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (genre) {
      filtered = filtered.filter((movie) => movie.genre === genre);
    }
    setFilteredMovies(filtered);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar onSearch={handleSearch} />
                <FilterDropdown genres={genres} onFilter={handleFilter} />
                <div className="movie-list">
                  {filteredMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </>
            }
          />
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
