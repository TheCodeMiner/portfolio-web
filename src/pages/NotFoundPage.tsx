import { useTranslation } from "react-i18next";
import { Link } from "react-router";

type NotFoundPageProps = {
  title?: string;
};

export function NotFoundPage({ title }: NotFoundPageProps) {
  const { t } = useTranslation("common");

  const heading = title ?? t(($) => $.notFound.page);

  return (
    <main>
      <h1>{heading}</h1>
      <Link to="/"> {t(($) => $.actions.returnHome)} </Link>
    </main>
  );
}
