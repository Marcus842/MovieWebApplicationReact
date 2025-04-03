import MovieCard from '../components/MovieCard';

export async function SearchForMovies(title, queryPageIndex, setSearchResultsNumber, setMovieElements) {
    const apiKey = process.env.REACT_APP_API_KEY;
    let totalResults;
    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${title}&page=${queryPageIndex}`);
        const resData = await res.json();
        if (!res.ok) {
            console.error(`Error status: ${res.status}`);
        }
        else if (resData.Response === "False") {
            console.error(`Error message: ${resData.Error}`);
        }
        else {
            totalResults = resData.totalResults;
            setSearchResultsNumber(totalResults);
            const movies = resData.Search.map(movie => <MovieCard img={movie.Poster} key={movie.imdbID} title={movie.Title} year={movie.Year} type={movie.Type}></MovieCard>
            );
            setMovieElements(movies);
        }
    }
    catch (error) {
        console.error(error);
    }
    return totalResults;
}