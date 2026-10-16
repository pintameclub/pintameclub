import { notFound } from "next/navigation";
import { getMessages, isLocale, t } from "@/i18n";

const inputCls =
  "w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none";

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const m = getMessages(locale);

  const addressFields = [
    { name: "fullName", label: t(m, "account.fullName", ""), type: "text", required: true, span: true },
    { name: "email", label: t(m, "account.email", ""), type: "email", required: true, span: false },
    { name: "phone", label: t(m, "account.phone", ""), type: "tel", required: false, span: false },
    { name: "country", label: t(m, "account.country", ""), type: "text", required: true, span: false },
    { name: "postalCode", label: t(m, "account.postalCode", ""), type: "text", required: true, span: false },
    { name: "street", label: t(m, "account.street", ""), type: "text", required: true, span: false },
    { name: "number", label: t(m, "account.number", ""), type: "text", required: true, span: false },
    { name: "complement", label: t(m, "account.complement", ""), type: "text", required: false, span: true },
    { name: "city", label: t(m, "account.city", ""), type: "text", required: true, span: false },
    { name: "state", label: t(m, "account.state", ""), type: "text", required: true, span: false },
  ];

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-12">
      <h1 className="text-3xl font-extrabold">{t(m, "account.title", "")}</h1>

      {/* Login placeholder — real email/password auth ships later */}
      <section className="mt-8 rounded-3xl border border-zinc-200 p-6">
        <h2 className="text-lg font-bold">{t(m, "account.loginTitle", "")}</h2>
        <p className="mt-1 text-sm text-zinc-500">{t(m, "account.loginNote", "")}</p>
        <form className="mt-4 grid gap-3">
          <label className="block text-sm font-medium">
            {t(m, "account.email", "")}
            <input type="email" disabled placeholder="voce@exemplo.com" className={`${inputCls} mt-1 bg-zinc-50`} />
          </label>
          <label className="block text-sm font-medium">
            {t(m, "account.password", "")}
            <input type="password" disabled placeholder="••••••••" className={`${inputCls} mt-1 bg-zinc-50`} />
          </label>
          <button
            type="button"
            disabled
            className="mt-1 cursor-not-allowed rounded-full bg-zinc-300 px-6 py-2 text-sm font-semibold text-white"
          >
            {t(m, "account.loginButton", "")}
          </button>
        </form>
      </section>

      {/* Address form (UI only for now) */}
      <section className="mt-6 rounded-3xl border border-zinc-200 p-6">
        <h2 className="text-lg font-bold">{t(m, "account.addressTitle", "")}</h2>
        <form className="mt-4 grid gap-3 sm:grid-cols-2">
          {addressFields.map((f) => (
            <label
              key={f.name}
              className={`block text-sm font-medium ${f.span ? "sm:col-span-2" : ""}`}
            >
              {f.label}
              {f.required && <span className="text-zinc-400"> *</span>}
              <input
                name={f.name}
                type={f.type}
                required={f.required}
                className={`${inputCls} mt-1`}
              />
            </label>
          ))}

          <fieldset className="space-y-2 sm:col-span-2">
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" required className="mt-1" />
              <span>
                {t(m, "consent.terms", "")} ({t(m, "consent.required", "")})
              </span>
            </label>
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" required className="mt-1" />
              <span>
                {t(m, "consent.privacy", "")} ({t(m, "consent.required", "")})
              </span>
            </label>
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" required className="mt-1" />
              <span>
                {t(m, "consent.cookies", "")} ({t(m, "consent.required", "")})
              </span>
            </label>
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1" />
              <span>{t(m, "consent.marketing", "")}</span>
            </label>
          </fieldset>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-full bg-zinc-900 px-6 py-2 text-sm font-semibold text-white hover:bg-zinc-700"
            >
              {t(m, "account.save", "")}
            </button>
            <p className="mt-2 text-xs text-zinc-500">{t(m, "account.savedNote", "")}</p>
          </div>
        </form>
      </section>
    </main>
  );
}
