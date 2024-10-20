import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTE3ZTYwMWIzMWQwYzNmOTQ1Y2UxMzI4YTYzNTUyOCIsIm5iZiI6MTcyOTQyMzQ4Ni42NTcxNDIsInN1YiI6IjY2ZTE0ZjI3NDVlYzhhN2VkN2FmZTc1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.62P1pW3OXt-WSEdOJ36Crpaam1QRgPt89KYI-H2yqgg",
    },
  };

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await axios.get(url, options);
        setMovieReviews(response.data.results);
      } catch (error) {
        console.error("Error fetching movie reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieReviews();
  }, [movieId]);
  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2>Movie Reviews</h2>
      {movieReviews.length === 0 ? (
        <p>No reviews available for this movie.</p>
      ) : (
        <ul>
          {movieReviews.map((review) => (
            <li key={review.id}>
              <p>
                <strong>Author:</strong> {review.author}
              </p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
