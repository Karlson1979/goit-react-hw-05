import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/movieList/MovieList";
import css from "./HomePage.module.css";
import Loader from "../../components/loader/Loader";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = "https://api.themoviedb.org/3/trending/movie/day";

  const options = {
    headers: {
      Authorization:
        " Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTE3ZTYwMWIzMWQwYzNmOTQ1Y2UxMzI4YTYzNTUyOCIsIm5iZiI6MTcyOTQyMzQ4Ni42NTcxNDIsInN1YiI6IjY2ZTE0ZjI3NDVlYzhhN2VkN2FmZTc1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.62P1pW3OXt-WSEdOJ36Crpaam1QRgPt89KYI-H2yqgg",
    },
  };

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/{time_window}"
        );
        setTrendingMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className={css.trending}>
      <h1>Trending today</h1>
      {loading ? <Loader /> : <MovieList />}
    </div>
  );
};

export default HomePage;
