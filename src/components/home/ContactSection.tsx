import type { HomeContent } from "../../content/home/home-content";

type ContactSectionProps = {
  content: HomeContent["contact"];
};

export function ContactSection({ content }: ContactSectionProps) {
  return (
    <section aria-labelledby="contact-heading">
      <h2 id="contact-heading">{content.heading}</h2>

      <p>{content.introduction}</p>

      <a href="https://github.com/TheCodeMiner">GitHub</a>
    </section>
  );
}
