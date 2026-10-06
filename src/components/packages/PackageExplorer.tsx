"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { TourPackageDetail, TravelStyleInfo } from "@/types/catalog";
import { cn } from "@/lib/utils";
import { PackageCard } from "@/components/cards/PackageCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { SelectInput, TextInput } from "@/components/forms/Fields";

type Option = { label: string; value: string };

const DURATIONS: (Option & { test: (d: number) => boolean })[] = [
  { label: "1–3 days", value: "short", test: (d) => d <= 3 },
  { label: "4–5 days", value: "mid", test: (d) => d >= 4 && d <= 5 },
  { label: "6–7 days", value: "week", test: (d) => d >= 6 && d <= 7 },
  { label: "8+ days", value: "long", test: (d) => d >= 8 },
];

const BUDGETS: (Option & { test: (p: number) => boolean })[] = [
  { label: "Under ₹15,000", value: "u15", test: (p) => p < 15000 },
  { label: "₹15,000 – ₹25,000", value: "15-25", test: (p) => p >= 15000 && p <= 25000 },
  { label: "₹25,000 – ₹40,000", value: "25-40", test: (p) => p > 25000 && p <= 40000 },
  { label: "Above ₹40,000", value: "40p", test: (p) => p > 40000 },
];

const SORTS: Option[] = [
  { label: "Most popular", value: "popular" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Price: high to low", value: "price-desc" },
  { label: "Duration: shortest first", value: "duration" },
  { label: "Top rated", value: "rating" },
];

type Filters = { q: string; destination: string; duration: string[]; budget: string; type: string[]; category: string[]; style: string };

type Props = {
  packages: TourPackageDetail[];
  destinations: Option[];
  styles: TravelStyleInfo[];
  initial: Partial<Record<keyof Filters, string>>;
  /** rendered between the search bar and the filterable list (Featured Packages) */
  children?: ReactNode;
};

const split = (v?: string) => (v ? v.split(",").filter(Boolean) : []);

export function PackageExplorer({ packages, destinations, styles, initial, children }: Props) {
  const [filters, setFilters] = useState<Filters>({
    q: initial.q ?? "",
    destination: initial.destination ?? "",
    duration: split(initial.duration),
    budget: initial.budget ?? "",
    type: split(initial.type),
    category: split(initial.category),
    style: initial.style ?? "",
  });
  const [sort, setSort] = useState("popular");
  const [drawer, setDrawer] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const types = useMemo(() => [...new Set(packages.map((p) => p.travelType))].sort(), [packages]);
  const categories = useMemo(() => [...new Set(packages.map((p) => p.category))].sort(), [packages]);

  const results = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    const list = packages.filter((p) => {
      if (q && ![p.title, ...p.placesCovered, p.category, p.travelType, ...p.highlights].join(" ").toLowerCase().includes(q)) return false;
      if (filters.destination && !p.destinations.includes(filters.destination)) return false;
      if (filters.duration.length && !filters.duration.some((v) => DURATIONS.find((d) => d.value === v)?.test(p.days))) return false;
      if (filters.budget && !BUDGETS.find((b) => b.value === filters.budget)?.test(p.startingPrice)) return false;
      if (filters.type.length && !filters.type.includes(p.travelType)) return false;
      if (filters.category.length && !filters.category.includes(p.category)) return false;
      if (filters.style && !p.styles.includes(filters.style as never)) return false;
      return true;
    });
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.startingPrice - b.startingPrice);
    if (sort === "price-desc") sorted.sort((a, b) => b.startingPrice - a.startingPrice);
    if (sort === "duration") sorted.sort((a, b) => a.days - b.days);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "popular") sorted.sort((a, b) => Number(Boolean(b.popular)) - Number(Boolean(a.popular)) || b.reviews - a.reviews);
    return sorted;
  }, [packages, filters, sort]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.q) params.set("q", filters.q);
    if (filters.destination) params.set("destination", filters.destination);
    if (filters.duration.length) params.set("duration", filters.duration.join(","));
    if (filters.budget) params.set("budget", filters.budget);
    if (filters.type.length) params.set("type", filters.type.join(","));
    if (filters.category.length) params.set("category", filters.category.join(","));
    if (filters.style) params.set("style", filters.style);
    const qs = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
  }, [filters]);

  // lock page scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const toggle = (key: "duration" | "type" | "category", value: string) =>
    setFilters((f) => ({ ...f, [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value] }));

  const clearAll = () => setFilters({ q: "", destination: "", duration: [], budget: "", type: [], category: [], style: "" });

  const active: { label: string; clear: () => void }[] = [
    ...(filters.destination ? [{ label: destinations.find((d) => d.value === filters.destination)?.label ?? filters.destination, clear: () => setFilters((f) => ({ ...f, destination: "" })) }] : []),
    ...filters.duration.map((v) => ({ label: DURATIONS.find((d) => d.value === v)?.label ?? v, clear: () => toggle("duration", v) })),
    ...(filters.budget ? [{ label: BUDGETS.find((b) => b.value === filters.budget)?.label ?? "", clear: () => setFilters((f) => ({ ...f, budget: "" })) }] : []),
    ...filters.type.map((v) => ({ label: v, clear: () => toggle("type", v) })),
    ...filters.category.map((v) => ({ label: v, clear: () => toggle("category", v) })),
    ...(filters.style ? [{ label: styles.find((s) => s.slug === filters.style)?.title ?? filters.style, clear: () => setFilters((f) => ({ ...f, style: "" })) }] : []),
  ];

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const checkbox = (checked: boolean, onChange: () => void, label: string) => (
    <label key={label} className="flex cursor-pointer items-center gap-3 py-1.5 text-[14.5px] text-ink-soft hover:text-olive">
      <input type="checkbox" checked={checked} onChange={onChange} className="size-[18px] cursor-pointer accent-[#67662A]" />
      {label}
    </label>
  );

  const filterPanel = (
    <div className="space-y-6">
      <div>
        <p className="mb-2.5 text-[13px] font-semibold tracking-[.8px] text-ink uppercase">Destination</p>
        <SelectInput value={filters.destination} onChange={(e) => setFilters((f) => ({ ...f, destination: e.target.value }))} options={destinations} placeholder="All destinations" aria-label="Destination" />
      </div>
      <div>
        <p className="mb-2 text-[13px] font-semibold tracking-[.8px] text-ink uppercase">Duration</p>
        {DURATIONS.map((d) => checkbox(filters.duration.includes(d.value), () => toggle("duration", d.value), d.label))}
      </div>
      <div>
        <p className="mb-2 text-[13px] font-semibold tracking-[.8px] text-ink uppercase">Budget (per person)</p>
        {BUDGETS.map((b) => (
          <label key={b.value} className="flex cursor-pointer items-center gap-3 py-1.5 text-[14.5px] text-ink-soft hover:text-olive">
            <input type="radio" name="budget" checked={filters.budget === b.value} onChange={() => setFilters((f) => ({ ...f, budget: b.value }))} className="size-[18px] cursor-pointer accent-[#67662A]" />
            {b.label}
          </label>
        ))}
        {filters.budget ? (
          <button type="button" onClick={() => setFilters((f) => ({ ...f, budget: "" }))} className="mt-1 text-[13px] text-olive hover:underline">
            Any budget
          </button>
        ) : null}
      </div>
      <div>
        <p className="mb-2 text-[13px] font-semibold tracking-[.8px] text-ink uppercase">Travel type</p>
        {types.map((t) => checkbox(filters.type.includes(t), () => toggle("type", t), t))}
      </div>
      <div>
        <p className="mb-2 text-[13px] font-semibold tracking-[.8px] text-ink uppercase">Category</p>
        {categories.map((c) => checkbox(filters.category.includes(c), () => toggle("category", c), c))}
      </div>
      <div>
        <p className="mb-2.5 text-[13px] font-semibold tracking-[.8px] text-ink uppercase">Travel style</p>
        <SelectInput value={filters.style} onChange={(e) => setFilters((f) => ({ ...f, style: e.target.value }))} options={styles.map((s) => ({ label: s.title, value: s.slug }))} placeholder="Any style" aria-label="Travel style" />
      </div>
    </div>
  );

  return (
    <>
      {/* ---------------- Package Search ---------------- */}
      <section aria-label="Package search" className="relative z-[4] pt-8 md:pt-10">
        <div className="container-site">
          <form role="search" onSubmit={onSearch} className="grid gap-3 rounded-2xl border border-line-soft bg-white p-4 shadow-card md:grid-cols-[1.6fr_1fr_auto] md:items-center md:p-5">
            <TextInput icon="search" value={filters.q} onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))} placeholder="Search packages, places or experiences" aria-label="Search packages" />
            <SelectInput value={filters.destination} onChange={(e) => setFilters((f) => ({ ...f, destination: e.target.value }))} options={destinations} placeholder="All destinations" aria-label="Destination" />
            <button type="submit" className="inline-flex h-[50px] items-center justify-center gap-2 rounded-[10px] bg-olive px-7 text-[15px] font-medium text-white transition-colors hover:bg-olive-dark md:h-[52px]">
              <Icon name="search" className="size-[18px]" />
              Find Packages
            </button>
          </form>
        </div>
      </section>

      {children}

      {/* ---------------- Filters + All Packages ---------------- */}
      <section id="all-packages" aria-labelledby="all-packages-title" className="scroll-mt-4 pt-14 md:pt-[72px] lg:pt-[84px]">
        <div className="container-site" ref={listRef}>
          <SectionHeading eyebrow="Browse & Filter" title="All Tour Packages" subtitle="Filter by destination, duration, budget and travel type to find your perfect trip." align="left" titleId="all-packages-title" />

          <div className="grid gap-8 lg:grid-cols-[270px_minmax(0,1fr)] 2xl:gap-10">
            {/* desktop filters */}
            <aside className="hidden lg:block">
              <div className="sticky top-6 rounded-2xl border border-line-soft bg-white p-5 shadow-tile">
                <div className="mb-4 flex items-center justify-between border-b border-line-soft pb-3">
                  <p className="inline-flex items-center gap-2 font-serif text-lg font-semibold text-ink">
                    <Icon name="filter" className="size-5 text-olive" />
                    Filters
                  </p>
                  {active.length ? (
                    <button type="button" onClick={clearAll} className="text-[13px] font-medium text-olive hover:underline">
                      Clear all
                    </button>
                  ) : null}
                </div>
                {filterPanel}
              </div>
            </aside>

            <div className="min-w-0">
              {/* toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[14.5px] text-muted" aria-live="polite">
                  <strong className="text-ink">{results.length}</strong> {results.length === 1 ? "package" : "packages"} found
                </p>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDrawer(true)}
                    className="inline-flex h-11 items-center gap-2 rounded-lg border border-line bg-white px-4 text-[14px] font-medium text-ink lg:hidden"
                  >
                    <Icon name="filter" className="size-4 text-olive" />
                    Filters{active.length ? ` (${active.length})` : ""}
                  </button>
                  <label className="sr-only" htmlFor="sort">
                    Sort packages
                  </label>
                  <select
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="h-11 cursor-pointer rounded-lg border border-line bg-white px-3.5 text-[14px] text-ink outline-none focus:border-olive"
                  >
                    {SORTS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {active.length ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {active.map((a) => (
                    <li key={a.label}>
                      <button type="button" onClick={a.clear} className="inline-flex items-center gap-1.5 rounded-full bg-olive/10 px-3 py-1.5 text-[13px] font-medium text-olive-dark hover:bg-olive/20">
                        {a.label}
                        <Icon name="close" className="size-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}

              {results.length ? (
                <div className="mt-6 grid gap-5 sm:grid-cols-2 2xl:grid-cols-3 2xl:gap-6">
                  {results.map((p) => (
                    <PackageCard key={p.slug} pkg={p} className="animate-step-in" />
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-[14px] border border-line-soft bg-white px-6 py-12 text-center">
                  <p className="text-[16px] font-semibold text-ink">No packages match these filters.</p>
                  <p className="mt-1.5 text-[14.5px] text-subtle">Try removing a filter — or ask us to build a custom trip.</p>
                  <button type="button" onClick={clearAll} className="mt-5 inline-flex h-[42px] items-center rounded-lg bg-olive px-5 text-[14px] font-medium text-white hover:bg-olive-dark">
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* mobile filter drawer */}
      <div className={cn("fixed inset-0 z-50 lg:hidden", drawer ? "visible" : "invisible")} aria-hidden={!drawer}>
        <button type="button" aria-label="Close filters" onClick={() => setDrawer(false)} className={cn("absolute inset-0 bg-ink/50 transition-opacity", drawer ? "opacity-100" : "opacity-0")} />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
          className={cn("absolute inset-y-0 right-0 flex w-[88%] max-w-[380px] flex-col bg-cream shadow-soft transition-transform duration-300", drawer ? "translate-x-0" : "translate-x-full")}
        >
          <div className="flex items-center justify-between border-b border-line-soft px-5 py-4">
            <p className="font-serif text-lg font-semibold text-ink">Filters</p>
            <button type="button" onClick={() => setDrawer(false)} aria-label="Close filters" className="flex size-9 items-center justify-center rounded-full bg-white text-ink">
              <Icon name="close" className="size-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-5">{filterPanel}</div>
          <div className="grid grid-cols-2 gap-3 border-t border-line-soft px-5 py-4">
            <button type="button" onClick={clearAll} className="h-11 rounded-lg border border-line bg-white text-[14px] font-medium text-ink">
              Clear all
            </button>
            <button type="button" onClick={() => setDrawer(false)} className="h-11 rounded-lg bg-olive text-[14px] font-medium text-white">
              Show {results.length} results
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
