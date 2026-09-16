import { z } from "zod";

export const supportedLocaleSchema = z.enum(["en"]);

export const caseStudySlugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const caseStudyMetadataSchema = z.object({
  slug: caseStudySlugSchema,

  technologies: z.array(z.string().min(1)).min(1),

  demo: z.string().min(1).nullable().default(null),
});

export const caseStudyLocalizedMetadataSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
});

export const caseStudySchema = caseStudyMetadataSchema.extend({
  ...caseStudyLocalizedMetadataSchema.shape,

  locale: supportedLocaleSchema,
  body: z.string().min(1),
});

export type SupportedLocale = z.infer<typeof supportedLocaleSchema>;
export type CaseStudyMetadata = z.infer<typeof caseStudyMetadataSchema>;
export type CaseStudy = z.infer<typeof caseStudySchema>;
