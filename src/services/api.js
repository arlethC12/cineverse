const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function getPopularMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-MX`
  );
  const data = await response.json();
  return data.results;
}

export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-MX&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
}

export async function getMovieDetails(id) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-MX`
  );
  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.status_message || "No se pudo cargar la película.");
  }

  return data;
}
