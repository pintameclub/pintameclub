import { notFound } from "next/navigation";
import { getMessages, isLocale, t } from "@/i18n";

// LGPD draft in PT. NOTE: this is a starting draft — review by a Brazilian
// lawyer is required before launch.
export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const m = getMessages(locale);

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-12">
      <h1 className="text-3xl font-extrabold">{t(m, "policies.privacy", "Política de Privacidade")}</h1>
      <p className="mt-2 text-sm text-zinc-500">
        Minuta inicial — exige revisão por advogado brasileiro antes do lançamento.
      </p>

      <div className="prose-sm mt-8 space-y-6 text-sm leading-relaxed text-zinc-700">
        <section>
          <h2 className="text-lg font-bold text-zinc-900">1. Controlador</h2>
          <p>
            Controlador: [NOME/EMPRESA, CNPJ/CPF]. Contato do encarregado:{" "}
            <a className="underline" href="mailto:pintame.club@gmail.com">
              pintame.club@gmail.com
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-zinc-900">2. Dados que coletamos</h2>
          <p>
            Nome, e-mail, telefone, endereço de entrega (país, CEP, rua, número,
            complemento, cidade, estado), idioma de preferência, dados da assinatura
            (plano, status) e registros de consentimento (termos, privacidade, cookies,
            marketing).
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-zinc-900">3. Finalidades</h2>
          <p>
            Usamos seus dados para operar o clube: processar a assinatura, cobrar via
            provedores de pagamento, enviar os envelopes, emitir rastreio, prestar
            suporte e — apenas com seu opt-in — enviar novidades por e-mail.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-zinc-900">4. Compartilhamento</h2>
          <p>
            Compartilhamos o mínimo necessário com: Mercado Pago e PayPal
            (processamento de pagamentos), Resend (envio de e-mails transacionais) e
            transportadoras/Correios (entrega). Nunca vendemos seus dados.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-zinc-900">5. Seus direitos (arts. 18 e ss. da LGPD)</h2>
          <p>
            Você pode confirmar a existência de tratamento, acessar, corrigir,
            anonimizar, bloquear, eliminar dados, pedir portabilidade, revogar o
            consentimento e se opor a tratamentos. Escreva para{" "}
            <a className="underline" href="mailto:pintame.club@gmail.com">
              pintame.club@gmail.com
            </a>{" "}
            e responderemos conforme os prazos legais.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-zinc-900">6. Retenção</h2>
          <p>
            Mantemos os dados pelo tempo da assinatura e pelos prazos legais
            (fiscais e de defesa em disputas). Dados de marketing são apagados quando
            você revoga o consentimento.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-zinc-900">7. Cookies</h2>
          <p>
            Veja a nossa página de Cookies para a tabela de categorias
            (necessários, preferenciais, analíticos e de marketing) e como gerenciar
            seu consentimento pelo banner do site.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-zinc-900">8. Segurança</h2>
          <p>
            Pagamentos acontecem nos ambientes seguros do Mercado Pago e do PayPal;
            não armazenamos dados de cartão. Aplicamos controle de acesso por papel
            (admin/membro) e registramos consentimentos.
          </p>
        </section>
      </div>
    </main>
  );
}
