import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

export type Crumb = { label: string; href?: string };

/** Breadcrumb trail — light on photo heroes, dark on cream backgrounds. */
export function Breadcrumbs({ items, tone = "light", className }: { items: Crumb[]; tone?: "light" | "dark"; className?: string }) {
  const light = tone === "light";
  return (
    <nav aria-label="Breadcrumb" className={cn("text-[13px]", className)}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="inline-flex items-center gap-1.5">
              {item.href && !last ? (
                <Link href={item.href} className={cn("transition-colors", light ? "text-white/80 hover:text-white" : "text-muted hover:text-olive")}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={cn("font-medium", light ? "text-white" : "text-ink")}>
                  {item.label}
                </span>
              )}
              {!last ? <Icon name="chevronRight" className={cn("size-3.5", light ? "text-white/60" : "text-stone")} /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
