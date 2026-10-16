import { getRequestConfig } from "next-intl/server";
import { defaultLocale, isLocale } from "../i18n";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = requested && isLocale(requested) ? requested : defaultLocale;
  // Dynamic import keeps each locale's JSON in its own chunk.
  const messages = (await import(`../messages/${locale}.json`)).default;
  return { locale, messages };
});
