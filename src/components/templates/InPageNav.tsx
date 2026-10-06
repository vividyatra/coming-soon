"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Sticky section tabs for long detail pages. Highlights the section in view
 * and scrolls horizontally on small screens.
 */
export function InPageNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="sticky top-0 z-20 border-b border-line-soft bg-cream/92 backdrop-blur-md">
      <div className="container-site">
        <ul className="-mx-1 flex gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <li key={item.id} className="flex-none">
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={cn(
                  "inline-flex h-9 items-center rounded-full px-4 text-[14px] font-medium whitespace-nowrap transition-colors",
                  active === item.id ? "bg-olive text-white" : "text-ink-soft hover:bg-cream-2 hover:text-olive",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
