import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");

  const submitSearch = (e) => {
    e.preventDefault();
    onSearch && onSearch(q);
    setQ("");
  };

  return (
    <form className="search-bar" onSubmit={submitSearch}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar películas..."
      />
      <button type="submit">Buscar</button>
    </form>
  );
}
