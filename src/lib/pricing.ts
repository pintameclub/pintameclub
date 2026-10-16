export type PlanId = "monthly" | "yearly";

export interface Plan {
  id: PlanId;
  priceBRL: number;
  /** Pre-formatted label, e.g. "R$59,90/mês". */
  label: string;
}

export const PLANS: Record<PlanId, Plan> = {
  monthly: { id: "monthly", priceBRL: 59.9, label: "R$59,90/mês" },
  yearly: { id: "yearly", priceBRL: 640, label: "R$640/ano" },
};

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
