import type { CardType } from "@/types/card";

export interface CardTypeConfig {
  type: CardType;
  label: string;
  description: string;
  icon: string;
  gradient: string;
}

export const CARD_TYPES: CardTypeConfig[] = [
  {
    type: "virtual",
    label: "Virtual card",
    description:
      "Instantly create a virtual card for online purchases, subscriptions, and recurring payments.",
    icon: "fa-solid fa-bolt",
    gradient: "linear-gradient(135deg, #3366FF 0%, #8EB6FF 100%)",
  },
  {
    type: "physical",
    label: "Physical card",
    description:
      "Order a physical card for in-person purchases and ATM withdrawals. Ships within 5-7 business days.",
    icon: "fa-solid fa-credit-card",
    gradient: "linear-gradient(135deg, #8B6914 0%, #C4963C 50%, #8B6914 100%)",
  },
];

export const SPEND_FREQUENCIES = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
] as const;

export const MOCK_CARDHOLDERS = [
  { id: "1", name: "Olivia Rhye", email: "olivia@company.com", avatar: "" },
  { id: "2", name: "Phoenix Baker", email: "phoenix@company.com", avatar: "" },
  { id: "3", name: "Lana Steiner", email: "lana@company.com", avatar: "" },
  { id: "4", name: "Demi Wilkinson", email: "demi@company.com", avatar: "" },
  { id: "5", name: "Candice Wu", email: "candice@company.com", avatar: "" },
];
