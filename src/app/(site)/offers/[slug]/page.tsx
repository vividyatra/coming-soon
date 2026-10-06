import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOffer, getOfferSlugs, getOffers, getPackagesBySlugs } from "@/lib/catalog";
import { routes } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { Icon } from "@/components/ui/Icon";
import { DetailHero } from "@/components/templates/DetailHero";
import { BlockHeading, CheckList, DetailBlock, DetailLayout, FactsPanel, IconGrid } from "@/components/templates/Blocks";
import { EnquiryCard } from "@/components/templates/EnquiryCard";
import { FaqAccordion } from "@/components/templates/FaqAccordion";
import { Section } from "@/components/templates/Section";
import { CtaBanner } from "@/components/templates/CtaBanner";
import { PackageCard } from "@/components/cards/PackageCard";
import { OfferCard } from "@/components/cards/OfferCard";
import { CopyCode, DaysLeft } from "@/components/offers/OfferWidgets";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return (await getOfferSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const o = await getOffer((await params).slug);
  return { title: o ? `${o.title}: ${o.discountLabel} | Vivid Yatra Offers` : "Offer not found | Vivid Yatra" };
}

export default async function OfferDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const offer = await getOffer(slug);
  if (!offer) notFound();

  const [packages, all] = await Promise.all([getPackagesBySlugs(offer.applicablePackages), getOffers()]);
  const others = all.filter((o) => o.slug !== offer.slug).slice(0, 3);

  const claimCard = (
    <div className="space-y-5">
      <div className="rounded-2xl border border-line-soft bg-white p-5 shadow-card md:p-6">
        <p className="text-[13px] font-medium tracking-[.6px] text-muted uppercase">Your offer</p>
        <p className="mt-1 font-serif text-[28px] leading-tight font-semibold text-ink-deep">{offer.discountLabel}</p>
        <div className="mt-3">
          <DaysLeft until={offer.validTill} />
        </div>
        {offer.code ? (
          <div className="mt-5">
            <p className="mb-2 text-[13px] text-subtle">Use this code when you enquire:</p>
            <CopyCode code={offer.code} />
          </div>
        ) : null}
        <ButtonLink href={`${routes.planTrip}?offer=${offer.slug}`} icon="arrowRight" className="mt-5 w-full">
          Claim Offer
        </ButtonLink>
      </div>
      <EnquiryCard subject={`Offer: ${offer.title}${offer.code ? ` (${offer.code})` : ""}`} title="Questions about this offer?" />
    </div>
  );

  return (
    <>
      {/* Offer Hero */}
      <DetailHero
        image={offer.image}
        breadcrumbs={[{ label: "Home", href: routes.home }, { label: "Offers", href: routes.offers }, { label: offer.title }]}
        chips={[offer.kind, offer.discountLabel]}
        eyebrow="Special offer"
        title={offer.title}
        subtitle={offer.subtitle}
        meta={[
          { icon: "calendar", label: `Valid till ${offer.validTill}` },
          ...(offer.code ? [{ icon: "ticket" as const, label: `Code ${offer.code}` }] : []),
          { icon: "suitcase", label: `${packages.length} eligible ${packages.length === 1 ? "package" : "packages"}` },
        ]}
        actions={
          <>
            <ButtonLink href={`${routes.planTrip}?offer=${offer.slug}`} variant="light" size="lg" icon="arrowRight">
              Claim Offer
            </ButtonLink>
            <ButtonLink href="#packages" variant="outlineLight" size="lg" icon="suitcase">
              Eligible Packages
            </ButtonLink>
          </>
        }
      />

      <DetailLayout sidebar={claimCard}>
        {/* Offer Details */}
        <DetailBlock id="details">
          <BlockHeading eyebrow="Offer Details">What you get</BlockHeading>
          <div className="space-y-4 text-[15.5px] leading-[1.8] text-body md:text-base">
            {offer.description.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="mt-6">
            <FactsPanel
              facts={[
                { label: "Discount", value: offer.discountLabel, icon: "percent" },
                { label: "Offer type", value: offer.kind, icon: "priceTag" },
                { label: "Promo code", value: offer.code ?? "Not required", icon: "ticket" },
                { label: "Valid till", value: offer.validTill, icon: "calendar" },
              ]}
            />
          </div>
        </DetailBlock>

        {/* Offer Benefits */}
        <DetailBlock id="benefits">
          <BlockHeading eyebrow="Offer Benefits">Why this deal is worth it</BlockHeading>
          <IconGrid items={offer.benefits} columns={3} />
        </DetailBlock>

        {/* Validity */}
        <DetailBlock id="validity">
          <BlockHeading eyebrow="Validity">Book within these dates</BlockHeading>
          <div className="grid items-center gap-4 rounded-[14px] border border-line-soft bg-white p-5 shadow-tile sm:grid-cols-[1fr_auto_1fr] md:p-6">
            <div>
              <p className="text-[12.5px] font-medium tracking-[.6px] text-muted uppercase">Booking opens</p>
              <p className="mt-1 font-serif text-[21px] font-semibold text-ink">{offer.validFrom}</p>
            </div>
            <Icon name="arrowRight" className="size-6 text-olive max-sm:rotate-90" />
            <div className="sm:text-right">
              <p className="text-[12.5px] font-medium tracking-[.6px] text-muted uppercase">Booking closes</p>
              <p className="mt-1 font-serif text-[21px] font-semibold text-ink">{offer.validTill}</p>
            </div>
          </div>
        </DetailBlock>

        {/* How to Claim */}
        <DetailBlock id="claim">
          <BlockHeading eyebrow="How to Claim">Four simple steps</BlockHeading>
          <ol className="grid gap-4 sm:grid-cols-2">
            {offer.howToClaim.map((step, i) => (
              <li key={step} className="flex gap-4 rounded-[14px] border border-line-soft bg-white p-5 shadow-tile">
                <span className="flex size-10 flex-none items-center justify-center rounded-full bg-olive font-serif text-[17px] font-semibold text-white">{i + 1}</span>
                <p className="text-[15px] leading-[1.6] text-body">{step}</p>
              </li>
            ))}
          </ol>
        </DetailBlock>

        {/* Terms & Conditions */}
        <DetailBlock id="terms">
          <BlockHeading eyebrow="Terms & Conditions">Offer terms</BlockHeading>
          <CheckList items={offer.terms} variant="dot" />
        </DetailBlock>

        {/* FAQs */}
        <DetailBlock id="faqs">
          <BlockHeading eyebrow="FAQs">Questions about this offer</BlockHeading>
          <FaqAccordion faqs={offer.faqs} name={`faq-${offer.slug}`} />
        </DetailBlock>
      </DetailLayout>

      {/* Applicable Packages */}
      <Section id="packages" eyebrow="Applicable Packages" title="Packages eligible for this offer" align="left" action={<TextLink href={routes.packages}>All packages</TextLink>}>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {packages.map((p) => (
            <PackageCard key={p.slug} pkg={p} />
          ))}
        </div>
      </Section>

      {/* More offers */}
      <Section id="more" eyebrow="More Deals" title="Other offers you may like" align="left" action={<TextLink href={routes.offers}>All offers</TextLink>}>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => (
            <OfferCard key={o.slug} offer={o} />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <CtaBanner script="Don’t miss out" titleLines={[`Claim “${offer.title}”`, "before it ends"]} primary={{ label: "Claim Offer", href: `${routes.planTrip}?offer=${offer.slug}` }} />
    </>
  );
}
