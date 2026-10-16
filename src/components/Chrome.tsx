"use client";

import { usePathname } from "next/navigation";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import type { Dict, Locale } from "@/i18n";

interface Props {
  locale: Locale;
  messages: Dict;
  children: React.ReactNode;
}

export default function Chrome({ locale, messages, children }: Props) {
  const pathname = usePathname();
  const isLanding = /^\/(pt|es|en|fr)\/?$/.test(pathname ?? "");

  return (
    <>
      {!isLanding && <SiteHeader locale={locale} messages={messages} />}
      <div className="flex flex-1 flex-col">{children}</div>
      <SiteFooter locale={locale} messages={messages} />
    </>
  );
}
