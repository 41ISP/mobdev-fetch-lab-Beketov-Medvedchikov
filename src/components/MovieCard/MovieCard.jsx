import { Link } from 'react-router-dom';
import LikeButton from '../LikeButton/LikeButton';
import './MovieCard.css';

function MovieCard({ movie }) {
  if (!movie) return null;

  const { Title, Year, Poster, Type, imdbID } = movie;
  const hasPoster = Poster && Poster !== 'N/A';

  return (
    <article className="movie-card">
      <Link 
        to={`/movie/${imdbID}`} 
        className="movie-card__poster-button"
        aria-label={`Открыть страницу фильма «${Title}»`}
      >
        {hasPoster ? (
          <img
            className="movie-card__poster"
            src={Poster}
            alt={Title}
          />
        ) : (
          <div className="movie-card__poster movie-card__poster--placeholder">
            Постер отсутствует
          </div>
        )}
        <span className="movie-card__type">{Type}</span>
      </Link>

      <div className="movie-card__like">
        <LikeButton />
      </div>

      <div className="movie-card__info">
        <h3 className="movie-card__title" title={Title}>{Title}</h3>
        <p className="movie-card__year">{Year}</p>
      </div>
    </article>
  );
}

export default MovieCard;
