import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { BaseIcon as Icon, type BaseIconName } from "./iconsBase";

type Variant = "primary" | "outline" | "light" | "outlineLight";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-lg font-medium leading-none tracking-[.2px] whitespace-nowrap transition-colors duration-[250ms]";

const variants: Record<Variant, string> = {
  primary: "bg-olive text-white hover:bg-olive-dark",
  outline: "border border-line bg-transparent text-ink hover:border-olive hover:text-olive",
  light: "bg-paper text-ink hover:bg-white",
  outlineLight: "border border-white/45 text-white hover:border-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "h-[46px] px-[22px] text-[14.5px]",
  lg: "h-[50px] px-7 text-[15px]",
};

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  icon?: BaseIconName;
};

export function ButtonLink({ variant = "primary", size = "md", icon, className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {icon ? <Icon name={icon} className="size-4 flex-none" /> : null}
    </Link>
  );
}
