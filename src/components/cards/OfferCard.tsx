import Image from "next/image";
import Link from "next/link";
import type { OfferDetail } from "@/types/catalog";
import { routes } from "@/data/site";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

/** Offer / deal card with discount, validity and promo code. */
export function OfferCard({ offer, className }: { offer: OfferDetail; className?: string }) {
  const href = `${routes.offers}/${offer.slug}`;
  return (
    <article className={cn("group relative flex flex-col overflow-hidden rounded-[14px] border border-line-soft bg-white shadow-tile transition-all duration-300 hover:-translate-y-1 hover:shadow-card", className)}>
      <div className="relative h-[190px] overflow-hidden bg-[linear-gradient(150deg,#c3ccd0,#95a28d)]">
        <Image src={offer.image.src} alt={offer.image.alt} fill sizes="(min-width: 992px) 33vw, (min-width: 576px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
        <span className="absolute top-3.5 left-3.5 rounded-full bg-white/92 px-3 py-1.5 text-[11px] font-semibold tracking-[.6px] text-olive-dark uppercase backdrop-blur-sm">{offer.kind}</span>
        <span className="absolute bottom-0 left-0 rounded-tr-[14px] bg-olive px-4 py-2 font-serif text-[17px] font-semibold text-white">{offer.discountLabel}</span>
      </div>
      <div className="flex flex-1 flex-col px-5 pt-[18px] pb-5">
        <h3 className="text-[19px] leading-[1.25] font-semibold text-ink md:text-xl">
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {offer.title}
          </Link>
        </h3>
        <p className="mt-2 mb-5 line-clamp-2 text-[14px] leading-[1.6] text-body">{offer.subtitle}</p>
        {offer.code ? (
          <p className="mb-5 inline-flex items-center gap-2 self-start rounded-lg border border-dashed border-olive/50 bg-cream px-3 py-1.5 text-[12.5px] text-subtle">
            Code <strong className="font-semibold tracking-[1px] text-olive-dark">{offer.code}</strong>
          </p>
        ) : null}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line-soft pt-4">
          <span className="inline-flex items-center gap-1.5 text-[13px] text-subtle">
            <Icon name="calendar" className="size-4 text-olive" />
            Valid till <strong className="font-semibold text-ink">{offer.validTill}</strong>
          </span>
          <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-olive">
            View Offer
            <Icon name="arrowRight" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
