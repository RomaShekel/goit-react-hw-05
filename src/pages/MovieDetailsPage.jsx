import axios from "axios"
import { SearchMoviesById } from "../films-api"
import { useEffect, useState, useRef } from "react"
import { useParams, Link, Outlet, NavLink, useLocation } from "react-router-dom"
import css from "./pagesStyles/MovieDetailsPage.module.css"
import clsx from "clsx"
import Loader from "../components/Loader/Loader"


export default function MoviesDetailsPage() {
const [movieData, setMovieData] = useState({})
const {movieId} = useParams();
const [loader, setLoader] = useState(false);

useEffect(() => {

    const SearchMovie = async () => {
        try {
            setLoader(true)
            const data = await SearchMoviesById(movieId)
            if (data === null || data === undefined) {
                return;
            }
            setMovieData(data)
        } catch (error) {
            alert("Whoops, something went wrong, plese try again");
            setLoader(false)
        } finally {
            setLoader(false)
        }
    }
    SearchMovie()
}, [movieId])

const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  const location = useLocation();
  const refLocation = useRef(location.state);
  const backLinkHref = refLocation.current ?? "/movies";


    return(
        <div>
            <button type="button" className={css.button}><Link to={backLinkHref} className={css.buttonLink}>To Back</Link></button>
            <div className={css.filmDiv}>
                <img src={'https://image.tmdb.org/t/p/w500' + movieData.poster_path} alt={movieData.title} width='200px'/>
                <div className={css.infoDiv}>
                    <p>{movieData.title}</p>
                    <p>User Score: {Math.floor(movieData.vote_average * 10)}%</p>
                    <div>
                      <b>Overview</b>
                      <p>{movieData.overview}</p>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
            <div>
                <h2>Addition information</h2>
                <ul>
                <li>
                <NavLink className={buildLinkClass} to="cast">Cast</NavLink>
                </li>
                <li>
                <NavLink className={buildLinkClass} to="reviews">Reviews</NavLink>
                </li>
            </ul>
            <Outlet />
            </div>
            {loader && <Loader/>}
        </div>
    )
}