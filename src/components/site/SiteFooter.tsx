import { siteConfig } from "../../config/site";

import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>{siteConfig.displayName}</p>
      </div>
    </footer>
  );
}
