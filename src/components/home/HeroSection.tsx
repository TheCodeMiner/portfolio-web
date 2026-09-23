import type { HomeContent } from "../../content/home/home-content";

type HeroSectionProps = {
  content: HomeContent["hero"];
};

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section aria-labelledby="hero-heading">
      <h1 id="hero-heading">{content.name}</h1>
      <p>{content.role}</p>
      <p>{content.introduction}</p>
    </section>
  );
}
