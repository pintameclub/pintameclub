"use client";

import { use, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessages, isLocale, t, type Dict, type Locale } from "@/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface Item {
  title?: string;
  text?: string;
  n?: string;
  q?: string;
  a?: string;
  quote?: string;
  name?: string;
  value?: string;
  label?: string;
  caption?: string;
}

function arr(messages: Dict, path: string): Item[] {
  const value = path
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        typeof acc === "object" && acc !== null
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      messages,
    );
  return Array.isArray(value) ? (value as Item[]) : [];
}

function strArr(messages: Dict, path: string): string[] {
  const value = path
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        typeof acc === "object" && acc !== null
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      messages,
    );
  return Array.isArray(value)
    ? (value as unknown[]).filter((v): v is string => typeof v === "string")
    : [];
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

const DARK_CARD = ["bg-[#1f1f1f]", "bg-[#262525]", "bg-[#000000]"];

export default function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  if (!isLocale(locale)) notFound();
  const m = getMessages(locale);
  const base = `/${locale}`;

  const steps = arr(m, "steps.items");
  const inside = arr(m, "inside.items");
  const stats = arr(m, "stats");
  const testimonials = arr(m, "testimonials.items");
  const faq = arr(m, "faq.items");
  const galleryItems = arr(m, "gallery.items");
  const monthlyFeatures = strArr(m, "subscribe.monthlyFeatures");
  const yearlyFeatures = strArr(m, "subscribe.yearlyFeatures");

  const instagram = t(m, "contact.instagram", "https://instagram.com/pintame.club");
  const instagramLabel = t(m, "contact.instagramLabel", "@pintame.club");
  const email = t(m, "contact.email", "pintame.club@gmail.com");
  const heroImageNote = t(m, "hero.imagePlaceholder", "sua imagem aqui");
  const envelopeImageNote = t(m, "inside.imagePlaceholder", "imagem do envelope");
  const galleryImageNote = t(m, "gallery.imagePlaceholder", "imagem aqui");

  return (
    <main className="flex-1 bg-white text-black antialiased">
      {/* HERO — centered display + dark feature card */}
      <section id="hero" className="mx-auto max-w-6xl px-4 pt-14 text-center sm:pt-20">
        <Reveal>
          <p className="chip-translucent-light inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-800">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-black" />
            {t(m, "hero.badge", "")}
          </p>
          <h1 className="font-display display-hero mx-auto mt-6 max-w-4xl text-balance font-bold uppercase">
            {t(m, "hero.title", "")}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-[16px] leading-relaxed text-zinc-600 sm:text-[17px]">
            {t(m, "hero.subtitle", "")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={`${base}/assinar`}
              className="btn-primary rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white"
            >
              {t(m, "hero.ctaMonthly", "")} — {t(m, "hero.priceMonthly", "")}
            </Link>
            <Link
              href={`${base}/assinar`}
              className="btn-ghost rounded-full border border-black/15 bg-white px-8 py-3.5 text-sm font-semibold text-black hover:border-black"
            >
              {t(m, "hero.ctaYearly", "")} · {t(m, "hero.priceYearly", "")}
            </Link>
          </div>
          <p className="mt-4 text-sm text-zinc-500">{t(m, "hero.note", "")}</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 overflow-hidden rounded-[24px] bg-[#0a0a0c] text-left text-white">
            <dl className="grid grid-cols-2 gap-6 border-b border-white/10 px-6 py-8 text-center sm:px-10 md:grid-cols-4">
              {stats.map((s) => (
                <div key={`${s.value}-${s.label}`}>
                  <dd className="font-display text-4xl font-bold tracking-tight">
                    {s.value}
                  </dd>
                  <dt className="mt-1 text-sm text-[#a1a1a1]">{s.label}</dt>
                </div>
              ))}
            </dl>
            <div className="relative px-6 py-6 sm:px-10 sm:py-8">
              <div className="zoom-frame group relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#333336] via-[#4b4b52] to-[#1c1c20] sm:min-h-[360px]">
                <div className="zoom-inner flex flex-col items-center px-6 py-12 text-center">
                  <Image
                    src="/logo.png"
                    alt="Pinta-me"
                    width={120}
                    height={120}
                    className="h-20 w-20 rounded-2xl object-cover shadow-2xl"
                  />
                  <p className="mt-4 text-sm font-medium text-white/80">{instagramLabel}</p>
                  <p className="mt-1 text-sm text-white/50">{email}</p>
                  <p className="chip-translucent mt-6 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-white/85">
                    {heroImageNote}
                  </p>
                </div>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_60%)]" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Social strip */}
        <div className="mt-8 border-y border-black/10 py-5 text-center text-sm text-zinc-500">
          {t(m, "social.follow", "")}{" "}
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-black underline underline-offset-4"
          >
            Instagram {instagramLabel}
          </a>
          <span aria-hidden className="mx-2 text-zinc-300">
            ·
          </span>
          <a
            href={`mailto:${email}`}
            className="font-semibold text-black underline underline-offset-4"
          >
            {email}
          </a>
        </div>
      </section>

      {/* ENVELOPE GRID */}
      <section id="recebe" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <Reveal>
          <p className="eyebrow text-zinc-500">{t(m, "inside.label", "")}</p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display display-section max-w-xl font-bold">
              {t(m, "inside.title", "")}
            </h2>
            <p className="max-w-md text-[16px] leading-relaxed text-zinc-600">
              {t(m, "inside.subtitle", "")}
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {inside.map((item, i) => (
            <Reveal key={item.title ?? i} delay={(i % 2) * 90}>
              <article className="group overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
                <div className="zoom-frame relative flex h-52 items-center justify-center bg-[#1f1f1f]">
                  <div className="zoom-inner absolute inset-0 bg-gradient-to-br from-[#343438] via-[#55555c] to-[#17171a]" />
                  <div className="absolute inset-0 bg-[rgba(0,0,0,0.58)]" />
                  <p className="chip-translucent relative rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-white/90">
                    {envelopeImageNote}
                  </p>
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="text-lg font-bold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">{item.text}</p>
                  <Link
                    href={`${base}/assinar`}
                    className="mt-4 inline-block text-sm font-semibold text-black underline underline-offset-4 transition hover:translate-x-0.5 hover:text-zinc-600"
                  >
                    {t(m, "inside.viewPlans", "")}
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NUMBERED LIST 01–04 */}
      <section id="como-funciona" className="border-y border-black/10 bg-[#fafafa]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow text-zinc-500">01 — 04</p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-display display-section font-bold">
                {t(m, "steps.title", "")}
              </h2>
              <p className="max-w-md text-[16px] leading-relaxed text-zinc-600">
                {t(m, "steps.subtitle", "")}
              </p>
            </div>
          </Reveal>
          <ol className="mt-10 border-t border-black/10">
            {steps.map((step, i) => (
              <Reveal key={step.n ?? i} delay={i * 60}>
                <li className="step-row grid grid-cols-[auto_1fr] items-start gap-5 border-b border-black/10 py-8 sm:grid-cols-[140px_1fr_1.5fr] sm:items-center sm:gap-8">
                  <span className="step-num font-display text-5xl font-bold tracking-tight text-zinc-300 transition-colors sm:text-6xl">
                    {step.n}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{step.title}</h3>
                  <p className="col-span-2 text-[15px] leading-relaxed text-zinc-600 sm:col-span-1 sm:text-[16px]">
                    {step.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* GALLERY — 3 dark cards */}
      <section id="galeria" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <Reveal>
          <p className="eyebrow text-zinc-500">{t(m, "gallery.label", "")}</p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display display-section font-bold">{t(m, "gallery.title", "")}</h2>
            <p className="max-w-md text-[16px] leading-relaxed text-zinc-600">
              {t(m, "gallery.subtitle", "")}
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {(galleryItems.length > 0 ? galleryItems : [{}, {}, {}]).slice(0, 3).map((g, i) => (
            <Reveal key={g.caption ?? i} delay={i * 90}>
              <figure
                className={`group overflow-hidden rounded-[24px] text-white ${DARK_CARD[i % DARK_CARD.length]}`}
              >
                <div className="zoom-frame relative flex aspect-[4/3] items-center justify-center">
                  <div className="zoom-inner absolute inset-0 bg-gradient-to-br from-[#3a3a3f] via-[#55555c] to-[#141416]" />
                  <div className="absolute inset-0 bg-[rgba(0,0,0,0.58)]" />
                  <p className="chip-translucent relative rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-white/90">
                    {galleryImageNote}
                  </p>
                </div>
                <figcaption className="border-t border-white/10 p-5 text-sm font-medium text-white/75">
                  {g.caption ?? `${t(m, "gallery.title", "")} ${i + 1}`}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-sm text-zinc-500">{t(m, "gallery.note", "")}</p>
      </section>

      {/* ABOUT / MANIFESTO */}
      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:py-20 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="eyebrow text-zinc-500">{t(m, "about.label", "")}</p>
            <h2 className="font-display display-section mt-3 font-bold">
              {t(m, "about.title", "")}
            </h2>
          </Reveal>
          <Reveal delay={110}>
            <div className="space-y-4 text-[16px] leading-relaxed text-zinc-700 sm:text-[17px]">
              <p>{t(m, "about.body", "")}</p>
              <p>{t(m, "about.body2", "")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS — dark cards */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <Reveal>
          <h2 className="font-display display-section text-center font-bold">
            {t(m, "testimonials.title", "")}
          </h2>
          <p className="mt-3 text-center text-sm text-zinc-500">{t(m, "testimonials.note", "")}</p>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <Reveal key={item.name ?? i} delay={i * 90}>
              <figure
                className={`rounded-[24px] p-7 text-white ${DARK_CARD[i % DARK_CARD.length]}`}
              >
                <div aria-hidden className="font-display text-4xl leading-none text-white/30">
                  &ldquo;
                </div>
                <blockquote className="mt-2 text-[15px] leading-relaxed text-white/90">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-white/10 pt-4 text-sm font-semibold text-white/60">
                  — {item.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="border-y border-black/10 bg-[#fafafa]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow text-center text-zinc-500">{t(m, "pricing.label", "")}</p>
            <h2 className="font-display display-section mt-3 text-center font-bold">
              {t(m, "pricing.title", "")}
            </h2>
            <p className="mt-3 text-center text-[16px] text-zinc-600">
              {t(m, "pricing.subtitle", "")}
            </p>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
            <Reveal>
              <article className="rounded-[24px] border border-black/10 bg-white p-8">
                <h3 className="text-lg font-bold tracking-tight">
                  {t(m, "subscribe.monthlyName", "")}
                </h3>
                <p className="font-display mt-2 text-4xl font-bold tracking-tight">
                  {t(m, "subscribe.monthlyPrice", "")}
                </p>
                <p className="mt-2 text-sm text-zinc-500">{t(m, "pricing.monthlyNote", "")}</p>
                <ul className="mt-5 space-y-2 text-sm text-zinc-700">
                  {monthlyFeatures.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span aria-hidden>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`${base}/assinar`}
                  className="btn-ghost mt-6 block rounded-full border border-black/15 px-6 py-3 text-center text-sm font-semibold text-black hover:border-black"
                >
                  {t(m, "pricing.cta", "")}
                </Link>
              </article>
            </Reveal>
            <Reveal delay={110}>
              <article className="rounded-[24px] bg-black p-8 text-white">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold tracking-tight">
                    {t(m, "subscribe.yearlyName", "")}
                  </h3>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-black">
                    {t(m, "subscribe.yearlyBadge", "")}
                  </span>
                </div>
                <p className="font-display mt-2 text-4xl font-bold tracking-tight">
                  {t(m, "subscribe.yearlyPrice", "")}
                </p>
                <p className="mt-2 text-sm text-white/60">{t(m, "pricing.yearlyNote", "")}</p>
                <ul className="mt-5 space-y-2 text-sm text-white/85">
                  {yearlyFeatures.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span aria-hidden>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`${base}/assinar`}
                  className="btn-primary mt-6 block rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-black hover:bg-zinc-200"
                >
                  {t(m, "pricing.cta", "")}
                </Link>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <Reveal>
          <h2 className="font-display display-section text-center font-bold">
            {t(m, "faq.title", "")}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-10 border-t border-black/10">
            {faq.map((item, i) => (
              <details
                key={item.q ?? i}
                open={i === 0}
                className="group border-b border-black/10 py-5"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left font-semibold tracking-tight">
                  <span>{item.q}</span>
                  <span
                    aria-hidden
                    className="faq-plus flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-lg font-normal"
                  >
                    +
                  </span>
                </summary>
                <div className="faq-answer">
                  <div>
                    <p className="pt-3 text-[15px] leading-relaxed text-zinc-600">{item.a}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CONTACT — dark rounded panel */}
      <section id="contato" className="mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
        <Reveal>
          <div className="overflow-hidden rounded-[24px] bg-[#0a0a0c] px-6 py-14 text-center text-white sm:px-12 sm:py-20">
            <p className="eyebrow text-white/50">{t(m, "contact.label", "")}</p>
            <h2 className="font-display display-hero mx-auto mt-4 max-w-3xl text-balance font-bold uppercase">
              {t(m, "contact.headline", t(m, "contact.title", ""))}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-white/65">
              {t(m, "contact.text", "")}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${email}`}
                className="btn-primary rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black hover:bg-zinc-200"
              >
                {t(m, "contact.cta", "")}
              </a>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white hover:border-white"
              >
                {instagramLabel}
              </a>
            </div>
            <p className="mt-4 text-sm text-white/45">{email}</p>
            <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row">
              <div className="flex items-center gap-4 text-white/60">
                <Link href={`${base}/termos`} className="underline underline-offset-4 hover:text-white">
                  {t(m, "policies.terms", "")}
                </Link>
                <Link
                  href={`${base}/politica-de-privacidade`}
                  className="underline underline-offset-4 hover:text-white"
                >
                  {t(m, "policies.privacy", "")}
                </Link>
                <Link href={`${base}/cookies`} className="underline underline-offset-4 hover:text-white">
                  {t(m, "policies.cookies", "")}
                </Link>
              </div>
              <div className="text-white/80 [&_a]:text-white/60 [&_a:hover]:text-white [&_span[aria-current]]:text-white">
                <LanguageSwitcher current={locale as Locale} />
              </div>
            </div>
            <p className="mt-6 text-xs text-white/35">
              © {new Date().getFullYear()} Pinta-me. {t(m, "footer.rights", "")}{" "}
              {t(m, "footer.madeWith", "")}
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
