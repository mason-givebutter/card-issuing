"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCardIssuingStore } from "@/stores/card-issuing-store";
import { CardDetailsForm } from "@/components/card-issuing/CardDetailsForm";
import { CardPreviewPanel } from "@/components/card-issuing/CardPreviewPanel";

export default function CreateCardPage() {
  const router = useRouter();
  const cardType = useCardIssuingStore((s) => s.cardType);

  // Guard: redirect to home if no card type selected
  useEffect(() => {
    if (!cardType) {
      router.replace("/");
    }
  }, [cardType, router]);

  if (!cardType) {
    return null;
  }

  return (
    <div className="flex h-screen">
      {/* Left panel - Form */}
      <div className="flex-1 max-w-[640px]">
        <CardDetailsForm />
      </div>

      {/* Right panel - Preview */}
      <div className="hidden flex-1 lg:block">
        <CardPreviewPanel />
      </div>
    </div>
  );
}
