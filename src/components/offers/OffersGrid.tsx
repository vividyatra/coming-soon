"use client";

import { useMemo, useState } from "react";
import type { OfferDetail } from "@/types/catalog";
import { OfferCard } from "@/components/cards/OfferCard";
import { FilterTabs } from "@/components/shared/FilterTabs";

/** Active offers grid, filterable by offer type. */
export function OffersGrid({ offers }: { offers: OfferDetail[] }) {
  const tabs = useMemo(() => ["All Offers", ...new Set(offers.map((o) => o.kind))], [offers]);
  const [active, setActive] = useState(tabs[0]);
  const list = active === tabs[0] ? offers : offers.filter((o) => o.kind === active);
  return (
    <>
      <FilterTabs options={tabs} active={active} onChange={setActive} label="Filter offers" />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-6" aria-live="polite">
        {list.map((o) => (
          <OfferCard key={o.slug} offer={o} className="animate-step-in" />
        ))}
      </div>
    </>
  );
}
