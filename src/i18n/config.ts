export type Locale = (typeof locales)[number];

export const locales = ["en", "zh-TW"] as const;
export const defaultLocale: Locale = "zh-TW";
