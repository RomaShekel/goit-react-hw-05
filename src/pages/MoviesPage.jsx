import {  useRef, useState } from "react"
import axios from 'axios'
import MoviesList from "../components/MoviesList/MoviesList"
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
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputValue = e.target.input.value.trim();
        if (inputValue === '') {
          alert("Plese, print a word...")
          return
        }
        
        try {
          setLoader(true)
          const data = await onSearch(inputValue.toLowerCase());
          setMovies(data);
          setParams('');
        } catch (error) {
          alert('Whoops, please try again');
          setLoader(false)
        } finally {
          setLoader(false)
        }
      };

      const location = useLocation();


    return(
        <div>
            <form onSubmit={handleSubmit}>
            <input type="text" name="input" placeholder="Search Films" value={value} className={css.input}
             onChange={(e) => changeFilter(e.target.value)}></input>
            <button type="submit" className={css.button}>Search</button>
            </form>

            {movies.length > 0 && <MoviesList data={movies} location={location}/>}
            {loader && <Loader />}
        </div>
    )
}