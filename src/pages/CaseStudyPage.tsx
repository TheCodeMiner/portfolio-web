import Markdown from "react-markdown";
import { useParams } from "react-router";

import {
  caseStudySlugSchema,
  type SupportedLocale,
} from "../content/case-studies/case-study.schema";
import { getCaseStudyBySlug } from "../content/case-studies/case-study.loader";

const locale: SupportedLocale = "en";

export function CaseStudyPage() {
  const params = useParams();

  const slugResult = caseStudySlugSchema.safeParse(params.slug);

  if (!slugResult.success) {
    return (
      <main>
        <h1>Case study not found</h1>
      </main>
    );
  }

  const caseStudy = getCaseStudyBySlug(slugResult.data, locale);

  if (!caseStudy) {
    return (
      <main>
        <h1>Case study not found</h1>
      </main>
    );
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
