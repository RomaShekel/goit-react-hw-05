import { SearchMoviesReviews } from "../../films-api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieReviews() {
 const {moviesId} =  useParams();
 const [reviews, setReviews] = useState([])

useEffect(() => {
    const SearchMovie = async () => {
        const data = await SearchMoviesReviews(moviesId)
        if (data === undefined) {
            return;
        }
        setReviews(() => {
            return [data]
        })
    }
    SearchMovie()
}, [moviesId, setReviews])
    return(
        <div>
            <ul>
            {reviews.length > 0 ? reviews.map((info) => {
                return info.results.map((result) => (
                    <li key={result.id}>
                        <h2>{result.author}</h2>
                        <p>{result.content}</p>
                        <hr></hr>
                    </li>
                ));
            }) : 
                <p>Nothing</p>}
            </ul>
        </div>
    )
}