import type { CaseStudyMetadata } from "../case-study.schema";

export const metadata = {
  slug: "file-analysis-modernization",

  type: "professional",

  organization: "Druckhaus Bochum GmbH",

  period: {
    startYear: 2026,
    endYear: null,
  },

  areas: ["architecture", "frontend"],

  technologies: [
    "TypeScript",
    "PDF.js",
    "WebAssembly",
    "libjpeg-turbo",
    "Vitest",
    "Playwright",
    "Vite",
  ],

  featured: true,

  demo: null,
} satisfies CaseStudyMetadata;
