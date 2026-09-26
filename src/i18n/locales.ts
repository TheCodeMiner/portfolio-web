import { z } from "zod";

export const supportedLocalesSchema = z.enum(["en"]);

export type SupportedLocale = z.infer<typeof supportedLocalesSchema>;

export const supportedLocales: readonly SupportedLocale[] =
  supportedLocalesSchema.options;

export const defaultLocale: SupportedLocale = "en";

/**
 * Accepts only an exact registered locale and falls back to `defaultLocale`
 * for missing, regional, or otherwise unsupported language values.
 */
export function resolveSupportedLocale(
  locale: string | undefined,
): SupportedLocale {
  const result = supportedLocalesSchema.safeParse(locale);

  return result.success ? result.data : defaultLocale;
}
