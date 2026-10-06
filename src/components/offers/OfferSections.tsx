import Image from "next/image";
import Link from "next/link";
import type { OfferDetail, TourPackageDetail } from "@/types/catalog";
import { routes } from "@/data/site";
import { formatINR } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CopyCode, DaysLeft } from "./OfferWidgets";

/* Sections for the Offers listing template. */

/** Large green deal card — same design as Home "Special Offers" featured card. */
export function FeaturedDeal({ offer }: { offer: OfferDetail }) {
  return (
    <article className="relative flex min-h-[400px] overflow-hidden rounded-[18px] bg-moss-soft text-white">
      <div className="absolute inset-y-0 right-0 w-full md:w-[58%]">
        <Image src={offer.image.src} alt={offer.image.alt} fill sizes="(min-width: 992px) 35vw, 100vw" className="object-cover opacity-40 md:opacity-100 md:[mask-image:linear-gradient(to_right,transparent_0,#000_55%)]" />
      </div>
      <div className="relative flex max-w-[460px] flex-col justify-center p-7 sm:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-paper px-3.5 py-1.5 text-xs font-semibold tracking-[.4px] text-olive-dark">{offer.discountLabel}</span>
          <DaysLeft until={offer.validTill} className="bg-white/15 text-white" />
        </div>
        <h3 className="mt-4 text-[26px] leading-[1.2] font-semibold text-white md:text-[30px]">{offer.title}</h3>
        <p className="mt-3 text-[15px] leading-[1.7] font-light text-white/82">{offer.subtitle}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
          <ButtonLink href={`${routes.offers}/${offer.slug}`} variant="light" icon="arrowRight">
            View Deal
          </ButtonLink>
          <p className="inline-flex items-center gap-2 text-[13px] text-white/80">
            <Icon name="calendar" className="size-4 text-white" />
            Valid till <strong className="font-semibold text-white">{offer.validTill}</strong>
          </p>
        </div>
      </div>
    </article>
  );
}

/** Horizontal package-offer row listing eligible packages. */
export function PackageOfferRow({ offer, packages }: { offer: OfferDetail; packages: TourPackageDetail[] }) {
  return (
    <article className="grid overflow-hidden rounded-[14px] border border-line-soft bg-white shadow-tile md:grid-cols-[260px_minmax(0,1fr)]">
      <div className="relative h-[180px] md:h-auto">
        <Image src={offer.image.src} alt={offer.image.alt} fill sizes="(min-width: 768px) 260px, 100vw" className="object-cover" />
        <span className="absolute bottom-0 left-0 rounded-tr-[14px] bg-olive px-4 py-2 font-serif text-[16px] font-semibold text-white">{offer.discountLabel}</span>
      </div>
      <div className="p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-[20px] font-semibold text-ink">
              <Link href={`${routes.offers}/${offer.slug}`} className="hover:text-olive">
                {offer.title}
              </Link>
            </h3>
            <p className="mt-1 text-[14px] text-subtle">{offer.subtitle}</p>
          </div>
          {offer.code ? <CopyCode code={offer.code} /> : null}
        </div>
        <p className="mt-4 text-[12.5px] font-medium tracking-[.6px] text-muted uppercase">Applies to</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {packages.map((p) => (
            <li key={p.slug}>
              <Link href={`${routes.packages}/${p.slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-cream-2 px-3 py-1.5 text-[13px] text-ink-soft transition-colors hover:bg-olive hover:text-white">
                {p.title}
                <span className="text-muted">· {formatINR(p.startingPrice)}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-4">
          <span className="inline-flex items-center gap-1.5 text-[13px] text-subtle">
            <Icon name="calendar" className="size-4 text-olive" />
            Valid {offer.validFrom} – {offer.validTill}
          </span>
          <Link href={`${routes.offers}/${offer.slug}`} className="inline-flex items-center gap-1.5 text-[14px] font-medium text-olive hover:text-olive-dark">
            Offer details
            <Icon name="arrowRight" className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Promo code table. */
export function CouponTable({ offers }: { offers: OfferDetail[] }) {
  const coded = offers.filter((o) => o.code);
  return (
    <div className="overflow-hidden rounded-[14px] border border-line-soft bg-white shadow-tile">
      <div className="hidden grid-cols-[1.1fr_1.4fr_1fr_auto] gap-4 border-b border-line-soft bg-cream-2/60 px-6 py-3 text-[12.5px] font-semibold tracking-[.6px] text-muted uppercase md:grid">
        <span>Code</span>
        <span>Benefit</span>
        <span>Valid till</span>
        <span className="sr-only">Details</span>
      </div>
      <ul className="divide-y divide-line-soft">
        {coded.map((o) => (
          <li key={o.slug} className="grid gap-3 px-5 py-4 md:grid-cols-[1.1fr_1.4fr_1fr_auto] md:items-center md:gap-4 md:px-6">
            <CopyCode code={o.code as string} className="justify-self-start" />
            <div>
              <p className="text-[15px] font-semibold text-ink">{o.discountLabel}</p>
              <p className="text-[13px] text-subtle">{o.title}</p>
            </div>
            <p className="text-[14px] text-ink-soft">
              <span className="text-muted md:hidden">Valid till </span>
              {o.validTill}
            </p>
            <Link href={`${routes.offers}/${o.slug}`} className="inline-flex items-center gap-1.5 text-[14px] font-medium text-olive hover:text-olive-dark">
              Details
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
