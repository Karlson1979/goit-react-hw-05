
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


import  Navigation  from './components/navigation/Navigation'
import HomePage from './pages/homePage/HomePage'
import  MoviesPage  from './pages/moviesPage/MoviesPage';
import { MovieCast } from './components/movieCast/MovieCast';
import { MovieRewiews } from './components/movieReviews/MovieRewiews';
import { MovieDetailsPage } from './pages/movieDetailsPage/MovieDetailsPage';

function App() {
 

  return (
    <>
    <Navigation/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/movies' element={<MoviesPage/>}/>
      <Route path='/movies/:movieId' element={<MovieDetailsPage/>}/>
      <Route path='/movies/:movieId/cast' element={<MovieCast/>}/>
      <Route path='/movies/:movieId/reviews' element={<MovieRewiews/>}/>
      <Route path='*' element={<Navigate to='/' />} />

    </Routes>
      </>
      )
}

export default App
