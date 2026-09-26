import type { SupportedLocale } from "../../i18n/locales";

import { homeContent as englishHomeContent } from "./en";
import type { HomeContent } from "./home.types";

const homeContentByLocale = {
  en: englishHomeContent,
} satisfies Record<SupportedLocale, HomeContent>;

/** Returns the complete homepage copy registered for a supported locale. */
export function getHomeContent(locale: SupportedLocale): HomeContent {
  return homeContentByLocale[locale];
}
