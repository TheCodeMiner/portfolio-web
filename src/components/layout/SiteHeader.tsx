import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export function SiteHeader() {
  const { t } = useTranslation("common");

  return (
    <header>
      <Link to="/">Samer</Link>

      <nav aria-label="Main navigation">
        <Link to="/"> {t(($) => $.navigation.home)} </Link>
      </nav>
    </header>
  );
}
