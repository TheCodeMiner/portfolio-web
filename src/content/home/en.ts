import type { HomeContent } from "./home-content";

export const homeContent = {
  hero: {
    name: "Samer",
    role: "Software Engineer",
    introduction:
      "I build production software with a focus on backend systems, application architecture, reusable tooling, and an increasing focus on Linux and infrastructure.",
  },

  engineeringFocus: {
    heading: "Engineering focus",
    items: [
      {
        title: "Backend & APIs",
        description:
          "Designing application boundaries, APIs, validation, and server-side workflows.",
      },
      {
        title: "Architecture & reusable systems",
        description:
          "Separating responsibilities and building shared packages and maintainable application foundations.",
      },
      {
        title: "Linux & infrastructure",
        description:
          "Developing deeper practical experience with Linux, networking, containers, deployment, and production environments.",
      },
    ],
  },

  about: {
    heading: "About",
    paragraphs: [
      "My professional work spans web applications, backend services, shared tooling, and desktop software.",
      "I am increasingly concentrating on backend engineering, Linux, infrastructure, deployment, and the systems surrounding production applications.",
    ],
  },

  contact: {
    heading: "Contact",
    introduction:
      "Source code and technical work are available through my GitHub profile.",
  },
} satisfies HomeContent;
