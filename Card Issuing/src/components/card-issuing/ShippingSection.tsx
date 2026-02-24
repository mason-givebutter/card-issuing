"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCardIssuingStore } from "@/stores/card-issuing-store";

export function ShippingSection() {
  const shippingAddress = useCardIssuingStore((s) => s.shippingAddress);
  const setShippingAddress = useCardIssuingStore((s) => s.setShippingAddress);

  return (
    <div className="rounded-xl border border-[#E4E4E7] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <h3 className="mb-1 text-base font-medium text-[#18181B]">
        Where should we send this card?
      </h3>
      <p className="mb-4 text-sm text-[#51525C]">
        Enter the shipping address for this physical card
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium text-[#3F3F46]">
            Shipping address
          </Label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A0A0AB]">
              <i className="fa-solid fa-location-dot text-sm" />
            </span>
            <Input
              value={shippingAddress.line1}
              onChange={(e) => setShippingAddress({ line1: e.target.value })}
              placeholder="Enter shipping address"
              className="pl-9"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium text-[#3F3F46]">
            Apt, suite, etc. (optional)
          </Label>
          <Input
            value={shippingAddress.line2 || ""}
            onChange={(e) => setShippingAddress({ line2: e.target.value })}
            placeholder="Apt, suite, unit, building, floor, etc."
          />
        </div>

        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-1.5">
            <Label className="text-sm font-medium text-[#3F3F46]">City</Label>
            <Input
              value={shippingAddress.city}
              onChange={(e) => setShippingAddress({ city: e.target.value })}
              placeholder="City"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <Label className="text-sm font-medium text-[#3F3F46]">State</Label>
            <Input
              value={shippingAddress.state}
              onChange={(e) => setShippingAddress({ state: e.target.value })}
              placeholder="State"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-1.5">
            <Label className="text-sm font-medium text-[#3F3F46]">
              ZIP code
            </Label>
            <Input
              value={shippingAddress.zip}
              onChange={(e) => setShippingAddress({ zip: e.target.value })}
              placeholder="ZIP"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <Label className="text-sm font-medium text-[#3F3F46]">
              Country
            </Label>
            <Input
              value={shippingAddress.country}
              onChange={(e) => setShippingAddress({ country: e.target.value })}
              placeholder="Country"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
