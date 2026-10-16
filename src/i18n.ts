import pt from "./messages/pt.json";
import es from "./messages/es.json";
import en from "./messages/en.json";
import fr from "./messages/fr.json";

export const locales = ["pt", "es", "en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

// Loose dictionary type so drafts (es/en/fr) can be shorter than pt.
export type Dict = Record<string, unknown>;

const all: Record<Locale, Dict> = {
  pt: pt as unknown as Dict,
  es: es as unknown as Dict,
  en: en as unknown as Dict,
  fr: fr as unknown as Dict,
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getMessages(locale: string): Dict {
  if (isLocale(locale)) return all[locale];
  return all.pt;
}

/** Safely read a nested key like "nav.subscribe" with a fallback. */
export function t(messages: Dict, path: string, fallback = ""): string {
  const value = path
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        typeof acc === "object" && acc !== null
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      messages,
    );
  return typeof value === "string" ? value : fallback;
}
