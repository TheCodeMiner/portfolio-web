import { z } from "zod";

export const supportedLocalesSchema = z.enum(["en"]);

export type SupportedLocale = z.infer<typeof supportedLocalesSchema>;

export const supportedLocales: readonly SupportedLocale[] =
  supportedLocalesSchema.options;

export const defaultLocale: SupportedLocale = "en";

/**
 * Resolves the supported locale from the given locale string.
 * If the locale is not supported, it returns the default locale.
 *
 * @param locale - The locale string to resolve.
 * @returns The resolved supported locale.
 */
export function resolveSupportedLocale(
  locale: string | undefined,
): SupportedLocale {
  const result = supportedLocalesSchema.safeParse(locale);

  return result.success ? result.data : defaultLocale;
}
