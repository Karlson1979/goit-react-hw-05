import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/movieList/MovieList"; // Импортируем компонент MovieList

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const API_KEY =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTE3ZTYwMWIzMWQwYzNmOTQ1Y2UxMzI4YTYzNTUyOCIsIm5iZiI6MTcyOTQyMzQ4Ni42NTcxNDIsInN1YiI6IjY2ZTE0ZjI3NDVlYzhhN2VkN2FmZTc1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.62P1pW3OXt-WSEdOJ36Crpaam1QRgPt89KYI-H2yqgg"; // Проверь, что ключ корректный

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
        console.error("Error fetching movies:", err); // Выводим ошибку в консоль для отладки
        setError("Something went wrong. Please try again.");
      }
    };

    fetchMovies();
  }, [searchParams, API_KEY]);

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

      {/* Передаем список фильмов как пропс в компонент MovieList */}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
