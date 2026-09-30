import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useState } from "react";
import "./HomePage.css";

function HomePage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchSubmit = async () => {
    if (!query.trim()) return;

    setError(null);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OMDB_API_KEY;
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data.Response === "False") {
        setError(data.Error);
        setMovies(null);
      } else if (data.Response === "True") {
        setMovies(data.Search);
      }
    } catch (err) {
      setError("Не удалось связаться с сервером");
      setMovies(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="home-page">
      <div className="container home-page__inner">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={handleSearchSubmit}
        />

        <section className="home-page__section">
          <h2 className="home-page__section-title">Результаты поиска</h2>

          {/* Условный рендер */}
          {isLoading ? (
            <Loader label="Идет поиск фильмов..." />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList movies={movies} />
          )}
        </section>
      </div>
    </main>
  );
}

export default HomePage;