"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { BlogArticle } from "@/types/catalog";
import { cn } from "@/lib/utils";
import { BlogCard } from "@/components/cards/BlogCard";
import { FilterTabs } from "@/components/shared/FilterTabs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

const PER_PAGE = 6;

type Props = {
  posts: BlogArticle[];
  categories: string[];
  destinations: { label: string; value: string }[];
  initial: { q?: string; category?: string; destination?: string; page?: string };
};

/** Latest Articles — search, category tabs, destination filter and pagination. */
export function ArticleExplorer({ posts, categories, destinations, initial }: Props) {
  const tabs = ["All", ...categories];
  const [query, setQuery] = useState(initial.q ?? "");
  const [category, setCategory] = useState(tabs.includes(initial.category ?? "") ? (initial.category as string) : "All");
  const [destination, setDestination] = useState(initial.destination ?? "");
  const [page, setPage] = useState(Math.max(1, Number(initial.page) || 1));
  const topRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (!destination || p.destinationSlugs.includes(destination)) &&
        (!q || [p.title, p.excerpt, p.category, ...p.keyTakeaways].join(" ").toLowerCase().includes(q)),
    );
  }, [posts, query, category, destination]);

  const pages = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const current = Math.min(page, pages);
  const visible = results.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category !== "All") params.set("category", category);
    if (destination) params.set("destination", destination);
    if (current > 1) params.set("page", String(current));
    const qs = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
  }, [query, category, destination, current]);

  const go = (n: number) => {
    setPage(n);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="latest" aria-labelledby="latest-title" className="scroll-mt-4 pt-14 md:pt-[72px] lg:pt-[84px]">
      <div className="container-site" ref={topRef}>
        <SectionHeading eyebrow="Fresh Reads" title="Latest Articles" subtitle="Guides, itineraries and honest tips from our travel specialists." titleId="latest-title" />
        <FilterTabs
          options={tabs}
          active={category}
          onChange={(c) => {
            setCategory(c);
            setPage(1);
          }}
          label="Filter by category"
        />

        <div className="mx-auto mt-6 flex max-w-[680px] flex-col gap-3 sm:flex-row">
          <div className="relative flex flex-1 items-center">
            <Icon name="search" className="pointer-events-none absolute left-4 size-[18px] text-stone" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search articles"
              aria-label="Search articles"
              className="h-12 w-full rounded-full border border-line bg-white pr-4 pl-11 text-[14.5px] text-ink outline-none placeholder:text-stone focus:border-olive"
            />
          </div>
          <select
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setPage(1);
            }}
            aria-label="Filter by destination"
            className="h-12 cursor-pointer rounded-full border border-line bg-white px-4 text-[14.5px] text-ink outline-none focus:border-olive sm:w-[220px]"
          >
            <option value="">All destinations</option>
            {destinations.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        {visible.length ? (
          <div className="mt-9 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3 2xl:gap-x-[30px]" aria-live="polite">
            {visible.map((post) => (
              <BlogCard key={post.slug} post={post} className="animate-step-in" />
            ))}
          </div>
        ) : (
          <div className="mt-9 rounded-[14px] border border-line-soft bg-white px-6 py-12 text-center">
            <p className="text-[16px] font-semibold text-ink">No articles found.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
                setDestination("");
              }}
              className="mt-5 inline-flex h-[42px] items-center rounded-lg bg-olive px-5 text-[14px] font-medium text-white hover:bg-olive-dark"
            >
              Show all articles
            </button>
          </div>
        )}

        {/* Pagination */}
        {pages > 1 ? (
          <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => go(current - 1)}
              disabled={current === 1}
              aria-label="Previous page"
              className="flex size-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-olive hover:text-olive disabled:opacity-40"
            >
              <Icon name="arrowLeft" className="size-4" />
            </button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => go(n)}
                aria-current={n === current ? "page" : undefined}
                className={cn(
                  "flex size-10 items-center justify-center rounded-full text-[14.5px] font-medium transition-colors",
                  n === current ? "bg-olive text-white" : "border border-line bg-white text-ink hover:border-olive hover:text-olive",
                )}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => go(current + 1)}
              disabled={current === pages}
              aria-label="Next page"
              className="flex size-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-olive hover:text-olive disabled:opacity-40"
            >
              <Icon name="arrowRight" className="size-4" />
            </button>
          </nav>
        ) : null}
      </div>
    </section>
  );
}
