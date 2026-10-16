// Payment provider stubs (Mercado Pago + PayPal).
//
// SAFETY RULES (do not bypass when wiring the real integration):
// - Never handle, store, or log raw card data. All card input happens on the
//   provider's hosted checkout (Mercado Pago Checkout Pro / PayPal buttons).
// - Always verify webhook signatures (Mercado Pago x-signature / PayPal
//   webhook verification) before trusting any payment event.
// - Reconcile subscription status from provider webhooks, never from
//   client-side redirects alone.
//
// TODO: wire Mercado Pago Checkout Pro (preapproval for recurring payments)
//   using MERCADOPAGO_ACCESS_TOKEN (server only).
// TODO: wire PayPal Subscriptions (plan + subscription create + webhook)
//   using PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET with PAYPAL_MODE=sandbox first.

import type { PlanId } from "./pricing";

export interface CheckoutInput {
  plan: PlanId;
  userId: string;
  successUrl: string;
  cancelUrl: string;
}

export async function createMercadoPagoCheckout(
  _input: CheckoutInput,
): Promise<{ url: string }> {
  // TODO: implement with the mercadopago SDK (server-side only):
  //  1. create a preapproval (recurring) or preference (one-off yearly);
  //  2. set back_urls + notification_url (webhook);
  //  3. return init_point.
  throw new Error("TODO: Mercado Pago checkout not wired yet.");
}

export async function createPayPalSubscription(
  _input: CheckoutInput,
): Promise<{ url: string }> {
  // TODO: implement with PayPal Subscriptions API:
  //  1. create product + billing plan (monthly / yearly) once;
  //  2. create subscription with application_context return/cancel URLs;
  //  3. return the approval link (rel: "approve").
  throw new Error("TODO: PayPal subscription not wired yet.");
}
