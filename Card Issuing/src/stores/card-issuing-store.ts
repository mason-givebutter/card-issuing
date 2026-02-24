import { create } from "zustand";
import type { CardType, SpendFrequency, ShippingAddress } from "@/types/card";
import type { WizardPhase } from "@/types/wizard";

interface CardIssuingState {
  // Phase
  phase: WizardPhase;
  modalOpen: boolean;

  // Card type selection
  cardType: CardType | null;
  orgName: string;

  // Card details
  nickname: string;
  cardholderId: string | null;

  // Spend controls
  spendControlsEnabled: boolean;
  spendAmount: string;
  spendFrequency: SpendFrequency;

  // Shipping (physical only)
  shippingAddress: ShippingAddress;

  // Submission
  isSubmitting: boolean;

  // Actions
  setModalOpen: (open: boolean) => void;
  setCardType: (type: CardType) => void;
  setOrgName: (name: string) => void;
  setNickname: (nickname: string) => void;
  setCardholderId: (id: string) => void;
  setSpendControlsEnabled: (enabled: boolean) => void;
  setSpendAmount: (amount: string) => void;
  setSpendFrequency: (frequency: SpendFrequency) => void;
  setShippingAddress: (address: Partial<ShippingAddress>) => void;
  proceedToDetails: () => void;
  goBackToTypeSelection: () => void;
  submit: () => Promise<void>;
  reset: () => void;
}

const initialShippingAddress: ShippingAddress = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  zip: "",
  country: "United States",
};

export const useCardIssuingStore = create<CardIssuingState>((set) => ({
  phase: "type-selection",
  modalOpen: false,
  cardType: null,
  orgName: "",
  nickname: "",
  cardholderId: null,
  spendControlsEnabled: false,
  spendAmount: "",
  spendFrequency: "monthly",
  shippingAddress: { ...initialShippingAddress },
  isSubmitting: false,

  setModalOpen: (open) => set({ modalOpen: open }),
  setCardType: (type) => set({ cardType: type }),
  setOrgName: (name) => set({ orgName: name.slice(0, 22) }),
  setNickname: (nickname) => set({ nickname }),
  setCardholderId: (id) => set({ cardholderId: id }),
  setSpendControlsEnabled: (enabled) => set({ spendControlsEnabled: enabled }),
  setSpendAmount: (amount) => set({ spendAmount: amount }),
  setSpendFrequency: (frequency) => set({ spendFrequency: frequency }),
  setShippingAddress: (address) =>
    set((state) => ({
      shippingAddress: { ...state.shippingAddress, ...address },
    })),

  proceedToDetails: () =>
    set({ phase: "card-details", modalOpen: false }),

  goBackToTypeSelection: () =>
    set({ phase: "type-selection", modalOpen: true }),

  submit: async () => {
    set({ isSubmitting: true });
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    set({ isSubmitting: false });
  },

  reset: () =>
    set({
      phase: "type-selection",
      modalOpen: false,
      cardType: null,
      orgName: "",
      nickname: "",
      cardholderId: null,
      spendControlsEnabled: false,
      spendAmount: "",
      spendFrequency: "monthly",
      shippingAddress: { ...initialShippingAddress },
      isSubmitting: false,
    }),
}));
