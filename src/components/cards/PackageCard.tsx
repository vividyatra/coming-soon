import Image from "next/image";
import Link from "next/link";
import type { TourPackageDetail } from "@/types/catalog";
import { routes } from "@/data/site";
import { cn, formatINR } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

export function packageDuration(pkg: Pick<TourPackageDetail, "nights" | "days">) {
  return `${pkg.nights} ${pkg.nights === 1 ? "Night" : "Nights"} / ${pkg.days} Days`;
}

/** Tour package card — same visual language as the Home "Featured Tour Packages". */
export function PackageCard({ pkg, className, placeNames }: { pkg: TourPackageDetail; className?: string; placeNames?: string }) {
  const href = `${routes.packages}/${pkg.slug}`;
  return (
    <article className={cn("group relative flex flex-col overflow-hidden rounded-[14px] border border-line-soft bg-white shadow-tile transition-all duration-300 hover:-translate-y-1 hover:shadow-card", className)}>
      <div className="relative h-[210px] overflow-hidden bg-[linear-gradient(150deg,#c3ccd0,#95a28d)] md:h-[220px]">
        <Image
          src={pkg.image.src}
          alt={pkg.image.alt}
          fill
          sizes="(min-width: 1151px) 25vw, (min-width: 576px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/92 px-3 py-1.5 text-xs font-medium text-ink backdrop-blur-sm">
          <Icon name="clock" className="size-3.5 text-olive" />
          {packageDuration(pkg)}
        </span>
        {pkg.badge ? (
          <span className="absolute top-3.5 right-3.5 rounded-full bg-olive px-3 py-1.5 text-[11px] font-semibold tracking-[.6px] text-white uppercase">{pkg.badge}</span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-5 pt-[18px] pb-5">
        <p className="inline-flex items-center gap-1.5 text-[11.5px] font-medium tracking-[1.4px] text-eyebrow uppercase">
          <Icon name="pin" className="size-3.5 flex-none text-olive" />
          <span className="truncate">{placeNames ?? pkg.placesCovered.slice(0, 3).join(" · ")}</span>
        </p>
        <h3 className="mt-2 text-[19px] leading-[1.25] font-semibold text-ink md:text-xl">
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {pkg.title}
          </Link>
        </h3>
        <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-subtle">
          <span className="inline-flex items-center gap-1 font-semibold text-ink">
            <Icon name="star" className="size-3.5 text-[#C9A24B]" />
            {pkg.rating.toFixed(1)}
          </span>
          <span>({pkg.reviews} reviews)</span>
          <span className="size-1 rounded-full bg-line" aria-hidden="true" />
          <span>{pkg.travelType}</span>
        </p>

        <ul className="mt-3.5 mb-5 space-y-2">
          {pkg.highlights.slice(0, 3).map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[14px] leading-[1.45] text-body">
              <span className="mt-0.5 flex size-[18px] flex-none items-center justify-center rounded-full bg-cream-2 text-olive">
                <Icon name="check" className="size-3" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line-soft pt-4">
          <div>
            <p className="text-xs text-muted">
              Starting from
              {pkg.originalPrice ? <span className="ml-1.5 text-stone line-through">{formatINR(pkg.originalPrice)}</span> : null}
            </p>
            <p className="font-serif text-[22px] leading-tight font-semibold text-ink-deep">{formatINR(pkg.startingPrice)}</p>
            <p className="text-xs text-muted">{pkg.priceNote}</p>
          </div>
          <span className="relative z-[1] inline-flex h-10 flex-none items-center gap-2 rounded-lg border border-line px-3.5 text-[13.5px] font-medium text-ink transition-colors duration-[250ms] group-hover:border-olive group-hover:bg-olive group-hover:text-white">
            View Package
          </span>
        </div>
      </div>
    </article>
  );
}
