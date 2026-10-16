import Image from "next/image";
import Link from "next/link";
import type { Dict } from "@/i18n";
import { t } from "@/i18n";
import type { Locale } from "@/i18n";

interface Props {
  locale: Locale;
  messages: Dict;
}

export default function SiteFooter({ locale, messages }: Props) {
  const base = `/${locale}`;
  const instagram = t(messages, "contact.instagram", "https://instagram.com/pintame.club");
  const email = t(messages, "contact.email", "pintame.club@gmail.com");
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Pinta-me" width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
            <span className="text-lg font-extrabold">Pinta-me</span>
          </div>
          <p className="mt-3 text-sm text-zinc-600">
            {t(messages, "footer.tagline", "Arte brasileira na sua porta, todo mês.")}
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-500">
            {t(messages, "contact.title", "Fale com a gente")}
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                {t(messages, "contact.instagramLabel", "@pintame.club no Instagram")}
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="underline underline-offset-4">
                {email}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-500">Legal</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href={`${base}/termos`} className="underline underline-offset-4">
                {t(messages, "policies.terms", "Termos de Assinatura")}
              </Link>
            </li>
            <li>
              <Link href={`${base}/politica-de-privacidade`} className="underline underline-offset-4">
                {t(messages, "policies.privacy", "Política de Privacidade")}
              </Link>
            </li>
            <li>
              <Link href={`${base}/cookies`} className="underline underline-offset-4">
                {t(messages, "policies.cookies", "Cookies")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-xs text-zinc-500 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Pinta-me. {t(messages, "footer.rights", "")}</span>
          <span>{t(messages, "footer.madeWith", "")}</span>
        </div>
      </div>
    </footer>
  );
}
