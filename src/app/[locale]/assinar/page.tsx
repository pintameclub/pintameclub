import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessages, isLocale, t, type Dict } from "@/i18n";

function list(m: Dict, path: string): string[] {
  const value = path
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        typeof acc === "object" && acc !== null
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      m,
    );
  return Array.isArray(value) ? (value as string[]) : [];
}

export default async function SubscribePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const m = getMessages(locale);
  const base = `/${locale}`;

  const cards = [
    {
      id: "monthly",
      name: t(m, "subscribe.monthlyName", "Mensal"),
      price: t(m, "subscribe.monthlyPrice", "R$59,90/mês"),
      features: list(m, "subscribe.monthlyFeatures"),
      highlight: false,
    },
    {
      id: "yearly",
      name: t(m, "subscribe.yearlyName", "Anual"),
      price: t(m, "subscribe.yearlyPrice", "R$640/ano"),
      badge: t(m, "subscribe.yearlyBadge", ""),
      features: list(m, "subscribe.yearlyFeatures"),
      highlight: true,
    },
  ];

  return (
    <main className="mx-auto max-w-5xl flex-1 px-4 py-12">
      <h1 className="text-center text-3xl font-extrabold">{t(m, "subscribe.title", "")}</h1>
      <p className="mt-2 text-center text-zinc-600">{t(m, "subscribe.subtitle", "")}</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {cards.map((card) => (
          <article
            key={card.id}
            className={`rounded-3xl border-2 p-8 ${
              card.highlight ? "border-zinc-900 shadow-lg" : "border-zinc-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold">{card.name}</h2>
              {"badge" in card && card.badge ? (
                <span className="rounded-full bg-amber-200 px-3 py-1 text-xs font-bold">
                  {card.badge}
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-3xl font-black">{card.price}</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700">
              {card.features.map((f) => (
                <li key={f}>✓ {f}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-semibold text-zinc-500">
              {t(m, "subscribe.payWith", "Pagar com")}:
            </p>
            <div className="mt-2 flex flex-col gap-2">
              {/* TODO: replace href="#" with real Mercado Pago Checkout Pro URL
                  from createMercadoPagoCheckout() (server action / API route).
                  No real charge is created by this placeholder. */}
              <Link
                href="#"
                className="rounded-full bg-sky-600 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-sky-500"
              >
                {t(m, "subscribe.mercadopago", "Mercado Pago")}
              </Link>
              {/* TODO: replace href="#" with real PayPal Subscriptions approval
                  URL from createPayPalSubscription(). Sandbox first
                  (PAYPAL_MODE=sandbox). No real charge is created here. */}
              <Link
                href="#"
                className="rounded-full bg-[#003087] px-6 py-3 text-center text-sm font-semibold text-white hover:bg-[#002670]"
              >
                {t(m, "subscribe.paypal", "PayPal")}
              </Link>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-zinc-500">
        {t(m, "subscribe.secureNote", "")}
      </p>
      <p className="mt-2 text-center text-sm">
        <Link href={`${base}/conta`} className="underline underline-offset-4">
          {t(m, "account.addressTitle", "")} →
        </Link>
      </p>
    </main>
  );
}
