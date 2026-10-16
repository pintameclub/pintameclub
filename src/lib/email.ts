// Resend email stub.
//
// TODO:
//  1. Set RESEND_API_KEY (server only) and EMAIL_FROM=contato@pinta-me.com.
//  2. Verify the pinta-me.com domain in Resend (SPF/DKIM via Cloudflare DNS)
//     before sending from it; use the Resend sandbox domain only for dev.
//  3. Implement templates for welcome / payment status / shipping notice.

import { Resend } from "resend";

function getClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("TODO: RESEND_API_KEY is not set.");
  return new Resend(apiKey);
}

export async function sendWelcome(to: string, name?: string) {
  const resend = getClient();
  const from = process.env.EMAIL_FROM ?? "contato@pinta-me.com";
  // TODO: replace with a proper template + locale-aware copy.
  return resend.emails.send({
    from,
    to,
    subject: "Bem-vindo(a) ao Pinta-me!",
    text: `Olá ${name ?? "por aí"}! Sua assinatura do clube Pinta-me foi criada. Em breve você recebe o primeiro envelope.`,
  });
}

export async function sendPaymentStatus(
  to: string,
  status: string,
) {
  const resend = getClient();
  const from = process.env.EMAIL_FROM ?? "contato@pinta-me.com";
  // TODO: template per status (approved / pending / failed) + locale-aware copy.
  return resend.emails.send({
    from,
    to,
    subject: "Atualização do seu pagamento — Pinta-me",
    text: `O status do seu pagamento é: ${status}. Qualquer dúvida, responda este e-mail.`,
  });
}
