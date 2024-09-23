import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../loader/Loader"; 
import { Link } from "react-router-dom";


const MovieList = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const url = 'https://api.themoviedb.org/3/trending/movie/day';

  const options = {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTE3ZTYwMWIzMWQwYzNmOTQ1Y2UxMzI4YTYzNTUyOCIsIm5iZiI6MTcyNjA0Mzc2Ni42MzMxODgsInN1YiI6IjY2ZTE0ZjI3NDVlYzhhN2VkN2FmZTc1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dxlPzrbGefKwDvO72FHRFQUtAU-D2YVwtqqkA7HvKM8'
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(url, options);
        setTrendingMovies(response.data.results); 
       
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      } finally {
        setLoading(false); 
        
      }
      
    };
    
    fetchMovies();
   
  }, []); 

  
  if (loading) {
    return <Loader />;
  }

  
  return (
    <div>
      {trendingMovies.length > 0 ? (
        <ul>
          {trendingMovies.map((movie) => (
            
            <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
       
          ))}
        </ul>
      ) : (
        <p>No movies found</p>
      )}
    </div>
  )
  
      }

      export default MovieList