import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTE3ZTYwMWIzMWQwYzNmOTQ1Y2UxMzI4YTYzNTUyOCIsIm5iZiI6MTcyOTQyMzQ4Ni42NTcxNDIsInN1YiI6IjY2ZTE0ZjI3NDVlYzhhN2VkN2FmZTc1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.62P1pW3OXt-WSEdOJ36Crpaam1QRgPt89KYI-H2yqgg",
    },
  };

  useEffect(() => {
    const fetchMoviesCast = async () => {
      try {
        const response = await axios.get(url, options);
        setMovieCast(response.data.cast);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesCast();
  }, [movieId, url]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2>Movie Cast</h2>
      <ul>
        {movieCast.map((actor) => (
          <li key={actor.id}>
            <div>
              {/* Проверяем наличие фотографии актера */}
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} // Полный URL для изображения
                  alt={actor.name}
                  width="100"
                />
              ) : (
                <p>No image available</p>
              )}
              <p>
                {actor.name} as {actor.character}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
