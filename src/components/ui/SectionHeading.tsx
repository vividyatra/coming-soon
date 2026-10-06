import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  tone?: "dark" | "light";
  /** rendered on the right on desktop (e.g. slider arrows / "view all") */
  action?: ReactNode;
  className?: string;
  titleId?: string;
};

/**
 * Section head from the original "Popular Destinations" block:
 * dashed eyebrow, Playfair title, light muted subtitle.
 */
export function SectionHeading({ eyebrow, title, subtitle, align = "center", tone = "dark", action, className, titleId }: Props) {
  const light = tone === "light";
  const centered = align === "center";

  return (
    <div
      className={cn(
        "relative flex flex-col gap-4 pb-[18px] md:pb-[30px]",
        centered ? "items-center text-center" : "items-start text-left",
        Boolean(action) && !centered && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn(centered && "mx-auto")}>
        {eyebrow ? (
          <span
            className={cn(
              "eyebrow-dashed inline-flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[1.8px] sm:text-xs sm:tracking-[2.2px]",
              light ? "eyebrow-light text-white/75" : "text-eyebrow",
              !centered && "before:hidden",
            )}
          >
            {eyebrow}
          </span>
        ) : null}
        <h2
          id={titleId}
          className={cn(
            "mt-1 text-[25px] font-medium leading-[1.2] sm:text-[28px] md:text-[32px] lg:text-[34px]",
            light ? "text-white" : "text-ink-deep",
          )}
        >
          {title}
        </h2>
        {subtitle ? (
          <p className={cn("mt-1 text-sm font-light md:text-[14.5px]", light ? "text-white/72" : "text-muted", centered && "mx-auto max-w-[560px]")}>
            {subtitle}
          </p>
        ) : null}
      </div>
      {action ? (
        <div className={cn(centered && "md:absolute md:right-0 md:bottom-8")}>{action}</div>
      ) : null}
    </div>
  );
}
