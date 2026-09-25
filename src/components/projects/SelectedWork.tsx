import { getFeaturedCaseStudies } from "../../content/case-studies/case-study.loader";
import { useTranslation } from "react-i18next";
import { resolveSupportedLocale } from "../../i18n/locales";
import { CaseStudyCard } from "./CaseStudyCard";

export function SelectedWork() {
  const { t, i18n } = useTranslation("common");

  const locale = resolveSupportedLocale(i18n.resolvedLanguage ?? i18n.language);

  const caseStudies = getFeaturedCaseStudies(locale);

  return (
    <section aria-labelledby="selected-work-heading">
      <h2 id="selected-work-heading"> {t(($) => $.sections.selectedWork)}</h2>

      {caseStudies.map((caseStudy) => (
        <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
      ))}
    </section>
  );
}
