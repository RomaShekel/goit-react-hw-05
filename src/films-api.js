import axios from "axios";
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const today = new Date().toISOString().split('T')[0];

const options = {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmM4MGVjMzJkZjA2YjliYTRiZjE0NTJmMDYzMzkwOCIsInN1YiI6IjY2MTY1OWYzY2U1ZDgyMDE3YzkwMWQ3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zcx7RFrciVEPWoyOmeOWrDF0bl-FGinUWHuNiozvTKA',
    }
  };

export default async function SearchTodayMovies() {
   const response = await axios.get(`/movie/popular?primary_release_date=${today}`, options)
  //  console.log(response.data.results)
    return response.data.results;
}

export async function SearchMoviesByFilter(name) {
    const response = await axios.get(`/search/movie?query=${name}`, options)
     return response.data.results;
 }

export async function SearchMoviesById(Id) {
  const response = await axios.get(`/movie/${Id}`, options)
  //  console.log(response.data)
   return response.data;
}

export async function SearchMoviesActors(Id) {
  const response = await axios.get(`/movie/${Id}/credits`, options)
  //  console.log(response.data)
   return response.data.cast;
}

export async function SearchMoviesReviews(Id) {
  const response = await axios.get(`/movie/${Id}/reviews`, options)
  //  console.log(response.data)
   return response.data;
}