const caseStudy = {
  labels: {
    caseStudy: "Case study",
    type: "Type",
    organization: "Organization",
    period: "Period",
    role: "Role",
    engineeringAreas: "Engineering areas",
    technologies: "Technologies",
  },

  typeLabels: {
    professional: "Professional work",
    personal: "Personal project",
    academic: "Academic project",
  },

  areas: {
    backend: "Backend",
    architecture: "Architecture",
    desktop: "Desktop",
    frontend: "Frontend",
    infrastructure: "Infrastructure",
  },

  period: {
    ongoing: "ongoing",
  },

  notFound: {
    title: "Case study not found",
  },
} as const;

export default caseStudy;
