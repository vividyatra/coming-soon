"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

/** Parses "31 Dec 2026" style dates. */
function parse(date: string) {
  const d = new Date(`${date} 23:59:59`);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** "12 days left" badge, computed in the browser so it is never stale. */
export function DaysLeft({ until, className }: { until: string; className?: string }) {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const end = parse(until);
    if (end) setDays(Math.ceil((end.getTime() - Date.now()) / 86_400_000));
  }, [until]);
  if (days === null) return null;
  const expired = days < 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold",
        expired ? "bg-line-soft text-muted" : days <= 15 ? "bg-[#F6E9E4] text-[#A8442C]" : "bg-olive/10 text-olive-dark",
        className,
      )}
    >
      <Icon name="clock" className="size-3.5" />
      {expired ? "Expired" : days === 0 ? "Ends today" : `${days} ${days === 1 ? "day" : "days"} left`}
    </span>
  );
}

/** Promo code with one-click copy. */
export function CopyCode({ code, className }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        } catch {
          /* clipboard blocked — code is still visible */
        }
      }}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-dashed border-olive/60 bg-cream px-3.5 py-2 text-[13.5px] text-ink transition-colors hover:bg-cream-2",
        className,
      )}
      aria-label={`Copy code ${code}`}
    >
      <strong className="font-semibold tracking-[1.2px] text-olive-dark">{code}</strong>
      <span className="inline-flex items-center gap-1 text-[12.5px] text-olive">
        <Icon name={copied ? "check" : "copy"} className="size-3.5" />
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
