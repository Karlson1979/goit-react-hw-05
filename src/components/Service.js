import React from 'react'

const [trendingMovies, setTrendingMovies] = useState([]);

  const url = 'https://api.themoviedb.org/3/trending/movie/day';

  const options = {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTE3ZTYwMWIzMWQwYzNmOTQ1Y2UxMzI4YTYzNTUyOCIsIm5iZiI6MTcyNjA0Mzc2Ni42MzMxODgsInN1YiI6IjY2ZTE0ZjI3NDVlYzhhN2VkN2FmZTc1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dxlPzrbGefKwDvO72FHRFQUtAU-D2YVwtqqkA7HvKM8'
    }
  };

  export const fetchMovies = async () => {
    try {
      const response = await axios.get(url, options);
      setTrendingMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    }
  };
  export default Service