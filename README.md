# Pinta-me — mail club

Subscription club delivering Brazilian art envelopes monthly. Next.js 16 +
TypeScript + Tailwind + App Router (`src/` dir), 4 locales (PT default, ES, EN,
FR) via `next-intl`, Postgres via Prisma, payments via Mercado Pago + PayPal,
transactional email via Resend.

## Local dev

```bash
npm install
cp .env.example .env.local   # fill in values, never commit secrets
npx prisma generate
npx prisma migrate dev       # once DATABASE_URL points to a real Postgres
npm run dev                  # http://localhost:3000 -> redirects to /pt
npm run build
```

## Env setup

See `.env.example`. Required for full wiring: `DATABASE_URL`, `AUTH_SECRET`,
`RESEND_API_KEY`, `MERCADOPAGO_ACCESS_TOKEN`, PayPal client id/secret.
`.gitignore` already covers `.env*`.

## Payment wiring TODO (sandbox first)

- **Mercado Pago**: implement `createMercadoPagoCheckout()` in
  `src/lib/payments.ts` with Checkout Pro / preapproval (recurring), set
  `back_urls` + `notification_url`, reconcile via webhook. Verify `x-signature`
  on every webhook event.
- **PayPal**: implement `createPayPalSubscription()` (product + billing plan +
  subscription, `PAYPAL_MODE=sandbox`), verify webhook signatures, reconcile
  status server-side. Never trust client redirects alone.
- **Never handle card data**: all card input happens on provider-hosted pages.

## Resend domain verification (pinta-me.com via Cloudflare DNS)

1. Add domain in Resend dashboard, copy SPF/DKIM (and MX if receiving).
2. Add the TXT records in Cloudflare DNS for `pinta-me.com`, wait for
   "Verified".
3. Set `EMAIL_FROM=contato@pinta-me.com`. Use the Resend sandbox domain only
   for local dev.

## Deployment (Vercel + Cloudflare DNS)

1. Push to GitHub, import the repo in Vercel, set all env vars from
   `.env.example` in project settings.
2. In Cloudflare, point the apex/`www` to Vercel (A `76.76.21.21` or CNAME
   `cname.vercel-dns.com` per Vercel's instructions), add the domain in Vercel.
3. Run `npx prisma migrate deploy` against the production DB (Vercel build hook
   or manually). Do not use `migrate dev` in production.

## Safety notes

- PCI scope stays with the providers (Mercado Pago / PayPal hosted checkout).
- Webhook signature verification is mandatory before acting on payment events.
- Admin routes must check `User.role === "admin"` server-side (placeholder UI
  only for now; see `src/app/[locale]/admin/page.tsx`).

## LGPD warning

`politica-de-privacidade`, `cookies` and `termos` are **starting drafts**.
Review by a Brazilian lawyer is required before launch (controller identity,
retention, refunds, art. 49 CDC right of regret).
