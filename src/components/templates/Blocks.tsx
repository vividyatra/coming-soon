import type { ReactNode } from "react";
import type { IconText } from "@/types/catalog";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/Icon";

/* Small building blocks shared by the detail templates. */

/** Heading used inside the main column of detail pages. */
export function BlockHeading({ id, eyebrow, children, className }: { id?: string; eyebrow?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("mb-5 md:mb-6", className)}>
      {eyebrow ? (
        <span className="eyebrow-dashed inline-flex items-center gap-3 text-[11px] font-medium tracking-[1.8px] text-eyebrow uppercase before:hidden sm:text-xs">{eyebrow}</span>
      ) : null}
      <h2 id={id} className="mt-1 text-[24px] leading-[1.2] font-medium text-ink-deep md:text-[28px] lg:text-[30px]">
        {children}
      </h2>
    </div>
  );
}

/** Scroll target wrapper for in-page navigation. */
export function DetailBlock({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("scroll-mt-24 border-b border-line-soft pb-10 md:pb-12 [&:last-child]:border-0", className)}>
      {children}
    </section>
  );
}

/** Icon + title + text grid (why visit, benefits, experiences…). */
export function IconGrid({ items, columns = 2, tone = "card" }: { items: IconText[]; columns?: 2 | 3 | 4; tone?: "card" | "plain" }) {
  return (
    <ul
      className={cn(
        "grid gap-4 sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        columns === 4 && "lg:grid-cols-4",
      )}
    >
      {items.map((item) => (
        <li
          key={item.title}
          className={cn("flex gap-4", tone === "card" && "rounded-[14px] border border-line-soft bg-white p-5 shadow-tile")}
        >
          <span className="flex size-12 flex-none items-center justify-center rounded-full bg-cream-2 text-olive">
            <Icon name={item.icon} className="size-6" />
          </span>
          <span className="block">
            <span className="block text-[15.5px] leading-[1.35] font-semibold text-ink">{item.title}</span>
            <span className="mt-1 block text-[14px] leading-[1.6] text-subtle">{item.text}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Check / cross list used for highlights, inclusions and exclusions. */
export function CheckList({ items, variant = "check", columns = 1 }: { items: string[]; variant?: "check" | "cross" | "dot"; columns?: 1 | 2 }) {
  return (
    <ul className={cn("grid gap-x-8 gap-y-3", columns === 2 && "sm:grid-cols-2")}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.6] text-body">
          <span
            className={cn(
              "mt-0.5 flex size-[22px] flex-none items-center justify-center rounded-full",
              variant === "check" && "bg-cream-2 text-olive",
              variant === "cross" && "bg-[#F6E9E4] text-[#A8442C]",
              variant === "dot" && "bg-cream-2 text-olive",
            )}
          >
            {variant === "cross" ? <Icon name="plus" className="size-3.5 rotate-45" /> : variant === "dot" ? <span className="size-1.5 rounded-full bg-olive" /> : <Icon name="check" className="size-3.5" />}
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Label / value facts panel. */
export function FactsPanel({ facts, icon = "info" }: { facts: { label: string; value: string; icon?: IconName }[]; icon?: IconName }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-line-soft bg-line-soft lg:grid-cols-4">
      {facts.map((f) => (
        <div key={f.label} className="bg-white p-4 md:p-5">
          <dt className="flex items-center gap-2 text-[12px] font-medium tracking-[.6px] text-muted uppercase">
            <Icon name={f.icon ?? icon} className="size-4 text-olive" />
            {f.label}
          </dt>
          <dd className="mt-1.5 text-[15px] leading-[1.45] font-semibold text-ink">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Two-column detail layout: main content + sticky sidebar. */
export function DetailLayout({ children, sidebar }: { children: ReactNode; sidebar: ReactNode }) {
  return (
    <div className="container-site grid gap-10 pt-10 md:pt-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12 2xl:grid-cols-[minmax(0,1fr)_380px] 2xl:gap-16">
      <div className="min-w-0 space-y-10 md:space-y-12">{children}</div>
      <div className="lg:relative">
        <div className="lg:sticky lg:top-20">{sidebar}</div>
      </div>
    </div>
  );
}
