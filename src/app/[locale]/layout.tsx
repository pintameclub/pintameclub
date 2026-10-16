import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import "../globals.css";
import { getMessages, isLocale, locales, t, type Dict } from "@/i18n";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ConsentBanner from "@/components/ConsentBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = getMessages(locale) as Dict;
  return {
    title: t(messages, "meta.title", "Pinta-me — Clube de arte por assinatura"),
    description: t(messages, "meta.description", ""),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = getMessages(locale) as Dict;

  return (
    <html lang={locale} className={`${inter.variable} ${interTight.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-zinc-900">
        <NextIntlClientProvider locale={locale} messages={messages as Record<string, unknown>}>
          <SiteHeader locale={locale} messages={messages} />
          <div className="flex flex-1 flex-col">{children}</div>
          <SiteFooter locale={locale} messages={messages} />
          <ConsentBanner
            locale={locale}
            text={t(messages, "consent.bannerText", "")}
            accept={t(messages, "consent.accept", "Aceitar")}
            decline={t(messages, "consent.decline", "Recusar")}
            learnMore={t(messages, "consent.learnMore", "Saiba mais")}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
