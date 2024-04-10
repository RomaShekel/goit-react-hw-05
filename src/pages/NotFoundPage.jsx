import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div>
            <p>Ooops, we did not found anithing</p>
            <Link to='/'>To Home</Link>
        </div>
    )
}