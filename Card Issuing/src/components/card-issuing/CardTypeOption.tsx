"use client";

import { Button } from "@/components/ui/button";
import type { CardTypeConfig } from "@/lib/constants/card-types";
import type { CardType } from "@/types/card";

interface CardTypeOptionProps {
  config: CardTypeConfig;
  isSelected: boolean;
  onSelect: (type: CardType) => void;
  onGetStarted: () => void;
}

export function CardTypeOption({
  config,
  isSelected,
  onSelect,
  onGetStarted,
}: CardTypeOptionProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(config.type)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(config.type);
        }
      }}
      className={`relative flex w-full cursor-pointer flex-col rounded-xl border-2 p-4 text-left transition-colors ${
        isSelected
          ? "border-[#3366FF] bg-[#F8FAFF]"
          : "border-[#E4E4E7] bg-white hover:border-[#D1D1D6]"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            isSelected
              ? "bg-[#3366FF] text-white"
              : "bg-[#F4F4F5] text-[#51525C]"
          }`}
        >
          <i className={`${config.icon} text-base`} />
        </div>
        <span className="text-base font-medium text-[#18181B]">
          {config.label}
        </span>
        <div className="ml-auto">
          <div
            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
              isSelected ? "border-[#3366FF]" : "border-[#D1D1D6]"
            }`}
          >
            {isSelected && (
              <div className="h-2.5 w-2.5 rounded-full bg-[#3366FF]" />
            )}
          </div>
        </div>
      </div>

      {/* Expand/collapse with CSS grid transition */}
      <div
        className="overflow-hidden transition-all duration-200 ease-out"
        style={{
          display: "grid",
          gridTemplateRows: isSelected ? "1fr" : "0fr",
          opacity: isSelected ? 1 : 0,
        }}
      >
        <div className="min-h-0">
          <p className="mt-3 mb-3 text-sm text-[#51525C] leading-relaxed">
            {config.description}
          </p>
          <Button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onGetStarted();
            }}
            className="h-10 w-full rounded-lg bg-[#3366FF] text-sm font-medium text-white hover:bg-[#004EEB]"
          >
            Get started
          </Button>
        </div>
      </div>
    </div>
  );
}
