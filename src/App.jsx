import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const Navigation = lazy(() => import("./components/navigation/Navigation"));
const HomePage = lazy(() => import("./pages/homePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/moviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/movieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("./components/movieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/movieReviews/MovieReviews")
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
}

export default App;
