import { notFound } from "next/navigation";
import { getMessages, isLocale, t } from "@/i18n";

// Guarded placeholder: real role check (User.role === "admin") ships with auth.
// TODO: add middleware/server check redirecting non-admins to /conta.
export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const m = getMessages(locale);

  const sections = [
    { key: "hero", title: "Hero", updated: "—" },
    { key: "logo", title: "Logo", updated: "—" },
    { key: "inside", title: t(m, "nav.whatsInside", ""), updated: "—" },
    { key: "about", title: t(m, "about.title", ""), updated: "—" },
    { key: "faq", title: t(m, "faq.title", ""), updated: "—" },
  ];

  const th = "border-b border-zinc-200 px-3 py-2 text-left text-xs font-bold uppercase tracking-wide text-zinc-500";
  const td = "border-b border-zinc-100 px-3 py-2 text-sm";

  return (
    <main className="mx-auto max-w-5xl flex-1 px-4 py-12">
      <h1 className="text-3xl font-extrabold">{t(m, "admin.title", "")}</h1>
      <p className="mt-2 rounded-2xl bg-amber-100 p-4 text-sm text-amber-900">
        {t(m, "admin.guarded", "")}
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-bold">{t(m, "admin.sectionsTitle", "")}</h2>
        <p className="mt-1 text-sm text-zinc-500">{t(m, "admin.sectionsNote", "")}</p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-200">
          <table className="w-full">
            <thead>
              <tr>
                <th className={th}>{t(m, "admin.tableSection", "")}</th>
                <th className={th}>{t(m, "admin.tableTitle", "")}</th>
                <th className={th}>{t(m, "admin.tableUpdated", "")}</th>
                <th className={th}>{t(m, "admin.tableActions", "")}</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((s) => (
                <tr key={s.key}>
                  <td className={td}>{s.key}</td>
                  <td className={td}>{s.title}</td>
                  <td className={td}>{s.updated}</td>
                  <td className={td}>
                    <button
                      type="button"
                      disabled
                      className="cursor-not-allowed rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold text-zinc-400"
                    >
                      {t(m, "admin.edit", "")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold">{t(m, "admin.membersTitle", "")}</h2>
        <p className="mt-1 text-sm text-zinc-500">{t(m, "admin.membersNote", "")}</p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-200">
          <table className="w-full">
            <thead>
              <tr>
                <th className={th}>{t(m, "admin.tableName", "")}</th>
                <th className={th}>{t(m, "admin.tableEmail", "")}</th>
                <th className={th}>{t(m, "admin.tablePlan", "")}</th>
                <th className={th}>{t(m, "admin.tableStatus", "")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={td} colSpan={4}>
                  —
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold">{t(m, "admin.shipmentsTitle", "")}</h2>
        <button
          type="button"
          disabled
          className="mt-3 cursor-not-allowed rounded-full bg-zinc-300 px-6 py-2 text-sm font-semibold text-white"
        >
          {t(m, "admin.export", "")}
        </button>
      </section>
    </main>
  );
}
