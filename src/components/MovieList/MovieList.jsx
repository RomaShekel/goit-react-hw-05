import { Link, useLocation } from "react-router-dom"

export default function MovieList({data}) {
   const location = useLocation();
    return(
        <ul>
            {data.map((movie) => {
                return(
                    <li key={movie.id}>
                        <Link className="link" to={`/movies/${movie.id}`} state={location}>{movie.title}</Link>
                    </li>
                )
            })}
        </ul>
    )
}