import { z } from "zod/v4";

export const orgNameSchema = z
  .string()
  .min(1, "Organization name is required")
  .max(22, "Org name limited to 22 characters");

export const cardDetailsSchema = z.object({
  nickname: z.string().min(1, "Card nickname is required"),
  cardholderId: z.string().min(1, "Please select a cardholder"),
  spendControlsEnabled: z.boolean(),
  spendAmount: z.string().optional(),
  spendFrequency: z.enum(["daily", "weekly", "monthly"]).optional(),
});

export const shippingSchema = z.object({
  line1: z.string().min(1, "Address is required"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),
});

export type CardDetailsFormData = z.infer<typeof cardDetailsSchema>;
export type ShippingFormData = z.infer<typeof shippingSchema>;
