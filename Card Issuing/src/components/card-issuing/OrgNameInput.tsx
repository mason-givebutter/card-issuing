"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCardIssuingStore } from "@/stores/card-issuing-store";

export function OrgNameInput() {
  const orgName = useCardIssuingStore((s) => s.orgName);
  const setOrgName = useCardIssuingStore((s) => s.setOrgName);

  return (
    <div className="flex flex-col gap-1.5">
      <Label
        htmlFor="orgName"
        className="text-sm font-medium text-[#3F3F46]"
      >
        Organization name
      </Label>
      <Input
        id="orgName"
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
        placeholder="Enter organization name"
        maxLength={22}
      />
      <p className="text-xs text-[#70707B]">
        Org name limited to 22 characters
      </p>
    </div>
  );
}
