import { useState, useEffect } from "react";
import { SearchMoviesActors } from "../../films-api";
import {useParams} from "react-router-dom"

export default function MovieCast() {
    const {moviesId} =  useParams();
    const [cast, setCast] = useState([]);

    useEffect(() => {
        const SearchMovie = async () => {
            const data = await SearchMoviesActors(moviesId)
            if (data === undefined) {
                return;
            }
            setCast(data)
        }
        SearchMovie()
    }, [moviesId, setCast])

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