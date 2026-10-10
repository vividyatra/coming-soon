import Image from "next/image";
import Link from "next/link";
import type { Offer } from "@/types/content";
import { routes } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";

function Validity({ date, light = false }: { date?: string; light?: boolean }) {
  if (!date) return null;
  return (
    <p className={`inline-flex items-center gap-2 text-[13px] ${light ? "text-white/80" : "text-subtle"}`}>
      <Icon name="calendar" className={`size-4 ${light ? "text-white" : "text-olive"}`} />
      Valid till <strong className={`font-semibold ${light ? "text-white" : "text-ink"}`}>{date}</strong>
    </p>
  );
}

function FeaturedOffer({ offer }: { offer: Offer }) {
  return (
    <article className="relative flex min-h-[420px] overflow-hidden rounded-[18px] bg-moss-soft text-white">
      <div className="absolute inset-y-0 right-0 w-full md:w-[58%]">
        <Image
          src={offer.image.src}
          alt={offer.image.alt}
          fill
          sizes="(min-width: 992px) 35vw, 100vw"
          className="object-cover opacity-40 md:opacity-100 md:[mask-image:linear-gradient(to_right,transparent_0,#000_55%)]"
        />
      </div>
      <div className="relative flex max-w-[440px] flex-col justify-center p-7 sm:p-10">
        <span className="self-start rounded-full bg-paper px-3.5 py-1.5 text-xs font-semibold tracking-[.4px] text-olive-dark">{offer.discount}</span>
        <h3 className="mt-4 text-[28px] leading-[1.2] font-semibold text-white md:text-[32px]">{offer.title}</h3>
        <p className="mt-3 text-[15px] leading-[1.7] font-light text-white/82">{offer.description}</p>
        {offer.code ? (
          <p className="mt-5 inline-flex items-center gap-2 self-start rounded-lg border border-dashed border-white/50 px-3.5 py-2 text-[13px] text-white/85">
            Use code <strong className="font-semibold tracking-[1px] text-white">{offer.code}</strong>
          </p>
        ) : null}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
          <ButtonLink href={offer.cta.href} variant="light" icon="arrowRight">
            {offer.cta.label}
          </ButtonLink>
          <Validity date={offer.validTill} light />
        </div>
      </div>
    </article>
  );
}

function CompactOffer({ offer }: { offer: Offer }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[14px] border border-line-soft bg-white shadow-tile transition-shadow duration-300 hover:shadow-card sm:flex-row">
      <div className="relative h-[170px] flex-none overflow-hidden sm:h-auto sm:w-[40%]">
        <Image
          src={offer.image.src}
          alt={offer.image.alt}
          fill
          sizes="(min-width: 992px) 18vw, (min-width: 576px) 40vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <span className="self-start rounded-full bg-cream-2 px-3 py-1 text-xs font-semibold text-olive">{offer.discount}</span>
        <h3 className="mt-3 text-[19px] leading-[1.25] font-semibold text-ink">{offer.title}</h3>
        <p className="mt-2 line-clamp-2 text-[13.5px] leading-[1.6] text-body">{offer.description}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
          <Validity date={offer.validTill} />
          <Link
            href={offer.cta.href}
            className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-olive transition-colors hover:text-olive-dark"
          >
            {offer.cta.label}
            <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function SpecialOffers({ offers }: { offers: Offer[] }) {
  const [featured, ...rest] = offers;
  if (!featured) return null;

  return (
    <section aria-labelledby="offers-title" className="pt-14 md:pt-[72px] lg:pt-[84px]">
      <div className="container-site">
        <SectionHeading
          eyebrow="Trips For Every Occasion"
          title="Corporate Travel, Honeymoons & Group Tours"
          subtitle="Whether it’s a team offsite or a once-in-a-lifetime honeymoon, we take care of the details."
          align="left"
          titleId="offers-title"
          action={<TextLink href={routes.contact}>Talk to a Planner</TextLink>}
        />
        <div className="mt-2 grid gap-5 lg:grid-cols-[1.15fr_1fr] 2xl:gap-6">
          <FeaturedOffer offer={featured} />
          <div className="grid gap-5 2xl:gap-6">
            {rest.map((offer) => (
              <CompactOffer key={offer.slug} offer={offer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
