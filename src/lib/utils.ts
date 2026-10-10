import { extendTailwindMerge } from "tailwind-merge";

/* teach tailwind-merge about the custom theme tokens so overrides resolve correctly */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      breakpoint: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"],
    },
  },
});

/** Join class names; later Tailwind utilities override earlier conflicting ones. */
export function cn(...classes: Array<string | number | boolean | null | undefined>) {
  return twMerge(classes.filter((c): c is string => typeof c === "string" && c.length > 0).join(" "));
}

/** ₹1,89,999 — Indian digit grouping, no decimals. */
export function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
