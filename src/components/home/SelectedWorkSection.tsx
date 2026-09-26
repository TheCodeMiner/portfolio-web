import { useTranslation } from "react-i18next";

import { CaseStudyCard } from "../case-studies/CaseStudyCard";
import { getFeaturedCaseStudies } from "../../content/case-studies/case-study.loader";
import { resolveSupportedLocale } from "../../i18n/locales";

import styles from "./SelectedWorkSection.module.css";

export function SelectedWorkSection() {
  const { t, i18n } = useTranslation("common");

  const locale = resolveSupportedLocale(i18n.resolvedLanguage ?? i18n.language);
  const caseStudies = getFeaturedCaseStudies(locale);

  return (
    <section
      aria-labelledby="selected-work-heading"
      className={styles.section}
      id="work"
    >
      <div className={styles.inner}>
        <h2 id="selected-work-heading">{t(($) => $.sections.selectedWork)}</h2>

        <div className={styles.grid}>
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
      </div>
    </section>
  );
}
