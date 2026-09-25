import { parse as parseYaml } from "yaml";
import { z } from "zod";

import {
  caseStudyLocalizedMetadataSchema,
  caseStudyMetadataSchema,
  caseStudySchema,
  type CaseStudy,
} from "./case-study.schema";
import { defaultLocale, type SupportedLocale } from "../../i18n/locales";

const metadataModuleSchema = z.object({
  metadata: caseStudyMetadataSchema,
});

const metadataModules = import.meta.glob<unknown>("./*/metadata.ts", {
  eager: true,
});

const markdownFiles = import.meta.glob<string>("./*/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

function parseMarkdown(source: string) {
  // markdown should start with --- (opening of yaml delimiter),
  // \r?\n (newline, optional carriage return),
  // [\s\S]*?) first important capture group, which captures the yaml front matter,
  // \r?\n (newline, optional carriage return),
  // --- (closing of yaml delimiter),
  // \r?\n? (optional newline, optional carriage return),
  // ([\s\S]*) second important capture group, which captures the markdown body.
  // so this will capture ideally 2 groups (ignore i0)-> [complete match, yaml front matter, markdown body]
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    throw new Error("Case study Markdown must contain YAML front matter.");
  }

  const [, frontMatterSource, bodySource] = match;

  if (frontMatterSource === undefined || bodySource === undefined) {
    throw new Error("Could not parse case study Markdown.");
  }

  const localizedMetadata = caseStudyLocalizedMetadataSchema.parse(
    parseYaml(frontMatterSource),
  );

  const body = bodySource.trim();

  if (!body) {
    throw new Error("Case study Markdown body cannot be empty.");
  }

  return {
    localizedMetadata,
    body,
  };
}

export function getCaseStudies(
  locale: SupportedLocale = defaultLocale,
): CaseStudy[] {
  return Object.entries(metadataModules).map(([metadataPath, module]) => {
    const directoryMatch = metadataPath.match(/^\.\/([^/]+)\/metadata\.ts$/);

    if (!directoryMatch?.[1]) {
      throw new Error(`Invalid case study metadata path: ${metadataPath}`);
    }

    const directorySlug = directoryMatch[1];

    const { metadata } = metadataModuleSchema.parse(module);

    if (metadata.slug !== directorySlug) {
      throw new Error(
        `Case study slug "${metadata.slug}" does not match directory "${directorySlug}".`,
      );
    }

    const markdownPath = `./${directorySlug}/${locale}.md`;
    const markdownSource = markdownFiles[markdownPath];

    if (!markdownSource) {
      throw new Error(
        `Missing "${locale}" content for case study "${directorySlug}".`,
      );
    }

    const { localizedMetadata, body } = parseMarkdown(markdownSource);

    return caseStudySchema.parse({
      ...metadata,
      ...localizedMetadata,
      locale,
      body,
    });
  });
}

export function getCaseStudyBySlug(
  slug: string,
  locale: SupportedLocale = defaultLocale,
): CaseStudy | undefined {
  return getCaseStudies(locale).find((caseStudy) => caseStudy.slug === slug);
}

export function getFeaturedCaseStudies(
  locale: SupportedLocale = defaultLocale,
): CaseStudy[] {
  return getCaseStudies(locale).filter((caseStudy) => caseStudy.featured);
}
