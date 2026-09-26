import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { siteConfig } from "../../config/site";
import type { HomeContent } from "../../content/home/home.types";

import styles from "./HeroSection.module.css";

type HeroSectionProps = {
  content: HomeContent["hero"];
};

export function HeroSection({ content }: HeroSectionProps) {
  const { t } = useTranslation("common");

  return (
    <section aria-labelledby="hero-heading" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{content.role}</p>
          <h1 id="hero-heading">{siteConfig.displayName}</h1>
          <p className={styles.introduction}>{content.introduction}</p>

          <div className={styles.actions}>
            <Link className={styles.primaryAction} to="#work">
              {t(($) => $.actions.viewWork)}
              <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
            </Link>
            <Link className={styles.secondaryAction} to="#about">
              {t(($) => $.actions.aboutMe)}
            </Link>
          </div>
        </div>

        <div aria-hidden="true" className={styles.visual}>
          <div className={styles.visualPlane} />
          <div className={styles.visualNode} />
          <div className={styles.visualNodeSecondary} />
        </div>
      </div>
    </section>
  );
}
