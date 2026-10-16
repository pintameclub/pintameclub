"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n";

const LABELS: Record<Locale, string> = {
  pt: "PT",
  es: "ES",
  en: "EN",
  fr: "FR",
};

export default function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();

  function hrefFor(locale: Locale): string {
    // Swap the leading locale segment, keep the rest of the path.
    const parts = pathname.split("/");
    parts[1] = locale;
    return parts.join("/") || `/${locale}`;
  }

  return (
    <nav aria-label="Language" className="flex items-center gap-1 text-sm">
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden className="text-zinc-300">|</span>}
          {locale === current ? (
            <span aria-current="true" className="font-bold text-zinc-900">
              {LABELS[locale]}
            </span>
          ) : (
            <Link
              href={hrefFor(locale)}
              hrefLang={locale}
              className="text-zinc-500 underline-offset-4 hover:text-zinc-900 hover:underline"
            >
              {LABELS[locale]}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
