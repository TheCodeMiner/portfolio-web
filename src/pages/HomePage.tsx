import { Link } from "react-router";

export function HomePage() {
  return (
    <main>
      <h1>Portfolio</h1>

      <Link to="/projects/example">Example case study</Link>
    </main>
  );
}
