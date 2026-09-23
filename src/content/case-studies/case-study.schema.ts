import { z } from "zod";
import { supportedLocaleSchema } from "../locales";

export const caseStudySlugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const caseStudyAreaSchema = z.enum([
  "backend",
  "architecture",
  "desktop",
  "frontend",
  "infrastructure",
]);

export const caseStudyMetadataSchema = z.object({
  slug: caseStudySlugSchema,

  areas: z.array(caseStudyAreaSchema).min(1),

  technologies: z.array(z.string().min(1)).min(1),

  featured: z.boolean().default(false),

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

export type CaseStudyMetadata = z.infer<typeof caseStudyMetadataSchema>;
export type CaseStudy = z.infer<typeof caseStudySchema>;
export type CaseStudyArea = z.infer<typeof caseStudyAreaSchema>;
