import { z } from "zod";

export const supportedLocaleSchema = z.enum(["en"]);

export type SupportedLocale = z.infer<typeof supportedLocaleSchema>;

export const defaultLocale: SupportedLocale = "en";
