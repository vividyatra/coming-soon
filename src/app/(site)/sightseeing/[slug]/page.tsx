import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDestination, getPackagesForDestination, getSight, getSightSlugs, getSightsBySlugs, getSightsForDestination } from "@/lib/catalog";
import { routes } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { Icon } from "@/components/ui/Icon";
import { DetailHero } from "@/components/templates/DetailHero";
import { InPageNav } from "@/components/templates/InPageNav";
import { BlockHeading, CheckList, DetailBlock, DetailLayout, FactsPanel, IconGrid } from "@/components/templates/Blocks";
import { EnquiryCard } from "@/components/templates/EnquiryCard";
import { FaqAccordion } from "@/components/templates/FaqAccordion";
import { Section } from "@/components/templates/Section";
import { CtaBanner } from "@/components/templates/CtaBanner";
import { MapEmbed } from "@/components/templates/MapEmbed";
import { PhotoStrip } from "@/components/destinations/DestinationDetailBlocks";
import { SightCard } from "@/components/cards/SightCard";
import { PackageCard } from "@/components/cards/PackageCard";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return (await getSightSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const s = await getSight((await params).slug);
  return { title: s ? `${s.name} — Timings, Tickets & Tips | Vivid Yatra` : "Attraction not found | Vivid Yatra" };
}

