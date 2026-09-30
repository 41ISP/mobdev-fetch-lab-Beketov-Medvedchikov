import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function MovieDetailsPage() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const apiKey = import.meta.env.VITE_OMDB_API_KEY;
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`
        );
        const data = await response.json();

        if (data.Response === 'False') {
          setError(data.Error);
        } else {
          setMovie(data);
        }
      } catch (err) {
        setError('Не удалось загрузить данные о фильме');
      } finally {
        setIsLoading(false);
      }
    };

    if (imdbID) {
      fetchMovieDetails();
    }
  }, [imdbID]);

  return (
    <main className="movie-details-page">
      <div className="container">
        {isLoading ? (
          <Loader label="Загружаем информацию о фильме..." />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <MovieDetails movie={movie} />
        )}
      </div>
    </main>
  );
}

export default MovieDetailsPage;