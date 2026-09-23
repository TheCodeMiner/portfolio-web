import type { HomeContent } from "../../content/home/home-content";

type EngineeringFocusSectionProps = {
  content: HomeContent["engineeringFocus"];
};

export function EngineeringFocusSection({
  content,
}: EngineeringFocusSectionProps) {
  return (
    <section aria-labelledby="engineering-focus-heading">
      <h2 id="engineering-focus-heading">{content.heading}</h2>

      {content.items.map((item) => (
        <article key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </section>
  );
}
