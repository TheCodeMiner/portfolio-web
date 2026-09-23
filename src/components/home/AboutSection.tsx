import type { HomeContent } from "../../content/home/home-content";

type AboutSectionProps = {
  content: HomeContent["about"];
};

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section aria-labelledby="about-heading">
      <h2 id="about-heading">{content.heading}</h2>

      {content.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>
  );
}
