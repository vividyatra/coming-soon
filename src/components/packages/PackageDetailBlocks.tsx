import Link from "next/link";
import type { ItineraryDay, PriceTier } from "@/types/catalog";
import type { OfferDetail } from "@/types/catalog";
import { routes } from "@/data/site";
import { cn, formatINR } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

/* Blocks specific to the Tour Package Detail template. */

/** Day-by-day itinerary as an expandable vertical timeline. */
export function ItineraryTimeline({ days }: { days: ItineraryDay[] }) {
  return (
    <ol className="relative">
      {days.map((day, i) => {
        const last = i === days.length - 1;
        return (
          <li key={day.day} className="relative pl-14 md:pl-16">
            {!last ? <span className="absolute top-12 bottom-0 left-[21px] border-l border-dashed border-[#CFC9B8] md:left-[23px]" aria-hidden="true" /> : null}
            <span className="absolute top-2 left-0 flex size-11 flex-col items-center justify-center rounded-full border border-olive bg-white text-olive shadow-tile md:size-12">
              <span className="text-[9px] leading-none font-semibold tracking-[.6px] uppercase">Day</span>
              <span className="font-serif text-[17px] leading-none font-semibold">{day.day}</span>
            </span>
            <details open={i === 0} className="faq-item group mb-4 rounded-[14px] border border-line-soft bg-white shadow-tile open:shadow-card">
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 md:px-6">
                <span className="text-[16px] leading-[1.4] font-semibold text-ink group-hover:text-olive md:text-[17px]">{day.title}</span>
                <Icon name="chevronDown" className="size-5 flex-none text-olive transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="border-t border-line-soft px-5 pt-4 pb-5 md:px-6">
                <p className="text-[15px] leading-[1.75] text-body">{day.description}</p>
                {day.meals || day.stay ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {day.meals ? (
                      <li className="inline-flex items-center gap-1.5 rounded-full bg-cream-2 px-3 py-1.5 text-[12.5px] text-ink-soft">
                        <Icon name="food" className="size-3.5 text-olive" />
                        {day.meals}
                      </li>
                    ) : null}
                    {day.stay ? (
                      <li className="inline-flex items-center gap-1.5 rounded-full bg-cream-2 px-3 py-1.5 text-[12.5px] text-ink-soft">
                        <Icon name="bed" className="size-3.5 text-olive" />
                        Overnight: {day.stay}
                      </li>
                    ) : null}
                  </ul>
                ) : null}
              </div>
            </details>
          </li>
        );
      })}
    </ol>
  );
}

/** Pricing tiers with a link into the booking flow. */
export function PricingTiers({ tiers, packageSlug }: { tiers: PriceTier[]; packageSlug: string }) {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {tiers.map((tier, i) => {
        const highlight = i === 1;
        return (
          <li
            key={tier.label}
            className={cn(
              "relative flex flex-col rounded-[14px] border p-5 md:p-6",
              highlight ? "border-olive bg-white shadow-card ring-1 ring-olive" : "border-line-soft bg-white shadow-tile",
            )}
          >
            {highlight ? <span className="absolute -top-3 left-5 rounded-full bg-olive px-3 py-1 text-[11px] font-semibold tracking-[.5px] text-white uppercase">Most chosen</span> : null}
            <p className="text-[14.5px] font-semibold text-ink">{tier.label}</p>
            <p className="mt-3 font-serif text-[28px] leading-tight font-semibold text-ink-deep">{formatINR(tier.price)}</p>
            <p className="text-[12.5px] text-muted">{tier.note}</p>
            <Link
              href={`${routes.booking}?package=${packageSlug}&tier=${i}`}
              className={cn(
                "mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-lg text-[14px] font-medium transition-colors",
                highlight ? "bg-olive text-white hover:bg-olive-dark" : "border border-line text-ink hover:border-olive hover:text-olive",
              )}
            >
              Book this option
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Customisation callout. */
export function CustomizeCallout({ packageSlug, title }: { packageSlug: string; title: string }) {
  const options = ["Change hotels or room category", "Add or remove days", "Add flights or train tickets", "Include special experiences", "Private guide or chauffeur upgrades", "Combine with another destination"];
  return (
    <div className="relative overflow-hidden rounded-2xl bg-moss px-6 py-7 text-white md:px-8 md:py-9">
      <Icon name="route" className="absolute -right-6 -bottom-6 size-[160px] text-white/8" />
      <p className="font-script text-[30px] leading-none text-[#F2EFE0] md:text-[36px]">Make it yours</p>
      <h3 className="mt-2 font-serif text-[22px] font-semibold text-white md:text-[26px]">Customise “{title}”</h3>
      <ul className="relative mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
        {options.map((o) => (
          <li key={o} className="flex items-start gap-2.5 text-[14.5px] text-white/88">
            <Icon name="check" className="mt-0.5 size-4 flex-none text-[#F2EFE0]" />
            {o}
          </li>
        ))}
      </ul>
      <div className="relative mt-6 flex flex-col gap-3 xs:flex-row">
        <ButtonLink href={`${routes.planTrip}?package=${packageSlug}`} variant="light" icon="arrowRight">
          Customise This Trip
        </ButtonLink>
        <ButtonLink href={routes.contact} variant="outlineLight">
          Talk to an Expert
        </ButtonLink>
      </div>
    </div>
  );
}

/** Offers that apply to this package. */
export function ApplicableOffers({ offers }: { offers: OfferDetail[] }) {
  if (!offers.length) return null;
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {offers.map((o) => (
        <li key={o.slug}>
          <Link href={`${routes.offers}/${o.slug}`} className="group flex items-center gap-4 rounded-[14px] border border-dashed border-olive/50 bg-cream-2/50 p-4 transition-colors hover:bg-cream-2">
            <span className="flex size-11 flex-none items-center justify-center rounded-full bg-olive text-white">
              <Icon name="percent" className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-[15px] font-semibold text-ink group-hover:text-olive">{o.discountLabel}</span>
              <span className="block truncate text-[13px] text-subtle">
                {o.title}
                {o.code ? ` · Code ${o.code}` : ""}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
