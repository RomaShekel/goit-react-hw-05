// src/components/App.jsx
import { useEffect, useState, lazy, Suspense } from 'react';
import { SearchMoviesByFilter } from '../../films-api';
import SearchTodayMovies from '../../films-api'
import Navigation from '../Navigation/Navigation';
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("../../pages/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage"));
const MoviesDetailsPage = lazy(() => import("../../pages/MovieDetailsPage"));
const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));

export default function App() {
  const [todayMovies, setTodayMovies] = useState([]);

  useEffect(() => {
    const SearchTodayDataFilms = async () => {
      try {
      const data = await SearchTodayMovies();
      setTodayMovies(data)
      } catch (error) {
        alert('Whoops, something went wrong, please try again...')
      }
    }
    SearchTodayDataFilms();

  }, [setTodayMovies])

  return (
    <div>
      <Navigation />

      <Suspense fallback={<div>Loading...</div>}>
    <Routes >
      <Route path='/' element={<HomePage data={todayMovies}/>} />
      <Route path='/movies' element={<MoviesPage onSearch={SearchMoviesByFilter}/>} />
      <Route path='/movies/:moviesId' element={<MoviesDetailsPage/>} >
        <Route path='cast' element={<MovieCast/>} />
        <Route path='reviews' element={<MovieReviews/>} />
      </Route>
      <Route path='*' element={<NotFoundPage/>} />
    </Routes>
    </Suspense>
    </div>
  );
}

