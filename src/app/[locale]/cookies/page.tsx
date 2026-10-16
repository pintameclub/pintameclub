import { notFound } from "next/navigation";
import { getMessages, isLocale, t } from "@/i18n";

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const m = getMessages(locale);

  const rows = [
    { cat: "Necessários", ex: "Consentimento de cookies (localStorage), idioma", base: "Execução do site" },
    { cat: "Preferenciais", ex: "Idioma escolhido", base: "Consentimento" },
    { cat: "Analíticos", ex: "Medição de visitas (a definir)", base: "Consentimento" },
    { cat: "Marketing", ex: "Opt-in de novidades por e-mail", base: "Consentimento" },
  ];

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-12">
      <h1 className="text-3xl font-extrabold">{t(m, "policies.cookies", "Cookies")}</h1>
      <p className="mt-4 text-sm leading-relaxed text-zinc-700">
        Usamos poucos cookies e o armazenamento local do navegador. O banner de
        consentimento permite aceitar ou recusar; a escolha fica salva no seu
        navegador e pode ser revista limpando os dados do site.
      </p>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-50">
              <th className="px-3 py-2 text-left font-bold">Categoria</th>
              <th className="px-3 py-2 text-left font-bold">Exemplos</th>
              <th className="px-3 py-2 text-left font-bold">Base</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.cat} className="border-t border-zinc-100">
                <td className="px-3 py-2 font-medium">{r.cat}</td>
                <td className="px-3 py-2 text-zinc-600">{r.ex}</td>
                <td className="px-3 py-2 text-zinc-600">{r.base}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
