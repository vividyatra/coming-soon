import Image from "next/image";
import Link from "next/link";
import type { DestinationCardData } from "@/lib/catalog";
import { routes } from "@/data/site";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

/**
 * Destination card — image, destination, state, short description,
 * best-for chips, packages count and an Explore link (whole card is clickable).
 */
export function DestinationCard({ destination, className, priority }: { destination: DestinationCardData; className?: string; priority?: boolean }) {
  const href = `${routes.destinations}/${destination.slug}`;
  return (
    <article className={cn("group relative flex flex-col overflow-hidden rounded-[14px] border border-line-soft bg-white shadow-tile transition-all duration-300 hover:-translate-y-1 hover:shadow-card", className)}>
      <div className="relative aspect-[4/3] overflow-hidden bg-[linear-gradient(150deg,#c3ccd0,#95a28d)]">
        <Image
          src={destination.image.src}
          alt={destination.image.alt}
          fill
          preload={priority}
          sizes="(min-width: 1281px) 25vw, (min-width: 768px) 33vw, (min-width: 576px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <span className="absolute top-3.5 left-3.5 rounded-full bg-white/92 px-3 py-1.5 text-[11px] font-semibold tracking-[.6px] text-olive-dark uppercase backdrop-blur-sm">
          {destination.region}
        </span>
        <span className="absolute right-3.5 bottom-3.5 inline-flex items-center gap-1.5 rounded-full bg-olive-dark/85 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
          <Icon name="suitcase" className="size-3.5" />
          {destination.packagesCount ? `${destination.packagesCount} ${destination.packagesCount === 1 ? "package" : "packages"}` : "Custom trips"}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pt-[18px] pb-5">
        <p className="inline-flex items-center gap-1.5 text-[11.5px] font-medium tracking-[1.4px] text-eyebrow uppercase">
          <Icon name="pin" className="size-3.5 text-olive" />
          {destination.state}
        </p>
        <h3 className="mt-2 text-[19px] leading-[1.25] font-semibold text-ink md:text-xl">
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {destination.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[14px] leading-[1.6] text-body">{destination.shortDescription}</p>

        <div className="mt-3.5 mb-5">
          <p className="text-[11.5px] font-medium tracking-[.4px] text-muted">Best for</p>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {destination.bestFor.slice(0, 3).map((tag) => (
              <li key={tag} className="rounded-full bg-cream-2 px-2.5 py-1 text-[12px] text-ink-soft">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-line-soft pt-4">
          <span className="text-[13px] text-muted">{destination.tagline}</span>
          <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-olive">
            Explore
            <Icon name="arrowRight" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
