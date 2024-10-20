import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Navigation from "./components/navigation/Navigation";
import HomePage from "./pages/homePage/HomePage";
import MoviesPage from "./pages/moviesPage/MoviesPage";
import MovieCast from "./components/movieCast/MovieCast";
import MovieReviews from "./components/movieReviews/MovieReviews";
import MovieDetailsPage from "./pages/movieDetailsPage/MovieDetailsPage";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
