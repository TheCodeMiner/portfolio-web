import type { HomeContent } from "../../content/home/home.types";

import styles from "./AboutSection.module.css";

type AboutSectionProps = {
  content: HomeContent["about"];
};

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section
      aria-labelledby="about-heading"
      className={styles.section}
      id="about"
    >
      <div className={styles.inner}>
        <h2 id="about-heading">{content.heading}</h2>

        <div className={styles.copy}>
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
