"use client";

import { useCardIssuingStore } from "@/stores/card-issuing-store";
import { MOCK_CARDHOLDERS, SPEND_FREQUENCIES } from "@/lib/constants/card-types";

export function InfoOverlay() {
  const cardholderId = useCardIssuingStore((s) => s.cardholderId);
  const spendControlsEnabled = useCardIssuingStore(
    (s) => s.spendControlsEnabled
  );
  const spendAmount = useCardIssuingStore((s) => s.spendAmount);
  const spendFrequency = useCardIssuingStore((s) => s.spendFrequency);

  const cardholder = MOCK_CARDHOLDERS.find((c) => c.id === cardholderId);
  const frequencyLabel =
    SPEND_FREQUENCIES.find((f) => f.value === spendFrequency)?.label || "";

  const hasInfo = cardholder || (spendControlsEnabled && spendAmount);

  if (!hasInfo) return null;

  return (
    <div
      className="w-full max-w-[260px] rounded-2xl p-4"
      style={{
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <div className="flex flex-col gap-3">
        {cardholder && (
          <div>
            <p className="text-xs font-normal text-white/60">Issuing to</p>
            <p className="text-sm font-medium text-white">{cardholder.name}</p>
          </div>
        )}

        {spendControlsEnabled && spendAmount && (
          <>
            <div>
              <p className="text-xs font-normal text-white/60">Spend limit</p>
              <p className="text-sm font-medium text-white">Enabled</p>
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-xs font-normal text-white/60">Amount</p>
                <p className="text-sm font-medium text-white">
                  ${Number(spendAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-xs font-normal text-white/60">Frequency</p>
                <p className="text-sm font-medium text-white">
                  {frequencyLabel}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
