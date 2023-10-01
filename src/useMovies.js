import {useState, useEffect} from "react"

const KEY = "6b81f72d";


export function useMovies(query, callback){
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {
        callback?.()

        const controller = new AbortController();
    
        const fetchMovies = async () => {
          try {
            setIsLoading(true);
            setError("");
            const res = await fetch(
              `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
              { signal: controller.signal }
            );
            if (!res.ok) throw new Error("Something went wrong!!!");
            const data = await res.json();
            if (data.Response === "false") throw new Error("Movie not foud");
            setMovies(data.Search);
            setError("");
          } catch (err) {
            if (err.name !== "AbortError") {
              setError(err.message);
            }
          } finally {
            setIsLoading(false);
          }
        };
    
        if (!query.length && query.length < 3) {
          setMovies([]);
          setError("");
          return;
        }
        // handleCloseMovie();
        fetchMovies();
    
        return function () {
          controller.abort();
        };
      }, [query]);
    

return {movies, isLoading, error}

}