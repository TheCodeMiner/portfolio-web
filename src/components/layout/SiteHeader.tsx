import { Link } from "react-router";

export function SiteHeader() {
  return (
    <header>
      <Link to="/">Samer</Link>

      <nav aria-label="Main navigation">
        <Link to="/">Home</Link>
      </nav>
    </header>
  );
}
