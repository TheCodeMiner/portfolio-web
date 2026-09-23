import { Link } from "react-router";

import type { CaseStudy } from "../../content/case-studies/case-study.schema";

type CaseStudyCardProps = {
  caseStudy: CaseStudy;
};

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <article>
      <h3>
        <Link to={`/projects/${caseStudy.slug}`}>{caseStudy.title}</Link>
      </h3>

      <p>{caseStudy.summary}</p>

      <ul aria-label="Engineering areas">
        {caseStudy.areas.map((area) => (
          <li key={area}>{area}</li>
        ))}
      </ul>

      <ul aria-label="Technologies">
        {caseStudy.technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
    </article>
  );
}
