import type { CaseStudyMetadata } from "../case-study.schema";

export const metadata = {
  slug: "example",

  areas: ["architecture"],

  technologies: ["TypeScript", "React", "Zod"],

  featured: true,

  demo: null,
} satisfies CaseStudyMetadata;
