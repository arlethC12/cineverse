import MovieCard from "./MovieCard";

function MovieGrid({ movies, favorites, onToggleFavorite }) {
  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favorites.includes(movie.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default MovieGrid;
