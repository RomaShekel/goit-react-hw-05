import { SearchMoviesReviews } from "../../films-api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieReviews() {
 const {movieId} =  useParams();
 const [reviews, setReviews] = useState([])

useEffect(() => {
    const SearchMovie = async () => {
        try {
            const data = await SearchMoviesReviews(movieId)
            if (data === undefined) {
                return;
            }
            setReviews(() => {
                return [data]
            })
        } catch (error) {
            alert("Whooops, something went wrong, plese try again")
        }
    }
    SearchMovie()
}, [movieId, setReviews])
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