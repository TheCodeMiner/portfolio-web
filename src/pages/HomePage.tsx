import { useTranslation } from "react-i18next";

import { AboutSection } from "../components/home/AboutSection";
import { ContactSection } from "../components/home/ContactSection";
import { EngineeringFocusSection } from "../components/home/EngineeringFocusSection";
import { HeroSection } from "../components/home/HeroSection";
import { SelectedWorkSection } from "../components/home/SelectedWorkSection";
import { getHomeContent } from "../content/home";
import { resolveSupportedLocale } from "../i18n/locales";

export function HomePage() {
  const { i18n } = useTranslation();
  const locale = resolveSupportedLocale(i18n.resolvedLanguage ?? i18n.language);
  const homeContent = getHomeContent(locale);

  return (
    <main>
      <HeroSection content={homeContent.hero} />

      <SelectedWorkSection />

      <EngineeringFocusSection content={homeContent.engineeringFocus} />

      <AboutSection content={homeContent.about} />

      <ContactSection content={homeContent.contact} />
    </main>
  );
}
