import { useTranslation } from "react-i18next";

import type {
  CaseStudy,
  CaseStudyArea,
} from "../../content/case-studies/case-study.schema";

import styles from "./CaseStudyMeta.module.css";

type CaseStudyMetaProps = {
  caseStudy: CaseStudy;
};

export function CaseStudyMeta({ caseStudy }: CaseStudyMetaProps) {
  const { t } = useTranslation("caseStudy");

  const typeLabels: Record<CaseStudy["type"], string> = {
    professional: t(($) => $.typeLabels.professional),
    personal: t(($) => $.typeLabels.personal),
    academic: t(($) => $.typeLabels.academic),
  };

  const areaLabels: Record<CaseStudyArea, string> = {
    backend: t(($) => $.areas.backend),
    architecture: t(($) => $.areas.architecture),
    desktop: t(($) => $.areas.desktop),
    frontend: t(($) => $.areas.frontend),
    infrastructure: t(($) => $.areas.infrastructure),
  };

  const period =
    caseStudy.period.endYear === null
      ? `${caseStudy.period.startYear} – ${t(($) => $.period.ongoing)}`
      : caseStudy.period.startYear === caseStudy.period.endYear
        ? String(caseStudy.period.startYear)
        : `${caseStudy.period.startYear} – ${caseStudy.period.endYear}`;

  return (
    <div className={styles.meta}>
      <dl className={styles.facts}>
        <div className={styles.fact}>
          <dt>{t(($) => $.labels.type)}</dt>
          <dd>{typeLabels[caseStudy.type]}</dd>
        </div>

        {caseStudy.organization && (
          <div className={styles.fact}>
            <dt>{t(($) => $.labels.organization)}</dt>
            <dd>{caseStudy.organization}</dd>
          </div>
        )}

        <div className={styles.fact}>
          <dt>{t(($) => $.labels.period)}</dt>
          <dd>{period}</dd>
        </div>

        {caseStudy.role && (
          <div className={styles.fact}>
            <dt>{t(($) => $.labels.role)}</dt>
            <dd>{caseStudy.role}</dd>
          </div>
        )}
      </dl>

      <div className={styles.tagGroups}>
        <section aria-labelledby="engineering-areas-title">
          <h2 className={styles.groupTitle} id="engineering-areas-title">
            {t(($) => $.labels.engineeringAreas)}
          </h2>

          <ul className={styles.tagList}>
            {caseStudy.areas.map((area) => (
              <li className={styles.tag} key={area}>
                {areaLabels[area]}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="technologies-title">
          <h2 className={styles.groupTitle} id="technologies-title">
            {t(($) => $.labels.technologies)}
          </h2>

          <ul className={styles.tagList}>
            {caseStudy.technologies.map((technology) => (
              <li className={styles.technology} key={technology}>
                {technology}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