export default async function SightDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const sight = await getSight(slug);
  if (!sight) notFound();

  const [destination, sameDestination, nearbyPicked, packages] = await Promise.all([
    getDestination(sight.destinationSlug),
    getSightsForDestination(sight.destinationSlug),
    getSightsBySlugs(sight.nearby),
    getPackagesForDestination(sight.destinationSlug),
  ]);
  const nearby = [...nearbyPicked, ...sameDestination].filter((s, i, arr) => s.slug !== sight.slug && arr.findIndex((x) => x.slug === s.slug) === i).slice(0, 3);

  const nav = [
    { id: "overview", label: "Overview" },
    { id: "why-visit", label: "Why Visit" },
    { id: "highlights", label: "Highlights" },
    { id: "know", label: "Things to Know" },
    { id: "location", label: "Location" },
    { id: "faqs", label: "FAQs" },
  ];

  return (
    <>
      {/* Hero */}
      <DetailHero
        image={sight.image}
        breadcrumbs={[{ label: "Home", href: routes.home }, { label: "Sightseeing", href: routes.sightseeing }, { label: sight.name }]}
        chips={[sight.category, `${sight.location.city}, ${sight.location.state}`]}
        title={sight.name}
        subtitle={sight.shortDescription}
        meta={[
          { icon: "clock", label: sight.duration },
          { icon: "ticket", label: sight.thingsToKnow.find((k) => k.label === "Entry fee")?.value ?? "See details" },
          { icon: "pin", label: destination?.name ?? sight.location.city },
        ]}
        actions={
          <>
            <ButtonLink href={routes.planTrip} variant="light" size="lg" icon="arrowRight">
              Add to My Trip
            </ButtonLink>
            <ButtonLink href="#location" variant="outlineLight" size="lg" icon="pin">
              View Location
            </ButtonLink>
          </>
        }
      />

      <InPageNav items={nav} />

      <DetailLayout sidebar={<EnquiryCard subject={`Sightseeing: ${sight.name}`} title={`Visit ${sight.name}`} />}>
        {/* Overview */}
        <DetailBlock id="overview">
          <BlockHeading eyebrow="Overview">About {sight.name}</BlockHeading>
          <div className="space-y-4 text-[15.5px] leading-[1.8] text-body md:text-base">
            {sight.overview.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="mt-6">
            <PhotoStrip photos={[sight.image, ...sight.gallery, ...(destination ? destination.gallery : [])]} />
          </div>
        </DetailBlock>

        {/* Why Visit */}
        <DetailBlock id="why-visit">
          <BlockHeading eyebrow="Why Visit">Why it’s worth your time</BlockHeading>
          <IconGrid items={sight.whyVisit} columns={3} />
        </DetailBlock>

        {/* Highlights */}
        <DetailBlock id="highlights">
          <BlockHeading eyebrow="Highlights">Don’t miss</BlockHeading>
          <CheckList items={sight.highlights} columns={2} />
        </DetailBlock>

        {/* Things to Know + Best Time */}
        <DetailBlock id="know">
          <BlockHeading eyebrow="Things to Know">Plan your visit</BlockHeading>
          <FactsPanel facts={sight.thingsToKnow} />
          <div className="mt-5 flex items-start gap-4 rounded-[14px] border border-dashed border-olive/40 bg-cream-2/60 p-5">
            <span className="flex size-12 flex-none items-center justify-center rounded-full bg-white text-olive shadow-tile">
              <Icon name="sun" className="size-6" />
            </span>
            <div>
              <p className="text-[13px] font-medium tracking-[.6px] text-muted uppercase">Best time to visit</p>
              <p className="mt-1 text-[15.5px] leading-[1.6] text-ink">{sight.bestTime}</p>
            </div>
          </div>
        </DetailBlock>

        {/* Location / Destination */}
        <DetailBlock id="location">
          <BlockHeading eyebrow="Location">Where it is</BlockHeading>
          <div className="grid gap-5 md:grid-cols-[1fr_1.3fr]">
            <div className="rounded-[14px] border border-line-soft bg-white p-5 shadow-tile">
              <p className="text-[13px] font-medium tracking-[.6px] text-muted uppercase">Address</p>
              <p className="mt-1.5 text-[15.5px] leading-[1.6] text-ink">
                {sight.location.address}, {sight.location.city}, {sight.location.state}
              </p>
              {destination ? (
                <>
                  <p className="mt-5 text-[13px] font-medium tracking-[.6px] text-muted uppercase">Destination</p>
                  <Link href={`${routes.destinations}/${destination.slug}`} className="mt-1.5 inline-flex items-center gap-2 text-[15.5px] font-semibold text-olive hover:underline">
                    {destination.name} travel guide
                    <Icon name="arrowRight" className="size-4" />
                  </Link>
                </>
              ) : null}
            </div>
            <MapEmbed query={sight.location.mapQuery} title={`Map of ${sight.name}`} />
          </div>
        </DetailBlock>

        {/* Related Experiences */}
        <DetailBlock id="experiences">
          <BlockHeading eyebrow="Related Experiences">Make more of your visit</BlockHeading>
          <IconGrid items={sight.experiences} />
        </DetailBlock>

        {/* FAQs */}
        <DetailBlock id="faqs">
          <BlockHeading eyebrow="FAQs">{sight.name} FAQs</BlockHeading>
          <FaqAccordion faqs={sight.faqs} name={`faq-${sight.slug}`} />
        </DetailBlock>
      </DetailLayout>

      {/* Nearby Attractions */}
      {nearby.length ? (
        <Section id="nearby" eyebrow="Nearby Attractions" title="Also worth visiting" align="left" action={<TextLink href={routes.sightseeing}>All sightseeing</TextLink>}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {nearby.map((s) => (
              <SightCard key={s.slug} sight={s} />
            ))}
          </div>
        </Section>
      ) : null}

      {/* Related Packages */}
      {packages.length ? (
        <Section id="packages" eyebrow="Related Packages" title={`Tours that include ${sight.name}`} align="left" action={<TextLink href={routes.packages}>All packages</TextLink>}>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {packages.slice(0, 3).map((p) => (
              <PackageCard key={p.slug} pkg={p} />
            ))}
          </div>
        </Section>
      ) : null}

      {/* Enquiry CTA */}
      <CtaBanner script="Make it part of your trip" titleLines={["Visit " + sight.name, "with a local expert"]} />
    </>
  );
}
