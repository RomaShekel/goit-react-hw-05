
import MovieList from "../components/MovieList/MovieList"
import SearchTodayMovies from '../films-api'
import { useState, useEffect } from "react";

export default function HomePage() {
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


    return(
        <MovieList data={todayMovies} />
    )
}