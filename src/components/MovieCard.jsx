import { Link } from "react-router-dom";

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="movie-card">
      <button
        className={`favorite-button ${isFavorite ? "favorite-active" : ""}`}
        onClick={(event) => {
          event.preventDefault();
          onToggleFavorite(movie.id);
        }}
        aria-label="Toggle favorite"
      >
        ❤️
      </button>
      <Link to={`/movie/${movie.id}`}>
        <img src={imageUrl} alt={movie.title} />
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
