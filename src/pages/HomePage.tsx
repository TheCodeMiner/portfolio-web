import { AboutSection } from "../components/home/AboutSection";
import { ContactSection } from "../components/home/ContactSection";
import { EngineeringFocusSection } from "../components/home/EngineeringFocusSection";
import { HeroSection } from "../components/home/HeroSection";
import { SelectedWork } from "../components/projects/SelectedWork";
import { homeContent } from "../content/home/en";

export function HomePage() {
  return (
    <main>
      <HeroSection content={homeContent.hero} />

      <SelectedWork />

      <EngineeringFocusSection content={homeContent.engineeringFocus} />

      <AboutSection content={homeContent.about} />

      <ContactSection content={homeContent.contact} />
    </main>
  );
}
