import { getFeaturedCaseStudies } from "../../content/case-studies/case-study.loader";
import { defaultLocale } from "../../content/locales";
import { CaseStudyCard } from "./CaseStudyCard";

export function SelectedWork() {
  const caseStudies = getFeaturedCaseStudies(defaultLocale);

  return (
    <section aria-labelledby="selected-work-heading">
      <h2 id="selected-work-heading">Selected engineering work</h2>

      {caseStudies.map((caseStudy) => (
        <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
      ))}
    </section>
  );
}
