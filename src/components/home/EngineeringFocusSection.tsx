import { Boxes, Network, ServerCog } from "lucide-react";

import type { HomeContent } from "../../content/home/home.types";

import styles from "./EngineeringFocusSection.module.css";

type EngineeringFocusSectionProps = {
  content: HomeContent["engineeringFocus"];
};

const focusIcons = [ServerCog, Boxes, Network] as const;

export function EngineeringFocusSection({
  content,
}: EngineeringFocusSectionProps) {
  return (
    <section
      aria-labelledby="engineering-focus-heading"
      className={styles.section}
    >
      <div className={styles.inner}>
        <h2 id="engineering-focus-heading">{content.heading}</h2>

        <div className={styles.grid}>
          {content.items.map((item, index) => {
            const Icon = focusIcons[index] ?? Boxes;

            return (
              <article className={styles.item} key={item.title}>
                <div className={styles.iconWell}>
                  <Icon aria-hidden="true" size={20} strokeWidth={1.6} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
