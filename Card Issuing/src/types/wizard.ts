import type { CardType, SpendFrequency, ShippingAddress } from "./card";

export type WizardPhase = "type-selection" | "card-details";

export interface WizardData {
  phase: WizardPhase;
  modalOpen: boolean;
  cardType: CardType | null;
  orgName: string;
  nickname: string;
  cardholderId: string | null;
  spendControlsEnabled: boolean;
  spendAmount: string;
  spendFrequency: SpendFrequency;
  shippingAddress: ShippingAddress;
  isSubmitting: boolean;
}
