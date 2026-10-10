"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { FaqGroup } from "@/types/catalog";
import { cn } from "@/lib/utils";
import { BaseIcon } from "@/components/ui/iconsBase";
import { FaqAccordion } from "@/components/templates/FaqAccordion";

/** Category icons are rendered on the server (full icon set) and passed in, keeping this bundle small. */
export type FaqGroupIcons = Record<string, { nav: ReactNode; heading: ReactNode }>;

/**
 * Searchable FAQ knowledge base with category navigation.
 * The page is prerendered with every answer in the HTML; the search runs in the browser
 * and mirrors the query in the URL (?q=) with history.replaceState, so links stay shareable.
 */
export function FaqExplorer({ groups, icons }: { groups: FaqGroup[]; icons: FaqGroupIcons }) {
  const [query, setQueryState] = useState("");
  const q = query.trim().toLowerCase();

  // pick up ?q= from a shared link after hydration (the static HTML always shows every answer)
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("q");
    if (initial) setQueryState(initial);
  }, []);

  const setQuery = (value: string) => {
    setQueryState(value);
    const url = new URL(window.location.href);
    if (value.trim()) url.searchParams.set("q", value);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  };

  const filtered = useMemo(
    () =>
      groups
        .map((g) => ({ ...g, items: q ? g.items.filter((f) => `${f.question} ${f.answer}`.toLowerCase().includes(q)) : g.items }))
        .filter((g) => g.items.length),
    [groups, q],
  );
  const count = filtered.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      {/* Search Questions */}
      <div className="relative z-[4] -mt-7 md:-mt-9">
        <div className="container-narrow">
          <div className="rounded-2xl border border-line-soft bg-white p-3 shadow-card md:p-4">
            <div className="relative flex items-center">
              <BaseIcon name="search" className="pointer-events-none absolute left-4 size-5 text-stone" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions - e.g. cancellation, permit, payment"
                aria-label="Search questions"
                className="h-[52px] w-full rounded-xl bg-cream/60 pr-4 pl-12 text-[15px] text-ink outline-none placeholder:text-stone focus:bg-white focus:ring-1 focus:ring-olive md:h-14 md:text-base"
              />
            </div>
          </div>
          {q ? (
            <p className="mt-3 text-center text-[14px] text-muted" aria-live="polite">
              {count} {count === 1 ? "answer" : "answers"} for "{query}"
            </p>
          ) : null}
        </div>
      </div>

      <div className="container-site grid grid-cols-[minmax(0,1fr)] gap-8 pt-10 md:pt-14 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
        {/* category nav */}
        <nav aria-label="FAQ categories" className="lg:relative">
          <ul className="-mx-1 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:sticky lg:top-6 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:rounded-2xl lg:border lg:border-line-soft lg:bg-white lg:p-3 lg:shadow-tile [&::-webkit-scrollbar]:hidden">
            {groups.map((g) => {
              const hits = filtered.find((f) => f.slug === g.slug)?.items.length ?? 0;
              return (
                <li key={g.slug} className="flex-none">
                  <a
                    href={`#${g.slug}`}
                    className={cn(
                      "flex items-center gap-2.5 rounded-full border border-line-soft bg-white px-4 py-2 text-[14px] font-medium whitespace-nowrap text-ink-soft transition-colors hover:border-olive hover:text-olive lg:rounded-xl lg:border-0 lg:px-3 lg:py-2.5 lg:whitespace-normal",
                      q && !hits && "opacity-40",
                    )}
                  >
                    {icons[g.slug]?.nav}
                    <span className="flex-1">{g.title}</span>
                    <span className="shrink-0 rounded-full bg-cream-2 px-2 py-0.5 text-[11.5px] text-muted">{q ? hits : g.items.length}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="min-w-0 space-y-12">
          {filtered.length ? (
            filtered.map((g) => (
              <section key={g.slug} id={g.slug} aria-labelledby={`${g.slug}-title`} className="scroll-mt-6">
                <h2 id={`${g.slug}-title`} className="mb-5 flex items-center gap-3 text-[23px] font-semibold text-ink md:text-[27px]">
                  <span className="flex size-10 items-center justify-center rounded-full bg-cream-2 text-olive">{icons[g.slug]?.heading}</span>
                  {g.title} FAQs
                </h2>
                <FaqAccordion faqs={g.items} name={`faq-${g.slug}`} openFirst={Boolean(q)} />
              </section>
            ))
          ) : (
            <div className="rounded-[14px] border border-line-soft bg-white px-6 py-12 text-center">
              <p className="text-[16px] font-semibold text-ink">No answers found for "{query}".</p>
              <p className="mt-1.5 text-[14.5px] text-subtle">Try another word - or ask us directly, we aim to reply within 24 hours.</p>
              <button type="button" onClick={() => setQuery("")} className="mt-5 inline-flex h-[42px] items-center rounded-lg bg-olive px-5 text-[14px] font-medium text-white hover:bg-olive-dark">
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}