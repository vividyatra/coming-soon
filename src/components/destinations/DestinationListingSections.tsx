import Image from "next/image";
import Link from "next/link";
import type { DestinationCardData } from "@/lib/catalog";
import { routes } from "@/data/site";
import { BentoGrid } from "@/components/shared/BentoGrid";

/* ------------------------------------------------------------------
   DESTINATIONS BY STATE
   ------------------------------------------------------------------ */
export function StatesGrid({ groups }: { groups: { state: string; items: DestinationCardData[] }[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-5">
      {groups.map(({ state, items }) => {
        const cover = items[0];
        return (
          <li key={state} className="group relative flex overflow-hidden rounded-[14px] border border-line-soft bg-white shadow-tile transition-shadow hover:shadow-card">
            <div className="relative w-[112px] flex-none overflow-hidden sm:w-[124px]">
              <Image src={cover.image.src} alt={cover.image.alt} fill sizes="124px" className="object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
            </div>
            <div className="min-w-0 flex-1 p-4 md:p-5">
              <p className="text-[11.5px] font-medium tracking-[1.3px] text-eyebrow uppercase">
                {items.length} {items.length === 1 ? "destination" : "destinations"}
              </p>
              <h3 className="mt-1 text-[19px] leading-[1.25] font-semibold text-ink">
                <Link href={`${routes.destinations}?state=${encodeURIComponent(state)}#explore`} className="after:absolute after:inset-0 hover:text-olive">
                  {state}
                </Link>
              </h3>
              <ul className="relative z-[1] mt-2.5 flex flex-wrap gap-1.5">
                {items.map((d) => (
                  <li key={d.slug}>
                    <Link href={`${routes.destinations}/${d.slug}`} className="inline-block rounded-full bg-cream-2 px-2.5 py-1 text-[12.5px] text-ink-soft transition-colors hover:bg-olive hover:text-white">
                      {d.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* ------------------------------------------------------------------
   FEATURED DESTINATIONS — bento with one large tile
   ------------------------------------------------------------------ */
export function FeaturedDestinations({ items }: { items: DestinationCardData[] }) {
  return (
    <BentoGrid
      items={items.map((d) => ({ href: `${routes.destinations}/${d.slug}`, image: d.image, chip: d.state, title: d.name, text: d.shortDescription, cta: "Explore Destination" }))}
    />
  );
}
