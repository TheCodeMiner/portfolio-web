import Markdown from "react-markdown";
import { useTranslation } from "react-i18next";
import { resolveSupportedLocale } from "../i18n/locales";
import { useParams } from "react-router";
import { NotFoundPage } from "./NotFoundPage";

import { caseStudySlugSchema } from "../content/case-studies/case-study.schema";
import { getCaseStudyBySlug } from "../content/case-studies/case-study.loader";
import { CaseStudyMeta } from "../components/case-studies/CaseStudyMeta";

import styles from "./CaseStudyPage.module.css";

export function CaseStudyPage() {
  const { t, i18n } = useTranslation("caseStudy");
  const locale = resolveSupportedLocale(i18n.resolvedLanguage ?? i18n.language);
  const params = useParams();

  const slugResult = caseStudySlugSchema.safeParse(params.slug);

  if (!slugResult.success) {
    return <NotFoundPage title={t(($) => $.notFound.title)} />;
  }

  const caseStudy = getCaseStudyBySlug(slugResult.data, locale);

  if (!caseStudy) {
    return <NotFoundPage title={t(($) => $.notFound.title)} />;
  }

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{t(($) => $.labels.caseStudy)}</p>

          <h1>{caseStudy.title}</h1>

          <p className={styles.summary}>{caseStudy.summary}</p>

          <CaseStudyMeta caseStudy={caseStudy} />
        </header>

        <div className={styles.content}>
          <Markdown>{caseStudy.body}</Markdown>
        </div>
      </article>
    </main>
  );
}
