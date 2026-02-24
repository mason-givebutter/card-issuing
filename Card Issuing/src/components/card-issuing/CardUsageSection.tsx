"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCardIssuingStore } from "@/stores/card-issuing-store";
import { SPEND_FREQUENCIES } from "@/lib/constants/card-types";
import type { SpendFrequency } from "@/types/card";

export function CardUsageSection() {
  const spendControlsEnabled = useCardIssuingStore(
    (s) => s.spendControlsEnabled
  );
  const setSpendControlsEnabled = useCardIssuingStore(
    (s) => s.setSpendControlsEnabled
  );
  const spendAmount = useCardIssuingStore((s) => s.spendAmount);
  const setSpendAmount = useCardIssuingStore((s) => s.setSpendAmount);
  const spendFrequency = useCardIssuingStore((s) => s.spendFrequency);
  const setSpendFrequency = useCardIssuingStore((s) => s.setSpendFrequency);

  return (
    <div className="rounded-xl border border-[#E4E4E7] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <h3 className="mb-4 text-base font-medium text-[#18181B]">Card usage</h3>

      {/* Spend controls toggle */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-[#18181B]">
            Spend controls
          </span>
          <span className="text-sm text-[#51525C]">
            Set a spending limit for this card
          </span>
        </div>
        <Switch
          checked={spendControlsEnabled}
          onCheckedChange={setSpendControlsEnabled}
        />
      </div>

      {/* Spend amount + frequency — CSS grid transition */}
      <div
        className="overflow-hidden transition-all duration-200 ease-out"
        style={{
          display: "grid",
          gridTemplateRows: spendControlsEnabled ? "1fr" : "0fr",
          opacity: spendControlsEnabled ? 1 : 0,
        }}
      >
        <div className="min-h-0">
          <div className="mt-4 flex gap-4">
            <div className="flex flex-1 flex-col gap-1.5">
              <Label className="text-sm font-medium text-[#3F3F46]">
                Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#A0A0AB]">
                  $
                </span>
                <Input
                  type="text"
                  value={spendAmount}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9.]/g, "");
                    setSpendAmount(val);
                  }}
                  placeholder="0.00"
                  className="pl-7"
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-1.5">
              <Label className="text-sm font-medium text-[#3F3F46]">
                Frequency
              </Label>
              <Select
                value={spendFrequency}
                onValueChange={(val) =>
                  setSpendFrequency(val as SpendFrequency)
                }
              >
                <SelectTrigger className="h-11 rounded-lg border-[#D1D1D6] bg-white text-sm shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SPEND_FREQUENCIES.map((freq) => (
                    <SelectItem key={freq.value} value={freq.value}>
                      {freq.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
