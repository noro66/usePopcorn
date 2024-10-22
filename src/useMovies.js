import { useState, useEffect } from "react";
//localhost:3000/


export function useMovies(query, apkey,  callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovie() {
      try {
        setIsLoading(true);
        setIsError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apkey}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error("Something went Wrong with fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie Not Found");
        setMovies(data.Search);
        setIsError("");
      } catch (error) {
        if (error.name !== "AbortError") setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setIsError("");
      return;
    }
    callback?.();
    fetchMovie();
    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isError, isLoading };
}