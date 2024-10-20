import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const API_KEY =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTE3ZTYwMWIzMWQwYzNmOTQ1Y2UxMzI4YTYzNTUyOCIsIm5iOiI2ZTE0ZjI3NDVlYzhhN2VkN2FmZTc1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.62P1pW3OXt-WSEdOJ36Crpaam1QRgPt89KYI-H2yqgg";

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (search.trim() === "") {
      setError("Please enter a search term.");
      return;
    }
    setError("");
    setSearchParams({ search });
  };

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (!searchQuery) return;

    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              query: searchQuery,
              include_adult: false,
              language: "en-US",
              page: 1,
            },
            headers: {
              Authorization: API_KEY,
            },
          }
        );

        if (response.data.results && response.data.results.length > 0) {
          setMovies(response.data.results);
        } else {
          setMovies([]);
          setError("No results found.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
    };

    fetchMovies();
  }, [searchParams]);
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="searchMovies"
          value={search}
          onChange={handleChange}
          placeholder="Search for movies..."
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {movies.length > 0 && (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <h3>
                  <Link to={`/movies/${movie.id}`}>
                    {movie.title} ({movie.release_date?.split("-")[0]})
                  </Link>
                </h3>

                {movie.poster_path ? (
                  <Link to={`/movies/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      width="100"
                    />
                  </Link>
                ) : (
                  <p>No poster available</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
