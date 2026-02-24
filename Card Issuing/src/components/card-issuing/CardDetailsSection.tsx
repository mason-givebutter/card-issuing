"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCardIssuingStore } from "@/stores/card-issuing-store";
import { MOCK_CARDHOLDERS } from "@/lib/constants/card-types";

export function CardDetailsSection() {
  const nickname = useCardIssuingStore((s) => s.nickname);
  const setNickname = useCardIssuingStore((s) => s.setNickname);
  const cardholderId = useCardIssuingStore((s) => s.cardholderId);
  const setCardholderId = useCardIssuingStore((s) => s.setCardholderId);

  return (
    <div className="rounded-xl border border-[#E4E4E7] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <h3 className="mb-4 text-base font-medium text-[#18181B]">
        Card details
      </h3>

      <div className="flex flex-col gap-4">
        {/* Card nickname */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="nickname" className="text-sm font-medium text-[#3F3F46]">
            Card nickname
          </Label>
          <Input
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="e.g. Marketing + Subscriptions"
          />
        </div>

        {/* Assign cardholder */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium text-[#3F3F46]">
            Assign cardholder
          </Label>
          <Select value={cardholderId || ""} onValueChange={setCardholderId}>
            <SelectTrigger className="h-11 rounded-lg border-[#D1D1D6] bg-white text-sm shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <SelectValue placeholder="Select a team member" />
            </SelectTrigger>
            <SelectContent>
              {MOCK_CARDHOLDERS.map((person) => (
                <SelectItem key={person.id} value={person.id}>
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4F4F5] text-xs font-medium text-[#51525C]">
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span>{person.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
