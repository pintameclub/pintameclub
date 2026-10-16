import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessages, isLocale, t, type Dict } from "@/i18n";

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

  return (
    <main className="flex-1">
      {/* HERO */}
      <section className="bg-gradient-to-b from-amber-50 via-rose-50 to-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center sm:py-24">
          <Image
            src="/logo.png"
            alt="Pinta-me"
            width={120}
            height={120}
            priority
            className="h-28 w-28 rounded-3xl object-cover shadow-lg"
          />
          <h1 className="mt-6 text-6xl font-black tracking-tight sm:text-8xl">
            Pinta-me
          </h1>
          <p className="mt-3 inline-block rounded-full bg-zinc-900 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white">
            {t(m, "hero.badge", "")}
          </p>
          <h2 className="mt-6 max-w-2xl text-2xl font-bold leading-snug sm:text-4xl">
            {t(m, "hero.title", "")}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-zinc-600">{t(m, "hero.subtitle", "")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`${base}/assinar`}
              className="rounded-full bg-zinc-900 px-8 py-3 text-base font-semibold text-white hover:bg-zinc-700"
            >
              {t(m, "hero.ctaMonthly", "")} · {t(m, "hero.priceMonthly", "R$59,90/mês")}
            </Link>
            <Link
              href={`${base}/assinar`}
              className="rounded-full border-2 border-zinc-900 px-8 py-3 text-base font-semibold text-zinc-900 hover:bg-zinc-900 hover:text-white"
            >
              {t(m, "hero.ctaYearly", "")} · {t(m, "hero.priceYearly", "R$640/ano")}
            </Link>
          </div>
          <p className="mt-4 text-sm text-zinc-500">{t(m, "hero.note", "")}</p>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 text-center md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-black">{s.value}</div>
              <div className="mt-1 text-sm text-zinc-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section id="o-que-vem" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-extrabold">{t(m, "inside.title", "")}</h2>
        <p className="mt-2 text-center text-zinc-600">{t(m, "inside.subtitle", "")}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {inside.map((item) => (
            <article key={item.title} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="como-funciona" className="bg-zinc-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-3xl font-extrabold">{t(m, "steps.title", "")}</h2>
          <p className="mt-2 text-center text-zinc-400">{t(m, "steps.subtitle", "")}</p>
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {steps.map((step) => (
              <li key={step.n} className="rounded-2xl bg-zinc-900 p-6">
                <div className="text-4xl font-black text-amber-300">{step.n}</div>
                <h3 className="mt-3 font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* GALLERY placeholder */}
      <section id="galeria" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-extrabold">{t(m, "gallery.title", "")}</h2>
        <p className="mt-2 text-center text-zinc-600">{t(m, "gallery.subtitle", "")}</p>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 via-rose-100 to-sky-100 text-sm font-medium text-zinc-500"
            >
              {t(m, "gallery.title", "Galeria")} {i}
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-zinc-500">{t(m, "gallery.note", "")}</p>
      </section>

      {/* ABOUT */}
      <section className="border-y border-zinc-200 bg-amber-50">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="text-3xl font-extrabold">{t(m, "about.title", "")}</h2>
          <p className="mt-4 leading-relaxed text-zinc-700">{t(m, "about.body", "")}</p>
        </div>
      </section>

      {/* TESTIMONIALS placeholder */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-extrabold">{t(m, "testimonials.title", "")}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure key={item.name} className="rounded-2xl border border-zinc-200 p-6">
              <blockquote className="text-zinc-700">“{item.quote}”</blockquote>
              <figcaption className="mt-3 text-sm font-semibold text-zinc-500">
                — {item.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-zinc-50">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-center text-3xl font-extrabold">{t(m, "faq.title", "")}</h2>
          <div className="mt-8 space-y-3">
            {faq.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-zinc-200 bg-white p-5">
                <summary className="cursor-pointer font-semibold list-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="text-3xl font-extrabold">{t(m, "contact.title", "")}</h2>
        <p className="mt-2 text-zinc-600">{t(m, "contact.text", "")}</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={t(m, "contact.instagram", "https://instagram.com/pintame.club")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700"
          >
            {t(m, "contact.instagramLabel", "@pintame.club")}
          </a>
          <a
            href={`mailto:${t(m, "contact.email", "pintame.club@gmail.com")}`}
            className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold hover:bg-zinc-100"
          >
            {t(m, "contact.email", "pintame.club@gmail.com")}
          </a>
        </div>
      </section>
    </main>
  );
}
