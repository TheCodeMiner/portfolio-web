import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import type {
  CaseStudy,
  CaseStudyArea,
} from "../../content/case-studies/case-study.schema";

import styles from "./CaseStudyCard.module.css";

type CaseStudyCardProps = {
  caseStudy: CaseStudy;
};

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const { t: tCaseStudy } = useTranslation("caseStudy");
  const { t: tCommon } = useTranslation("common");

  const typeLabels: Record<CaseStudy["type"], string> = {
    professional: tCaseStudy(($) => $.typeLabels.professional),
    personal: tCaseStudy(($) => $.typeLabels.personal),
    academic: tCaseStudy(($) => $.typeLabels.academic),
  };

  const areaLabels: Record<CaseStudyArea, string> = {
    backend: tCaseStudy(($) => $.areas.backend),
    architecture: tCaseStudy(($) => $.areas.architecture),
    desktop: tCaseStudy(($) => $.areas.desktop),
    frontend: tCaseStudy(($) => $.areas.frontend),
    infrastructure: tCaseStudy(($) => $.areas.infrastructure),
  };

  return (
    <article className={styles.card}>
      <Link
        aria-label={tCommon(($) => $.actions.viewProject, {
          title: caseStudy.title,
        })}
        className={styles.link}
        to={`/projects/${caseStudy.slug}`}
      >
        <div aria-hidden="true" className={styles.media}>
          <span className={styles.mediaPlane} />
          <span className={styles.mediaLine} />
        </div>

        <div className={styles.content}>
          <div className={styles.headingRow}>
            <div>
              <p className={styles.eyebrow}>{typeLabels[caseStudy.type]}</p>
              <h3>{caseStudy.title}</h3>
            </div>
            <ArrowUpRight
              aria-hidden="true"
              className={styles.arrow}
              size={21}
              strokeWidth={1.7}
            />
          </div>

          <p className={styles.summary}>{caseStudy.summary}</p>

          <ul
            aria-label={tCaseStudy(($) => $.labels.engineeringAreas)}
            className={styles.areaList}
          >
            {caseStudy.areas.map((area) => (
              <li key={area}>{areaLabels[area]}</li>
            ))}
          </ul>

          <ul
            aria-label={tCaseStudy(($) => $.labels.technologies)}
            className={styles.technologyList}
          >
            {caseStudy.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
      </Link>
    </article>
  );
}
