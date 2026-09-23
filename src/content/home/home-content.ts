export type HomeContent = {
  hero: {
    name: string;
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
