import Markdown from "react-markdown";
import { useParams } from "react-router";
import { NotFoundPage } from "./NotFoundPage";

import { caseStudySlugSchema } from "../content/case-studies/case-study.schema";
import { defaultLocale } from "../content/locales";
import { getCaseStudyBySlug } from "../content/case-studies/case-study.loader";

export function CaseStudyPage() {
  const params = useParams();

  const slugResult = caseStudySlugSchema.safeParse(params.slug);

  if (!slugResult.success) {
    return <NotFoundPage title="Case study not found" />;
  }

  const caseStudy = getCaseStudyBySlug(slugResult.data, defaultLocale);

  if (!caseStudy) {
    return <NotFoundPage title="Case study not found" />;
  }

  return (
    <main>
      <header>
        <h1>{caseStudy.title}</h1>
        <p>{caseStudy.summary}</p>
      </header>

      <Markdown>{caseStudy.body}</Markdown>
    </main>
  );
}
