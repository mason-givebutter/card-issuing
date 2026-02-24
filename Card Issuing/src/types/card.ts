export type CardType = "virtual" | "physical";

export type SpendFrequency = "daily" | "weekly" | "monthly";

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface CardHolder {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
