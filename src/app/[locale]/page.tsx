"use client";

import { use, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessages, isLocale, locales, t, type Dict, type Locale } from "@/i18n";

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

function FloatingNav({ locale, m, base }: { locale: Locale; m: Dict; base: string }) {
  const linkCls =
    "whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-medium text-white/70 transition hover:text-white";
  return (
    <div className="fixed inset-x-0 top-3 z-50 flex items-start justify-center gap-2 px-3 sm:top-4">
      <nav
        aria-label="Primary"
        className="pill-nav flex max-w-[calc(100vw-7rem)] items-center gap-0.5 overflow-x-auto rounded-full p-1.5 sm:max-w-none"
      >
        <Link
          href={`${base}#hero`}
          aria-current="page"
          className="whitespace-nowrap rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-black"
        >
          {t(m, "nav.home", "Início")}
        </Link>
        <Link href={`${base}#como-funciona`} className={`${linkCls} hidden sm:inline`}>
          {t(m, "nav.howItWorks", "")}
        </Link>
        <Link href={`${base}#recebe`} className={linkCls}>
          {t(m, "nav.whatsInside", "")}
        </Link>
        <Link href={`${base}#galeria`} className={linkCls}>
          {t(m, "nav.gallery", "")}
        </Link>
        <Link href={`${base}#faq`} className={linkCls}>
          {t(m, "nav.faq", "")}
        </Link>
        <span aria-hidden className="mx-1 h-5 w-px shrink-0 bg-white/15" />
        <Link
          href={`${base}/assinar`}
          className="btn-primary whitespace-nowrap rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-black hover:bg-zinc-200"
        >
          {t(m, "nav.subscribe", "")}
        </Link>
      </nav>
      <div
        aria-label="Language"
        className="pill-nav flex shrink-0 items-center gap-1 rounded-full px-3 py-[9px] text-[11px] font-semibold tracking-wide"
      >
        {locales.map((l, i) => (
          <span key={l} className="flex items-center gap-1">
            {i > 0 && (
              <span aria-hidden className="text-white/25">
                |
              </span>
            )}
            {l === locale ? (
              <span aria-current="true" className="text-white">
                {l.toUpperCase()}
              </span>
            ) : (
              <Link href={`/${l}`} hrefLang={l} className="text-white/50 transition hover:text-white">
                {l.toUpperCase()}
              </Link>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

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

  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = visualRef.current;
        if (!el) return;
        const y = window.scrollY;
        const shift = Math.min(y * 0.12, 160);
        const blur = Math.min(y / 1400, 2);
        el.style.transform = `translateY(${shift}px)`;
        el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "";
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main className="flex-1 antialiased">
      <FloatingNav locale={locale as Locale} m={m} base={base} />

      {/* HERO — full-bleed visual with overlapping type */}
      <section id="hero" className="relative overflow-hidden bg-[#0a0a0c] text-white">
        {/* hero stage: nav (floating) -> visual with overlapping type */}
        <div className="relative min-h-[100svh]">
          {/* full-bleed visual as the hero itself */}
          <div className="absolute inset-x-3 bottom-0 top-24 overflow-hidden rounded-[28px] md:inset-x-6">
            <div ref={visualRef} className="hero-visual absolute inset-x-0 -bottom-40 -top-40">
              {/* warm painted gradient: deep browns -> burnt orange -> vivid orange-red */}
              <div className="absolute inset-0 bg-[linear-gradient(165deg,#1c0a02_0%,#3d1204_28%,#7a2000_48%,#c33d00_66%,#ff5a1a_82%,#ff8a3d_100%)]" />
              {/* vivid orange-red glow bottom-right */}
              <div className="absolute inset-0 bg-[radial-gradient(90%_90%_at_85%_90%,rgba(255,68,0,0.9)_0%,rgba(255,90,20,0.38)_38%,transparent_70%)]" />
              {/* soft top light + painted blobs */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.18),transparent_55%)]" />
              <div className="absolute -left-16 top-1/4 h-72 w-72 rounded-full bg-[#ff8a3d]/40 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#7a1e00]/50 blur-3xl" />
              {/* legibility vignette for overlapping type */}
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55)_0%,transparent_38%)]" />
              {/* vertical hairlines overlay */}
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <span className="absolute inset-y-0 left-1/4 w-px bg-white/[0.07]" />
                <span className="absolute inset-y-0 left-2/4 w-px bg-white/[0.07]" />
                <span className="absolute inset-y-0 left-3/4 w-px bg-white/[0.07]" />
              </div>
              {/* subtle grain */}
              <div aria-hidden className="hero-grain pointer-events-none absolute inset-0" />
            </div>
            {/* caption chip bottom-right */}
            <p className="chip-translucent absolute bottom-4 right-4 z-10 whitespace-nowrap rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/90 sm:bottom-6 sm:right-6">
              {heroImageNote}
            </p>
          </div>

          {/* giant headline OVERLAPPING the visual */}
          <h1 className="font-display absolute inset-x-0 bottom-[18%] z-10">
            <div className="mx-auto max-w-[1440px] px-7 sm:px-14">
              <span
                className="hero-line block font-bold text-white"
                style={{
                  fontSize: "clamp(72px,13vw,180px)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                  textShadow: "0 2px 24px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.5)",
                }}
              >
                {t(m, "hero.displayLine1", "Pinta-me")}
              </span>
              <span
                className="hero-line hero-line-2 block break-words pl-[10vw] text-white/60"
                style={{
                  fontSize: "clamp(72px,13vw,180px)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                  textShadow: "0 2px 24px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.5)",
                }}
              >
                {t(m, "hero.displayLine2", "")}
              </span>
            </div>
          </h1>
        </div>

        {/* stats row directly under visual on dark */}
        <div className="relative mx-auto max-w-[1440px] px-5 pb-8 pt-8 sm:px-10">
          <dl className="grid grid-cols-2 gap-y-8 border-t border-white/15 pt-8 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={`${s.value}-${s.label}`}
                className="md:border-l md:border-white/15 md:pl-8 md:first:border-l-0 md:first:pl-0"
              >
                <dd className="font-display text-4xl font-bold tracking-tight text-white">
                  {s.value}
                </dd>
                <dt className="mt-1 text-sm text-white/60">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* red band — vivid gradient, copy unchanged */}
        <div className="red-band-vivid relative">
          <div className="relative mx-auto max-w-[1440px] px-5 py-14 sm:px-10 sm:py-20">
            <Reveal>
              <p className="chip-translucent inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
                {t(m, "hero.badge", "")}
              </p>
              <h2 className="font-display mt-5 max-w-xl text-[32px] font-bold leading-[1.05] tracking-tight text-white">
                {t(m, "hero.title", "")}
              </h2>
              <p className="mt-4 max-w-md text-[17px] leading-relaxed text-white/85">
                {t(m, "hero.subtitle", "")}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={`${base}/assinar`}
                  className="btn-primary rounded-full bg-black px-8 py-3.5 text-center text-sm font-semibold text-white"
                >
                  {t(m, "hero.ctaMonthly", "")} — {t(m, "hero.priceMonthly", "")}
                </Link>
                <Link
                  href={`${base}/assinar`}
                  className="btn-ghost rounded-full border border-white/40 px-8 py-3.5 text-center text-sm font-semibold text-white hover:border-white hover:bg-white/10"
                >
                  {t(m, "hero.ctaYearly", "")} · {t(m, "hero.priceYearly", "")}
                </Link>
              </div>
              <p className="mt-4 text-sm text-white/70">{t(m, "hero.note", "")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BELOW — white background */}
      <div className="bg-white text-black">
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
                      {t(m, "inside.imagePlaceholder", "")}
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
                      {t(m, "gallery.imagePlaceholder", "")}
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
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
