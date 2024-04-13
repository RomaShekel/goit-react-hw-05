// src/components/App.jsx
import { lazy, Suspense } from 'react';
import { SearchMoviesByFilter } from '../../films-api';
import Navigation from '../Navigation/Navigation';
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("../../pages/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage"));
const MoviesDetailsPage = lazy(() => import("../../pages/MovieDetailsPage"));
const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));

export default function App() {
  return (
    <div>
      <Navigation />

      <Suspense fallback={<div>Loading...</div>}>
    <Routes >
      <Route path='/' element={<HomePage/>} />
      <Route path='/movies' element={<MoviesPage onSearch={SearchMoviesByFilter}/>} />
      <Route path='/movies/:movieId' element={<MoviesDetailsPage/>} >
        <Route path='cast' element={<MovieCast/>} />
        <Route path='reviews' element={<MovieReviews/>} />
      </Route>
      <Route path='*' element={<NotFoundPage/>} />
    </Routes>
    </Suspense>
    </div>
  );
}

