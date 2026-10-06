"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import type { DestinationCardData } from "@/lib/catalog";
import type { TravelStyleInfo } from "@/types/catalog";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { FilterTabs } from "@/components/shared/FilterTabs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { SelectInput, TextInput } from "@/components/forms/Fields";

type Props = {
  destinations: DestinationCardData[];
  styles: TravelStyleInfo[];
  initial: { q?: string; state?: string; style?: string; region?: string };
};

const REGIONS = ["All", "India", "International"];
const PAGE = 8;

/** Destination Search + Explore Destinations grid (filters sync to the URL). */
export function DestinationExplorer({ destinations, styles, initial }: Props) {
  const [query, setQuery] = useState(initial.q ?? "");
  const [state, setState] = useState(initial.state ?? "");
  const [style, setStyle] = useState(initial.style ?? "");
  const [region, setRegion] = useState(REGIONS.includes(initial.region ?? "") ? (initial.region as string) : "All");
  const [limit, setLimit] = useState(PAGE);
  const resultsRef = useRef<HTMLDivElement>(null);

  const states = useMemo(() => [...new Set(destinations.map((d) => d.state))].sort(), [destinations]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return destinations.filter(
      (d) =>
        (region === "All" || d.region === region) &&
        (!state || d.state === state) &&
        (!style || d.styles.includes(style as never)) &&
        (!q || [d.name, d.state, d.tagline, d.shortDescription, ...d.bestFor].join(" ").toLowerCase().includes(q)),
    );
  }, [destinations, query, state, style, region]);

  // keep the URL shareable
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (state) params.set("state", state);
    if (style) params.set("style", style);
    if (region !== "All") params.set("region", region);
    const qs = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
  }, [query, state, style, region]);

  useEffect(() => setLimit(PAGE), [query, state, style, region]);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const reset = () => {
    setQuery("");
    setState("");
    setStyle("");
    setRegion("All");
  };

  return (
    <>
      {/* ---------------- Destination Search ---------------- */}
      <section id="search" aria-label="Destination search" className="relative z-[4] pt-10 md:pt-14 lg:-mt-6 lg:pt-0">
        <div className="container-site">
          <form
            role="search"
            onSubmit={onSearch}
            className="grid gap-3 rounded-2xl border border-line-soft bg-white p-4 shadow-card md:grid-cols-2 md:p-5 lg:grid-cols-[1.5fr_1fr_1fr_auto] lg:items-center"
          >
            <TextInput icon="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a city, state or experience" aria-label="Search destinations" className="md:col-span-2 lg:col-span-1" />
            <SelectInput value={state} onChange={(e) => setState(e.target.value)} options={states} placeholder="All states & countries" aria-label="Filter by state" />
            <SelectInput value={style} onChange={(e) => setStyle(e.target.value)} options={styles.map((s) => ({ label: s.title, value: s.slug }))} placeholder="Any travel style" aria-label="Filter by travel style" />
            <button type="submit" className="inline-flex h-[50px] items-center justify-center gap-2 rounded-[10px] bg-olive px-7 text-[15px] font-medium text-white transition-colors hover:bg-olive-dark md:col-span-2 md:h-[52px] lg:col-span-1">
              <Icon name="search" className="size-[18px]" />
              Search
            </button>
          </form>
        </div>
      </section>

      {/* ---------------- Explore Destinations ---------------- */}
      <section id="explore" aria-labelledby="explore-title" className="scroll-mt-6 pt-14 md:pt-[72px]">
        <div className="container-site" ref={resultsRef}>
          <SectionHeading eyebrow="Find Your Place" title="Explore Destinations" subtitle="Handpicked Indian states and international favourites — filter by region, state or travel style." titleId="explore-title" />
          <FilterTabs options={REGIONS} active={region} onChange={setRegion} label="Filter by region" />

          <p className="mt-6 text-center text-[14px] text-muted" aria-live="polite">
            Showing <strong className="text-ink">{Math.min(limit, results.length)}</strong> of <strong className="text-ink">{results.length}</strong> destinations
          </p>

          {results.length ? (
            <>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-6">
                {results.slice(0, limit).map((d, i) => (
                  <DestinationCard key={d.slug} destination={d} priority={i < 2} className="animate-step-in" />
                ))}
              </div>
              {limit < results.length ? (
                <div className="mt-9 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setLimit((l) => l + PAGE)}
                    className="inline-flex h-[46px] items-center gap-2 rounded-lg border border-line bg-white px-6 text-[14.5px] font-medium text-ink transition-colors hover:border-olive hover:text-olive"
                  >
                    Load more destinations
                    <Icon name="chevronDown" className="size-4" />
                  </button>
                </div>
              ) : null}
            </>
          ) : (
            <div className="mt-8 rounded-[14px] border border-line-soft bg-white px-6 py-12 text-center">
              <p className="text-[16px] font-semibold text-ink">No destinations match your filters.</p>
              <p className="mt-1.5 text-[14.5px] text-subtle">Try a different state or travel style.</p>
              <button type="button" onClick={reset} className="mt-5 inline-flex h-[42px] items-center rounded-lg bg-olive px-5 text-[14px] font-medium text-white hover:bg-olive-dark">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
