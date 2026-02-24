"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCardIssuingStore } from "@/stores/card-issuing-store";
import { CARD_TYPES } from "@/lib/constants/card-types";
import { OrgNameInput } from "./OrgNameInput";
import { CardTypeOption } from "./CardTypeOption";
import { ModalCardPreview } from "./ModalCardPreview";

export function CardTypeModal() {
  const router = useRouter();
  const modalOpen = useCardIssuingStore((s) => s.modalOpen);
  const setModalOpen = useCardIssuingStore((s) => s.setModalOpen);
  const cardType = useCardIssuingStore((s) => s.cardType);
  const setCardType = useCardIssuingStore((s) => s.setCardType);
  const orgName = useCardIssuingStore((s) => s.orgName);
  const proceedToDetails = useCardIssuingStore((s) => s.proceedToDetails);

  const handleGetStarted = () => {
    if (!cardType) return;
    proceedToDetails();
    router.push("/create");
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            onClick={() => setModalOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal content */}
          <motion.div
            className="relative z-10 mx-4 flex w-full max-w-[1024px] min-h-[660px] overflow-hidden rounded-2xl bg-white shadow-[0_24px_48px_-12px_rgba(24,24,27,0.18)]"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Close button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute left-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-lg text-[#70707B] hover:bg-[#F4F4F5] hover:text-[#18181B] transition-colors"
            >
              <i className="fa-solid fa-xmark text-lg" />
            </button>

            {/* Left panel - Form */}
            <div className="flex flex-1 flex-col gap-6 p-10 pt-16">
              <div>
                <h2 className="text-2xl font-medium tracking-[0.36px] text-[#18181B]">
                  Let&apos;s get started
                </h2>
              </div>

              <OrgNameInput />

              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-[#3F3F46]">
                  Card type
                </label>
                {CARD_TYPES.map((config) => (
                  <CardTypeOption
                    key={config.type}
                    config={config}
                    isSelected={cardType === config.type}
                    onSelect={setCardType}
                    onGetStarted={handleGetStarted}
                  />
                ))}
              </div>
            </div>

            {/* Right panel - Preview (at least half the modal) */}
            <div className="hidden w-1/2 shrink-0 p-3 md:block">
              <ModalCardPreview cardType={cardType} orgName={orgName} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
