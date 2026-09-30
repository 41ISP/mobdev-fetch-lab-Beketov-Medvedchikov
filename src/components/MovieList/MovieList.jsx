import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

function MovieList({ movies = [] }) {
  if (!movies || movies.length === 0) {
    return <p className="movie-list__empty">Фильмы не найдены</p>;
  }

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.imdbID}>
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  );
}

export default MovieList;