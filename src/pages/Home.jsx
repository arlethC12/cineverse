import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import { getPopularMovies, searchMovies } from "../services/api";

const FAVORITES_KEY = "cineverse_favorites";
const THEME_KEY = "cineverse_theme";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return savedTheme || "dark";
  });

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    getPopularMovies().then((data) => {
      setMovies(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    if (!searchTerm) {
      const data = await getPopularMovies();
      setMovies(data);
    } else {
      const data = await searchMovies(searchTerm);
      setMovies(data);
    }
    setLoading(false);
  };

  const handleToggleFavorite = (movieId) => {
    setFavorites((current) =>
      current.includes(movieId)
        ? current.filter((id) => id !== movieId)
        : [...current, movieId]
    );
  };

  const handleToggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  if (loading) {
    return (
      <h2 style={{ padding: "40px", color: theme === "dark" ? "white" : "#111" }}>
        Cargando películas...
      </h2>
    );
  }

  return (
    <>
      <Navbar theme={theme} onToggleTheme={handleToggleTheme} />
      <header className="hero">
        <div className="hero-content">
          <div className="hero-copy">
            <h2>Descubre las películas más populares</h2>
            <p>Explora tendencias y estrenos con un solo clic.</p>
            <button className="hero-search-button" onClick={() => handleSearch("")}>Buscar ahora</button>
          </div>
          <div className="hero-actions">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </header>
      {movies.length === 0 ? (
        <div className="no-results">
          <h2>No se encontraron resultados</h2>
          <p>Prueba otra búsqueda o vuelve a la lista principal.</p>
        </div>
      ) : (
        <MovieGrid movies={movies} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
      )}
    </>
  );
}

export default Home;
