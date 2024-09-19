
import MovieList from '../../components/movieList/MovieList';
import css from './HomePage.module.css'

const HomePage = () => {
  
  

  
  return (
    <div className={css.trending}>
      <h1 >Trending today</h1>
      <MovieList/>
    </div>
  );
};

export default HomePage;
