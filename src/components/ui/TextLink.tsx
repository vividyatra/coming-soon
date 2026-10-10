import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { BaseIcon as Icon } from "./iconsBase";

type Props = ComponentProps<typeof Link> & { tone?: "dark" | "light" };

/** Underlined "Discover More →" link from the original Journey section. */
export function TextLink({ tone = "dark", className, children, ...rest }: Props) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-2.5 border-b pb-[3px] text-[14.5px] font-medium transition-colors duration-200 md:text-[15px]",
        tone === "dark"
          ? "border-[#B7B3A2] text-ink hover:border-olive hover:text-olive"
          : "border-white/45 text-white hover:border-white",
        className,
      )}
      {...rest}
    >
      {children}
      <Icon name="arrowRight" className="size-[18px] transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}
