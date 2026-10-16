import Image from "next/image";
import Link from "next/link";
import type { Dict } from "@/i18n";
import { t } from "@/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale } from "@/i18n";

interface Props {
  locale: Locale;
  messages: Dict;
}

export default function SiteHeader({ locale, messages }: Props) {
  const base = `/${locale}`;
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href={base} className="flex items-center gap-2" aria-label="Pinta-me">
          <Image src="/logo.png" alt="Pinta-me" width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
          <span className="text-xl font-extrabold tracking-tight">Pinta-me</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-zinc-700 md:flex" aria-label="Primary">
          <Link href={`${base}#como-funciona`} className="hover:text-zinc-950">
            {t(messages, "nav.howItWorks", "Como funciona")}
          </Link>
          <Link href={`${base}#o-que-vem`} className="hover:text-zinc-950">
            {t(messages, "nav.whatsInside", "O que vem")}
          </Link>
          <Link href={`${base}#galeria`} className="hover:text-zinc-950">
            {t(messages, "nav.gallery", "Galeria")}
          </Link>
          <Link href={`${base}#faq`} className="hover:text-zinc-950">
            {t(messages, "nav.faq", "Dúvidas")}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher current={locale} />
          <Link
            href={`${base}/conta`}
            className="hidden text-sm font-medium text-zinc-700 hover:text-zinc-950 sm:inline"
          >
            {t(messages, "nav.signIn", "Entrar")}
          </Link>
          <Link
            href={`${base}/assinar`}
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-700"
          >
            {t(messages, "nav.subscribe", "Assinar")}
          </Link>
        </div>
      </div>
    </header>
  );
}
