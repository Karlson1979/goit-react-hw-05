import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/Loader"; // 

const MovieDetailsPage = () => {
  const { movieId } = useParams(); 
  const [movie, setMovie] = useState(null); 
  const [loading, setLoading] = useState(true); 

  const url = `https://api.themoviedb.org/3/movie/${movieId}`
  const options = {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTE3ZTYwMWIzMWQwYzNmOTQ1Y2UxMzI4YTYzNTUyOCIsIm5iZiI6MTcyNjA0Mzc2Ni42MzMxODgsInN1YiI6IjY2ZTE0ZjI3NDVlYzhhN2VkN2FmZTc1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dxlPzrbGefKwDvO72FHRFQUtAU-D2YVwtqqkA7HvKM8'
    }
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(url, options);
        setMovie(response.data); 
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchMovieDetails();
  }, [movieId]); 

  if (loading) {
    return <Loader />; 
  }

  if (!movie) {
    return <p>Movie not found</p>; 
  }

  
  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title} 
      />
    </div>
  );
};

export default MovieDetailsPage;

