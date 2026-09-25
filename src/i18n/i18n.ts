import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { defaultLocale, supportedLocales } from "./locales";
import { defaultNS, resources } from "./resources";

void i18n.use(initReactI18next).init({
  resources,
  lng: defaultLocale,
  fallbackLng: defaultLocale,
  supportedLngs: [...supportedLocales],
  defaultNS,

  interpolation: {
    // React escapes rendered values, so i18next must not escape them again.
    escapeValue: false,
  },
});

export { i18n };
