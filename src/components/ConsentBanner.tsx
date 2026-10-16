"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n";

interface Props {
  locale: Locale;
  text: string;
  accept: string;
  decline: string;
  learnMore: string;
}

const KEY = "pintame-cookie-consent";

export default function ConsentBanner({ locale, text, accept, decline, learnMore }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function choose(value: "accepted" | "declined") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      // storage unavailable: just hide for this session
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white/95 p-4 shadow-lg backdrop-blur"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-zinc-700">
          {text}{" "}
          <Link href={`/${locale}/cookies`} className="underline underline-offset-4">
            {learnMore}
          </Link>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
          >
            {decline}
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            {accept}
          </button>
        </div>
      </div>
    </div>
  );
}
