import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const { t } = useTranslation("common");

  return (
    <header className={styles.header}>
      <div className={styles.shell}>
        <Link className={styles.brand} to="/">
          <span aria-hidden="true" className={styles.brandMark}>
            <span />
            <span />
          </span>
          <span>{t(($) => $.site.portfolio)}</span>
        </Link>

        <nav
          aria-label={t(($) => $.navigation.mainLabel)}
          className={styles.navigation}
        >
          <Link to="/">{t(($) => $.navigation.home)}</Link>
          <Link to="/#work">{t(($) => $.navigation.work)}</Link>
          <Link to="/#about">{t(($) => $.navigation.about)}</Link>
          <Link to="/#contact">{t(($) => $.navigation.contact)}</Link>
        </nav>

        <Link className={styles.cta} to="/#contact">
          {t(($) => $.actions.getInTouch)}
          <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
        </Link>
      </div>
    </header>
  );
}
