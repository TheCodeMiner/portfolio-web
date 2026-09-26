/**
 * Locale-owned copy for the homepage sections assembled by `HomePage`.
 * Keeping this contract independent of React lets the locale registry enforce
 * content completeness at compile time.
 */
export type HomeContent = {
  hero: {
    role: string;
    introduction: string;
  };

  engineeringFocus: {
    heading: string;
    items: {
      title: string;
      description: string;
    }[];
  };

  about: {
    heading: string;
    paragraphs: string[];
  };

  contact: {
    heading: string;
    introduction: string;
  };
};
