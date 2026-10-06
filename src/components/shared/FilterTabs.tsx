"use client";

import { cn } from "@/lib/utils";

type Props = {
  options: readonly string[];
  active: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
};

/** Underlined category tabs from the original Blog page. */
export function FilterTabs({ options, active, onChange, label, className }: Props) {
  return (
    <div
      role="toolbar"
      aria-label={label}
      className={cn("flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-7 sm:gap-y-3.5 lg:flex-nowrap lg:gap-x-10", className)}
    >
      {options.map((option) => {
        const isActive = option === active;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option)}
            className={cn(
              "relative pb-[7px] text-[14.5px] leading-[1.2] transition-colors duration-200 hover:text-olive sm:pb-[9px] sm:text-[15.5px]",
              isActive
                ? "font-semibold text-olive after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-olive"
                : "font-medium text-ink-soft",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
