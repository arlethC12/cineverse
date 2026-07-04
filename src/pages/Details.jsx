import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import Navbar from "../components/Navbar";

function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    getMovieDetails(id)
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Error al cargar la película.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <h2 style={{ padding: "40px", color: "white" }}>
        Cargando detalles...
      </h2>
    );
  }

  if (!movie && !loading) {
    return (
      <h2 style={{ padding: "40px", color: "white" }}>
        {error || "Película no encontrada."}
      </h2>
    );
  }

  return (
    <>
      <Navbar />
      <div className="details-page">
        <div className="details-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="details-content">
          <Link to="/" className="details-back-button">← Volver</Link>
          <h1>{movie.title}</h1>
          {movie.tagline && <p className="details-tagline">{movie.tagline}</p>}
          <div className="details-meta">
            <span>⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}</span>
            <span>{movie.release_date || "Fecha no disponible"}</span>
            <span>{movie.runtime ? `${movie.runtime} min` : "Duración desconocida"}</span>
          </div>
          <p>{movie.overview || "Sin descripción disponible."}</p>
          <div className="details-genres">
            {movie.genres?.length ? (
              movie.genres.map((genre) => (
                <span key={genre.id} className="genre-pill">{genre.name}</span>
              ))
            ) : (
              <span className="genre-pill">Sin géneros</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
