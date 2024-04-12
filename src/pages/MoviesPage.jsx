import {  useEffect, useRef, useState } from "react"
import axios from 'axios'
import MovieList from "../components/MovieList/MovieList"
import css from "./pagesStyles/MoviesPage.module.css"
import Loader from "../components/Loader/Loader"
import { useLocation, useSearchParams } from "react-router-dom";

export default function MoviesPage({onSearch}) {
    // const [value, setValue] = useSearchParams('')
    const [movies, setMovies] = useState([]);
    const [loader, setLoader] = useState(false);
    const [params, setParams] = useSearchParams('');
    const value = params.get("query") ?? "";
  
    const changeFilter = (newFilter) => {
      params.set("query", newFilter);
      setParams(params);
    };
  

    useEffect(() => {
        
      const SearchFilteredFilms = async () => {
        try {
          setLoader(true)
          const data = await onSearch(value.toLowerCase());
          setMovies(data);
        } catch (error) {
          alert('Whoops, please try again');
          setLoader(false)
        } finally {
          setLoader(false)
        }
      }
      SearchFilteredFilms()

      },[value, onSearch, setParams])

      const location = useLocation();


    return(
        <div>
          <form onSubmit={(e) => changeFilter(e.target.value)}>
            <input type="text" name="query" placeholder="Search Films" className={css.input}></input>
            <button type="submit" className={css.button}>Search</button>
            </form>

            {movies.length > 0 && <MovieList data={movies} location={location}/>}
            {loader && <Loader />}
        </div>
    )
}