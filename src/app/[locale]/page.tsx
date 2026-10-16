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

const CARD_GRADIENTS = [
  "from-amber-100 via-rose-100 to-sky-100",
  "from-sky-100 via-violet-100 to-rose-100",
  "from-emerald-100 via-amber-100 to-rose-100",
  "from-rose-100 via-orange-100 to-amber-100",
];

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
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

  return (
    <main className="flex-1 bg-white text-zinc-900">
      {/* HERO */}
      <section id="hero" className="mx-auto max-w-6xl px-4 pt-14 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="inline-block rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-700">
              {t(m, "hero.badge", "")}
            </p>
            <h1 className="font-display mt-5 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              {t(m, "hero.title", "")}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-600">
              {t(m, "hero.subtitle", "")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={`${base}/assinar`}
                className="rounded-full bg-zinc-950 px-7 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                {t(m, "hero.ctaMonthly", "")} — {t(m, "hero.priceMonthly", "")}
              </Link>
              <Link
                href={`${base}/assinar`}
                className="rounded-full border border-zinc-300 bg-white px-7 py-3.5 text-center text-sm font-semibold text-zinc-900 transition hover:border-zinc-900"
              >
                {t(m, "hero.ctaYearly", "")} {t(m, "hero.priceYearly", "")}
              </Link>
            </div>
            <p className="mt-4 text-sm text-zinc-500">{t(m, "hero.note", "")}</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-amber-50 via-rose-50 to-sky-50 shadow-sm">
            <div className="flex flex-col items-center px-8 py-10 text-center">
              <Image
                src="/logo.png"
                alt="Pinta-me"
                width={160}
                height={160}
                priority
                className="h-32 w-32 rounded-2xl object-cover shadow-md"
              />
              <p className="mt-5 text-sm font-semibold text-zinc-900">{instagramLabel}</p>
              <p className="mt-1 text-sm text-zinc-500">{email}</p>
              <div className="mt-6 flex w-full gap-3">
                <div className="flex flex-1 items-center justify-center rounded-2xl border border-zinc-200 bg-white py-6 text-3xl">
                  ✉️
                </div>
                <div className="flex flex-1 items-center justify-center rounded-2xl border border-zinc-200 bg-white py-6 text-3xl">
                  🎨
                </div>
                <div className="flex flex-1 items-center justify-center rounded-2xl border border-zinc-200 bg-white py-6 text-3xl">
                  💌
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <dl className="mt-12 grid grid-cols-2 gap-6 border-y border-zinc-200 py-8 text-center md:grid-cols-4">
          {stats.map((s) => (
            <div key={`${s.value}-${s.label}`}>
              <dt className="order-2 mt-1 block text-sm text-zinc-500">{s.label}</dt>
              <dd className="font-display order-1 text-4xl font-extrabold tracking-tight">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Social strip */}
        <p className="py-6 text-center text-sm text-zinc-500">
          {t(m, "social.follow", "")}{" "}
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-zinc-900 underline underline-offset-4"
          >
            Instagram {instagramLabel}
          </a>{" "}
          ·{" "}
          <a href={`mailto:${email}`} className="font-semibold text-zinc-900 underline underline-offset-4">
            {email}
          </a>
        </p>
      </section>

      {/* O QUE RECEBE */}
      <section id="recebe" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
          {t(m, "inside.label", "")}
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display max-w-xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            {t(m, "inside.title", "")}
          </h2>
          <p className="max-w-md text-zinc-600">{t(m, "inside.subtitle", "")}</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {inside.map((item, i) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div
                className={`flex h-44 items-center justify-center bg-gradient-to-br text-6xl ${CARD_GRADIENTS[i % CARD_GRADIENTS.length]}`}
                aria-hidden
              >
                ✉️
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.text}</p>
                <Link
                  href={`${base}/assinar`}
                  className="mt-4 inline-block text-sm font-semibold text-zinc-900 underline underline-offset-4 hover:text-zinc-600"
                >
                  {t(m, "inside.viewPlans", "")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">01 — 04</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              {t(m, "steps.title", "")}
            </h2>
            <p className="max-w-md text-zinc-600">{t(m, "steps.subtitle", "")}</p>
          </div>
          <ol className="mt-10 border-t border-zinc-200">
            {steps.map((step) => (
              <li
                key={step.n}
                className="grid grid-cols-[auto_1fr] items-start gap-5 border-b border-zinc-200 py-8 sm:grid-cols-[120px_1fr_1.5fr] sm:items-center"
              >
                <span className="font-display text-4xl font-extrabold tracking-tight text-zinc-300 sm:text-5xl">
                  {step.n}
                </span>
                <h3 className="text-xl font-bold sm:text-2xl">{step.title}</h3>
                <p className="col-span-2 leading-relaxed text-zinc-600 sm:col-span-1">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* GALERIA */}
      <section id="galeria" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
          {t(m, "gallery.label", "")}
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            {t(m, "gallery.title", "")}
          </h2>
          <p className="max-w-md text-zinc-600">{t(m, "gallery.subtitle", "")}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {(galleryItems.length > 0 ? galleryItems : [{}, {}, {}]).slice(0, 3).map((g, i) => (
            <figure
              key={g.caption ?? i}
              className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
            >
              <div
                className={`flex aspect-[4/3] items-center justify-center bg-gradient-to-br text-6xl ${CARD_GRADIENTS[(i + 1) % CARD_GRADIENTS.length]}`}
                aria-hidden
              >
                {["✉️", "🎨", "💌"][i % 3]}
              </div>
              <figcaption className="p-4 text-sm font-medium text-zinc-600">
                {g.caption ?? `${t(m, "gallery.title", "")} ${i + 1}`}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-sm text-zinc-500">{t(m, "gallery.note", "")}</p>
      </section>

      {/* MANIFESTO */}
      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:py-20 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              {t(m, "about.label", "")}
            </p>
            <h2 className="font-display mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              {t(m, "about.title", "")}
            </h2>
          </div>
          <div className="space-y-4 text-lg leading-relaxed text-zinc-700">
            <p>{t(m, "about.body", "")}</p>
            <p>{t(m, "about.body2", "")}</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <h2 className="font-display text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          {t(m, "testimonials.title", "")}
        </h2>
        <p className="mt-3 text-center text-sm text-zinc-500">{t(m, "testimonials.note", "")}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6"
            >
              <blockquote className="leading-relaxed text-zinc-800">“{item.quote}”</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-zinc-500">
                — {item.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-zinc-500">
            {t(m, "pricing.label", "")}
          </p>
          <h2 className="font-display mt-2 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
            {t(m, "pricing.title", "")}
          </h2>
          <p className="mt-3 text-center text-zinc-600">{t(m, "pricing.subtitle", "")}</p>
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
            <article className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-bold">{t(m, "subscribe.monthlyName", "")}</h3>
              <p className="font-display mt-2 text-4xl font-extrabold tracking-tight">
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
                className="mt-6 block rounded-full border border-zinc-300 px-6 py-3 text-center text-sm font-semibold transition hover:border-zinc-900"
              >
                {t(m, "pricing.cta", "")}
              </Link>
            </article>
            <article className="rounded-2xl bg-zinc-950 p-8 text-white shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{t(m, "subscribe.yearlyName", "")}</h3>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-zinc-950">
                  {t(m, "subscribe.yearlyBadge", "")}
                </span>
              </div>
              <p className="font-display mt-2 text-4xl font-extrabold tracking-tight">
                {t(m, "subscribe.yearlyPrice", "")}
              </p>
              <p className="mt-2 text-sm text-zinc-400">{t(m, "pricing.yearlyNote", "")}</p>
              <ul className="mt-5 space-y-2 text-sm text-zinc-200">
                {yearlyFeatures.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span aria-hidden>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`${base}/assinar`}
                className="mt-6 block rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
              >
                {t(m, "pricing.cta", "")}
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <h2 className="font-display text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          {t(m, "faq.title", "")}
        </h2>
        <div className="mt-10 space-y-3">
          {faq.map((item, i) => (
            <details
              key={item.q}
              open={i === 0}
              className="group rounded-2xl border border-zinc-200 bg-white p-5 transition open:shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold">
                <span>{item.q}</span>
                <span
                  aria-hidden
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-lg transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <section id="contato" className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:py-20">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            {t(m, "contact.label", "")}
          </p>
          <h2 className="font-display mx-auto mt-2 max-w-2xl text-5xl font-extrabold tracking-tight sm:text-6xl">
            {t(m, "contact.headline", t(m, "contact.title", ""))}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-600">{t(m, "contact.text", "")}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`mailto:${email}`}
              className="rounded-full bg-zinc-950 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              {t(m, "contact.cta", "")}
            </a>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-zinc-300 px-8 py-3.5 text-sm font-semibold transition hover:border-zinc-900"
            >
              {instagramLabel}
            </a>
          </div>
          <p className="mt-4 text-sm text-zinc-500">{email}</p>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-8 text-sm sm:flex-row">
            <div className="flex items-center gap-4">
              <Link href={`${base}/termos`} className="text-zinc-500 underline underline-offset-4 hover:text-zinc-900">
                {t(m, "policies.terms", "")}
              </Link>
              <Link
                href={`${base}/politica-de-privacidade`}
                className="text-zinc-500 underline underline-offset-4 hover:text-zinc-900"
              >
                {t(m, "policies.privacy", "")}
              </Link>
              <Link href={`${base}/cookies`} className="text-zinc-500 underline underline-offset-4 hover:text-zinc-900">
                {t(m, "policies.cookies", "")}
              </Link>
            </div>
            <LanguageSwitcher current={locale as Locale} />
          </div>
          <p className="mt-6 text-xs text-zinc-400">
            © {new Date().getFullYear()} Pinta-me. {t(m, "footer.rights", "")}{" "}
            {t(m, "footer.madeWith", "")}
          </p>
        </div>
      </section>
    </main>
  );
}
