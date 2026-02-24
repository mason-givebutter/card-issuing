"use client";

import { Button } from "@/components/ui/button";
import { CardTypeModal } from "@/components/card-issuing/CardTypeModal";
import { useCardIssuingStore } from "@/stores/card-issuing-store";

export default function Home() {
  const setModalOpen = useCardIssuingStore((s) => s.setModalOpen);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAFAFA]">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#3366FF]/10">
          <i className="fa-solid fa-credit-card text-2xl text-[#3366FF]" />
        </div>
        <h1 className="text-2xl font-medium tracking-[0.36px] text-[#18181B]">
          Card Issuing
        </h1>
        <p className="max-w-md text-sm text-[#51525C]">
          Issue virtual and physical credit cards for your team. Set spending
          limits, assign cardholders, and manage everything in one place.
        </p>
        <Button
          onClick={() => setModalOpen(true)}
          className="mt-2 h-10 rounded-lg bg-[#3366FF] px-5 text-sm font-medium text-white hover:bg-[#004EEB]"
        >
          <i className="fa-solid fa-plus mr-2" />
          Issue a card
        </Button>
      </div>

      <CardTypeModal />
    </div>
  );
}
