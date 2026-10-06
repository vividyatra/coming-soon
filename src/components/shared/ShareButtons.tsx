"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/Icon";

/** Share links built from the current page URL (client-side, so it works on any domain). */
export function ShareButtons({ title, className, label = true }: { title: string; className?: string; label?: boolean }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => setUrl(window.location.href.split("#")[0]), []);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links: { name: string; icon: IconName; href: string }[] = [
    { name: "WhatsApp", icon: "whatsapp", href: `https://wa.me/?text=${t}%20${u}` },
    { name: "Facebook", icon: "facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { name: "X", icon: "x", href: `https://x.com/intent/post?text=${t}&url=${u}` },
    { name: "LinkedIn", icon: "linkedin", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  ];

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {label ? <span className="mr-1 text-[13px] font-medium text-muted">Share</span> : null}
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${l.name}`}
          className="flex size-9 items-center justify-center rounded-full border border-line bg-white text-ink-soft transition-colors hover:border-olive hover:bg-olive hover:text-white"
        >
          <Icon name={l.icon} className="size-[17px]" />
        </a>
      ))}
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
          } catch {}
        }}
        aria-label="Copy link"
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-white px-3.5 text-[13px] font-medium text-ink-soft transition-colors hover:border-olive hover:text-olive"
      >
        <Icon name={copied ? "check" : "copy"} className="size-4" />
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
