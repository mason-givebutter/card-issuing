"use client";

import { useRouter } from "next/navigation";
import { useCardIssuingStore } from "@/stores/card-issuing-store";
import { CardDetailsSection } from "./CardDetailsSection";
import { CardUsageSection } from "./CardUsageSection";
import { ShippingSection } from "./ShippingSection";
import { FormActionBar } from "./FormActionBar";

export function CardDetailsForm() {
  const router = useRouter();
  const cardType = useCardIssuingStore((s) => s.cardType);
  const goBackToTypeSelection = useCardIssuingStore(
    (s) => s.goBackToTypeSelection
  );
  const submit = useCardIssuingStore((s) => s.submit);

  const isPhysical = cardType === "physical";
  const cardTypeLabel = isPhysical ? "physical" : "virtual";

  const handleBack = () => {
    goBackToTypeSelection();
    router.push("/");
  };

  const handleSubmit = async () => {
    await submit();
    // Could navigate to success or reset
  };

  return (
    <div className="flex h-full flex-col">
      {/* Scrollable form area */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-[#51525C] hover:text-[#18181B] transition-colors"
        >
          <i className="fa-solid fa-arrow-left text-xs" />
          Back
        </button>

        {/* Heading */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-2xl font-medium tracking-[0.36px] text-[#18181B]">
            Create a {cardTypeLabel} card for you or your team
          </h1>
          <p className="mt-1 text-sm text-[#51525C]">
            Fill in the details below to issue a new {cardTypeLabel} card
          </p>
        </div>

        {/* Form sections */}
        <div className="flex flex-col gap-6">
          <div className="animate-fade-in-up-delay-1">
            <CardDetailsSection />
          </div>

          <div className="animate-fade-in-up-delay-2">
            <CardUsageSection />
          </div>

          {isPhysical && (
            <div className="animate-fade-in-up-delay-3">
              <ShippingSection />
            </div>
          )}
        </div>
      </div>

      {/* Sticky bottom bar */}
      <FormActionBar onSubmit={handleSubmit} />
    </div>
  );
}
