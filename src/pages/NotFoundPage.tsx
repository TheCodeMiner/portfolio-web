import { Link } from "react-router";

type NotFoundPageProps = {
  title?: string;
};

export function NotFoundPage({ title = "Page not found" }: NotFoundPageProps) {
  return (
    <main>
      <h1>{title}</h1>
      <p>The requested page could not be found.</p>

      <Link to="/">Return home</Link>
    </main>
  );
}
