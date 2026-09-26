import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

import { siteConfig } from "../../config/site";
import type { HomeContent } from "../../content/home/home.types";

import styles from "./ContactSection.module.css";

type ContactSectionProps = {
  content: HomeContent["contact"];
};

export function ContactSection({ content }: ContactSectionProps) {
  const { t } = useTranslation("common");

  return (
    <section
      aria-labelledby="contact-heading"
      className={styles.section}
      id="contact"
    >
      <div className={styles.panel}>
        <div>
          <h2 id="contact-heading">{content.heading}</h2>
          <p>{content.introduction}</p>
        </div>

        <a className={styles.action} href={siteConfig.githubUrl}>
          <ExternalLink aria-hidden="true" size={20} strokeWidth={1.7} />
          {t(($) => $.actions.viewGitHub)}
        </a>
      </div>
    </section>
  );
}
