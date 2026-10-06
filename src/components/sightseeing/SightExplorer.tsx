"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { SightseeingDetail } from "@/types/catalog";
import { SightCard } from "@/components/cards/SightCard";
import { FilterTabs } from "@/components/shared/FilterTabs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { SelectInput, TextInput } from "@/components/forms/Fields";

type Props = {
  sights: SightseeingDetail[];
  destinations: { label: string; value: string }[];
  categories: string[];
  initial: { q?: string; destination?: string; category?: string };
  children?: ReactNode;
};

/** Search Sightseeing (top) + Popular Attractions grid (bottom), sharing filter state. */
export function SightExplorer({ sights, destinations, categories, initial, children }: Props) {
  const [query, setQuery] = useState(initial.q ?? "");
  const [destination, setDestination] = useState(initial.destination ?? "");
  const tabs = ["All", ...categories];
  const [category, setCategory] = useState(tabs.includes(initial.category ?? "") ? (initial.category as string) : "All");
  const gridRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sights.filter(
      (s) =>
        (category === "All" || s.category === category) &&
        (!destination || s.destinationSlug === destination) &&
        (!q || [s.name, s.shortDescription, s.location.city, s.location.state, s.category, ...s.highlights].join(" ").toLowerCase().includes(q)),
    );
  }, [sights, query, destination, category]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (destination) params.set("destination", destination);
    if (category !== "All") params.set("category", category);
    const qs = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
  }, [query, destination, category]);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section aria-label="Search sightseeing" className="relative z-[4] pt-8 md:pt-10">
        <div className="container-site">
          <form role="search" onSubmit={onSearch} className="grid gap-3 rounded-2xl border border-line-soft bg-white p-4 shadow-card md:grid-cols-[1.6fr_1fr_auto] md:items-center md:p-5">
            <TextInput icon="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search attractions, temples, forts, lakes…" aria-label="Search sightseeing" />
            <SelectInput value={destination} onChange={(e) => setDestination(e.target.value)} options={destinations} placeholder="All destinations" aria-label="Destination" />
            <button type="submit" className="inline-flex h-[50px] items-center justify-center gap-2 rounded-[10px] bg-olive px-7 text-[15px] font-medium text-white transition-colors hover:bg-olive-dark md:h-[52px]">
              <Icon name="search" className="size-[18px]" />
              Search
            </button>
          </form>
        </div>
      </section>

      {children}

      <section id="attractions" aria-labelledby="attractions-title" className="scroll-mt-4 pt-14 md:pt-[72px] lg:pt-[84px]">
        <div className="container-site" ref={gridRef}>
          <SectionHeading eyebrow="Plan Your Days" title="Popular Attractions" subtitle="Every attraction includes timings, entry fees and insider tips." titleId="attractions-title" />
          <FilterTabs options={tabs} active={category} onChange={setCategory} label="Filter by category" />
          <p className="mt-6 text-center text-[14px] text-muted" aria-live="polite">
            <strong className="text-ink">{results.length}</strong> {results.length === 1 ? "attraction" : "attractions"}
            {destination ? ` in ${destinations.find((d) => d.value === destination)?.label}` : ""}
          </p>
          {results.length ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-6">
              {results.map((s) => (
                <SightCard key={s.slug} sight={s} className="animate-step-in" />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-[14px] border border-line-soft bg-white px-6 py-12 text-center">
              <p className="text-[16px] font-semibold text-ink">No attractions found.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setDestination("");
                  setCategory("All");
                }}
                className="mt-5 inline-flex h-[42px] items-center rounded-lg bg-olive px-5 text-[14px] font-medium text-white hover:bg-olive-dark"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
