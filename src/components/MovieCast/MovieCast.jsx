import { useState, useEffect } from "react";
import { SearchMoviesActors } from "../../films-api";
import {useParams} from "react-router-dom"

export default function MovieCast() {
    const {movieId} =  useParams();
    const [cast, setCast] = useState([]);

    useEffect(() => {
        const SearchMovie = async () => {
            try {
                const data = await SearchMoviesActors(movieId)
                if (data === undefined) {
                    return;
                }
                setCast(data)
            } catch (error) {
                alert("Whooops, something went wrong, plese try again")
            }
        }
        SearchMovie()
    }, [movieId, setCast])

    return(
        <ul>
            {cast.length > 0 && cast.map((actor) => {
                return(
                    <li key={actor.id}>
                        <img src={'https://image.tmdb.org/t/p/w500' + actor.profile_path} alt={actor.name} width='150px'/>
                        <div>
                            <p>Actor name: {actor.name}</p>
                            <p>Character: {actor.character}</p>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}