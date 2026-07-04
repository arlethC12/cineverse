function Navbar({ theme, onToggleTheme }) {
  return (
    <nav className="navbar">
      <h1 className="logo">🎬 CineVerse</h1>
      <button className="theme-toggle" onClick={onToggleTheme}>
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}

export default Navbar;
