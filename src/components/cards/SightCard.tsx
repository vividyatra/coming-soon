import Image from "next/image";
import Link from "next/link";
import type { SightseeingDetail } from "@/types/catalog";
import { routes } from "@/data/site";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

/** Sightseeing / attraction card. */
export function SightCard({ sight, destinationName, className }: { sight: SightseeingDetail; destinationName?: string; className?: string }) {
  const href = `${routes.sightseeing}/${sight.slug}`;
  return (
    <article className={cn("group relative flex flex-col overflow-hidden rounded-[14px] border border-line-soft bg-white shadow-tile transition-all duration-300 hover:-translate-y-1 hover:shadow-card", className)}>
      <div className="relative aspect-[16/11] overflow-hidden bg-[linear-gradient(150deg,#c3ccd0,#95a28d)]">
        <Image
          src={sight.image.src}
          alt={sight.image.alt}
          fill
          sizes="(min-width: 1151px) 25vw, (min-width: 576px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <span className="absolute top-3.5 left-3.5 rounded-full bg-white/92 px-3 py-1.5 text-[11px] font-semibold tracking-[.6px] text-olive-dark uppercase backdrop-blur-sm">
          {sight.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-5 pt-[18px] pb-5">
        <p className="inline-flex items-center gap-1.5 text-[11.5px] font-medium tracking-[1.4px] text-eyebrow uppercase">
          <Icon name="pin" className="size-3.5 text-olive" />
          {destinationName ?? sight.location.city}, {sight.location.state}
        </p>
        <h3 className="mt-2 text-[18.5px] leading-[1.25] font-semibold text-ink md:text-[19.5px]">
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {sight.name}
          </Link>
        </h3>
        <p className="mt-2 mb-5 line-clamp-2 text-[14px] leading-[1.6] text-body">{sight.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between border-t border-line-soft pt-4">
          <span className="inline-flex items-center gap-1.5 text-[13px] text-muted">
            <Icon name="clock" className="size-4 text-olive" />
            {sight.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-olive">
            Explore
            <Icon name="arrowRight" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
