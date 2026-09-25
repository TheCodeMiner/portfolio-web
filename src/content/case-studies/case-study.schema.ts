import { z } from "zod";
import { supportedLocalesSchema } from "../../i18n/locales";

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

export const caseStudyTypeSchema = z.enum([
  "professional",
  "personal",
  "academic",
]);

const caseStudyYearSchema = z.number().int().min(2000).max(2100);

export const caseStudyPeriodSchema = z
  .object({
    startYear: caseStudyYearSchema,
    endYear: caseStudyYearSchema.nullable(),
  })
  .refine(
    ({ startYear, endYear }) => endYear === null || endYear >= startYear,
    {
      message: "endYear must not be earlier than startYear",
      path: ["endYear"],
    },
  );

export const caseStudyMetadataSchema = z.object({
  slug: caseStudySlugSchema,

  type: caseStudyTypeSchema,

  organization: z.string().min(1).nullable(),

  period: caseStudyPeriodSchema,

  areas: z.array(caseStudyAreaSchema).min(1),

  technologies: z.array(z.string().min(1)).min(1),

  featured: z.boolean().default(false),

  demo: z.string().min(1).nullable().default(null),
});

export const caseStudyLocalizedMetadataSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  role: z.string().min(1).nullable().default(null),
});

export const caseStudySchema = caseStudyMetadataSchema.extend({
  ...caseStudyLocalizedMetadataSchema.shape,

  locale: supportedLocalesSchema,
  body: z.string().min(1),
});

export type CaseStudyMetadata = z.infer<typeof caseStudyMetadataSchema>;
export type CaseStudy = z.infer<typeof caseStudySchema>;
export type CaseStudyArea = z.infer<typeof caseStudyAreaSchema>;
export type CaseStudyType = z.infer<typeof caseStudyTypeSchema>;
