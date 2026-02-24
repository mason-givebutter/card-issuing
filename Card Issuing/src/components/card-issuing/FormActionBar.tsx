"use client";

import { Button } from "@/components/ui/button";
import { useCardIssuingStore } from "@/stores/card-issuing-store";

interface FormActionBarProps {
  onSubmit: () => void;
}

export function FormActionBar({ onSubmit }: FormActionBarProps) {
  const isSubmitting = useCardIssuingStore((s) => s.isSubmitting);
  const reset = useCardIssuingStore((s) => s.reset);

  return (
    <div className="sticky bottom-0 z-10 flex items-center justify-end gap-3 border-t border-[#E4E4E7] bg-white px-8 py-4">
      <Button
        type="button"
        variant="outline"
        onClick={reset}
        disabled={isSubmitting}
        className="h-10 rounded-lg border-[#D1D1D6] px-4 text-sm font-medium text-[#3F3F46] hover:bg-[#F4F4F5]"
      >
        Cancel
      </Button>
      <Button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="h-10 rounded-lg bg-[#3366FF] px-4 text-sm font-medium text-white hover:bg-[#004EEB] disabled:opacity-50"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <i className="fa-solid fa-spinner fa-spin" />
            Creating...
          </span>
        ) : (
          "Create card"
        )}
      </Button>
    </div>
  );
}
