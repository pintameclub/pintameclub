import { notFound } from "next/navigation";
import { getMessages, isLocale, t } from "@/i18n";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const m = getMessages(locale);

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-12">
      <h1 className="text-3xl font-extrabold">{t(m, "policies.terms", "Termos de Assinatura")}</h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-zinc-700">
        <section>
          <h2 className="text-lg font-bold text-zinc-900">1. O clube</h2>
          <p>
            O Pinta-me é uma assinatura mensal de arte: a cada ciclo, o membro recebe
            um envelope com obra impressa exclusiva, guia criativo e extras. O conteúdo
            varia a cada edição e as fotos do site são ilustrativas.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-zinc-900">2. Planos e cobrança</h2>
          <p>
            Mensal: R$59,90 por ciclo, cobrança recorrente. Anual: R$640 à vista (ou
            conforme parcelamento do provedor), cobrindo 12 envelopes. A cobrança é
            processada pelo Mercado Pago ou PayPal; ao assinar, você também aceita os
            termos do provedor escolhido.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-zinc-900">3. Envios</h2>
          <p>
            Enviamos para o Brasil e o mundo. Assinaturas confirmadas até o dia 15
            entram no envio do mês corrente; após essa data, no mês seguinte. Prazos
            de entrega variam por destino e greves/fatores externos podem atrasar
            envios sem gerar multa. O rastreio é enviado por e-mail.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-zinc-900">4. Cancelamento</h2>
          <p>
            O plano mensal pode ser cancelado a qualquer momento, com acesso até o fim
            do ciclo pago. O plano anual pode ser cancelado com reembolso proporcional
            aos meses não enviados (descontados custos já incorridos). Para cancelar,
            escreva para pintame.club@gmail.com.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-zinc-900">5. Reembolsos</h2>
          <p>
            [PLACEHOLDER — definir política final com advogado: extravios, envelopes
            danificados e arrependimento em até 7 dias (art. 49 do CDC para compras
            online, quando aplicável).]
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-zinc-900">6. Contato</h2>
          <p>
            Dúvidas sobre estes termos:{" "}
            <a className="underline" href="mailto:pintame.club@gmail.com">
              pintame.club@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
