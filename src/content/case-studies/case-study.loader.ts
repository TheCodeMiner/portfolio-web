import { parse as parseYaml } from "yaml";
import { z } from "zod";

import {
  caseStudyLocalizedMetadataSchema,
  caseStudyMetadataSchema,
  caseStudySchema,
  type CaseStudy,
  type SupportedLocale,
} from "./case-study.schema";

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

export function getCaseStudies(locale: SupportedLocale = "en"): CaseStudy[] {
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
  locale: SupportedLocale = "en",
): CaseStudy | undefined {
  return getCaseStudies(locale).find((caseStudy) => caseStudy.slug === slug);
}
