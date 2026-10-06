import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getBlogsForDestination,
  getDestination,
  getDestinationSlugs,
  getPackagesForDestination,
  getRelatedDestinations,
  getSightsForDestination,
  getTravelStyles,
} from "@/lib/catalog";
import { routes } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { DetailHero } from "@/components/templates/DetailHero";
import { InPageNav } from "@/components/templates/InPageNav";
import { BlockHeading, CheckList, DetailBlock, DetailLayout, FactsPanel, IconGrid } from "@/components/templates/Blocks";
import { EnquiryCard } from "@/components/templates/EnquiryCard";
import { FaqAccordion } from "@/components/templates/FaqAccordion";
import { Section } from "@/components/templates/Section";
import { CtaBanner } from "@/components/templates/CtaBanner";
import { DurationCallout, PhotoStrip, SeasonCards, TopPlaces } from "@/components/destinations/DestinationDetailBlocks";
import { SightCard } from "@/components/cards/SightCard";
import { PackageCard } from "@/components/cards/PackageCard";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { BlogCard } from "@/components/cards/BlogCard";
import { StyleTiles } from "@/components/shared/StyleTiles";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return (await getDestinationSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const d = await getDestination((await params).slug);
  return { title: d ? `${d.name} Travel Guide & Tour Packages | Vivid Yatra` : "Destination not found | Vivid Yatra" };
}

export default async function DestinationDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const d = await getDestination(slug);
  if (!d) notFound();

  const [sights, packages, related, blogs, styles] = await Promise.all([
    getSightsForDestination(slug),
    getPackagesForDestination(slug),
    getRelatedDestinations(slug),
    getBlogsForDestination(slug),
    getTravelStyles(),
  ]);
  const recommendedStyles = styles.filter((s) => d.styles.includes(s.slug));
  const cheapest = packages.length ? Math.min(...packages.map((p) => p.startingPrice)) : undefined;

  const nav = [
    { id: "overview", label: "Overview" },
    { id: "why-visit", label: "Why Visit" },
    { id: "top-places", label: "Top Places" },
    ...(sights.length ? [{ id: "sightseeing", label: "Sightseeing" }] : []),
    { id: "things-to-do", label: "Things to Do" },
    { id: "best-time", label: "Best Time" },
    ...(packages.length ? [{ id: "packages", label: "Packages" }] : []),
    { id: "tips", label: "Travel Tips" },
    { id: "faqs", label: "FAQs" },
  ];

  return (
    <>
      {/* Destination Hero */}
      <DetailHero
        image={d.image}
        breadcrumbs={[{ label: "Home", href: routes.home }, { label: "Destinations", href: routes.destinations }, { label: d.name }]}
        chips={[d.region === "India" ? `${d.state}, India` : d.state, ...d.bestFor.slice(0, 2)]}
        eyebrow={d.tagline}
        title={d.name}
        subtitle={d.shortDescription}
        meta={[
          { icon: "clock", label: `Ideal: ${d.idealDuration.days}` },
          { icon: "sun", label: `Best: ${d.bestTime.find((s) => s.recommended)?.months ?? d.bestTime[0].months}` },
          { icon: "suitcase", label: `${d.packagesCount} tour ${d.packagesCount === 1 ? "package" : "packages"}` },
        ]}
        actions={
          <>
            <ButtonLink href={packages.length ? "#packages" : routes.planTrip} variant="light" size="lg" icon="arrowRight">
              {packages.length ? "View Packages" : "Plan This Trip"}
            </ButtonLink>
            <ButtonLink href={routes.planTrip} variant="outlineLight" size="lg" icon="calendar">
              Enquire Now
            </ButtonLink>
          </>
        }
      />

      <InPageNav items={nav} />

      <DetailLayout sidebar={<EnquiryCard subject={`Destination: ${d.name}`} title={`Plan your ${d.name} trip`} price={cheapest} priceNote="per person" />}>
        {/* Destination Overview */}
        <DetailBlock id="overview">
          <BlockHeading eyebrow="Overview">About {d.name}</BlockHeading>
          <div className="space-y-4 text-[15.5px] leading-[1.8] text-body md:text-base">
            {d.overview.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="mt-6">
            <FactsPanel facts={d.quickFacts.map((f, i) => ({ ...f, icon: (["pin", "plane", "clock", "sparkle"] as const)[i % 4] }))} />
          </div>
          <div className="mt-6">
            <PhotoStrip photos={d.gallery} />
          </div>
        </DetailBlock>

        {/* Why Visit */}
        <DetailBlock id="why-visit">
          <BlockHeading eyebrow="Why Visit">Why you’ll love {d.name}</BlockHeading>
          <IconGrid items={d.whyVisit} />
        </DetailBlock>

        {/* Top Places to Visit */}
        <DetailBlock id="top-places">
          <BlockHeading eyebrow="Top Places">Top places to visit in {d.name}</BlockHeading>
          <TopPlaces places={d.topPlaces} />
        </DetailBlock>

        {/* Popular Sightseeing */}
        {sights.length ? (
          <DetailBlock id="sightseeing">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <BlockHeading eyebrow="Popular Sightseeing">Must-see attractions</BlockHeading>
              <TextLink href={routes.sightseeing} className="mb-6">
                All sightseeing
              </TextLink>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {sights.slice(0, 4).map((s) => (
                <SightCard key={s.slug} sight={s} />
              ))}
            </div>
          </DetailBlock>
        ) : null}

        {/* Things to Do */}
        <DetailBlock id="things-to-do">
          <BlockHeading eyebrow="Things to Do">Experiences not to miss</BlockHeading>
          <IconGrid items={d.thingsToDo} tone="plain" />
        </DetailBlock>

        {/* Best Time + Ideal Duration */}
        <DetailBlock id="best-time">
          <BlockHeading eyebrow="Best Time to Visit">When to go</BlockHeading>
          <SeasonCards seasons={d.bestTime} />
          <div className="mt-5">
            <DurationCallout days={d.idealDuration.days} text={d.idealDuration.text} />
          </div>
        </DetailBlock>

        {/* Popular Tour Packages */}
        {packages.length ? (
          <DetailBlock id="packages">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <BlockHeading eyebrow="Tour Packages">Popular {d.name} packages</BlockHeading>
              <TextLink href={`${routes.packages}?destination=${d.slug}`} className="mb-6">
                View all
              </TextLink>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {packages.slice(0, 4).map((p) => (
                <PackageCard key={p.slug} pkg={p} />
              ))}
            </div>
          </DetailBlock>
        ) : null}

        {/* Travel Tips */}
        <DetailBlock id="tips">
          <BlockHeading eyebrow="Travel Tips">Good to know before you go</BlockHeading>
          <CheckList items={d.tips} />
        </DetailBlock>

        {/* FAQs */}
        <DetailBlock id="faqs">
          <BlockHeading eyebrow="FAQs">{d.name} travel FAQs</BlockHeading>
          <FaqAccordion faqs={d.faqs} name={`faq-${d.slug}`} />
        </DetailBlock>
      </DetailLayout>

      {/* Recommended Travel Styles */}
      {recommendedStyles.length ? (
        <Section id="styles" eyebrow="Travel Your Way" title={`Best ways to experience ${d.name}`}>
          <StyleTiles styles={recommendedStyles} hrefFor={(s) => `${routes.packages}?style=${s}`} />
        </Section>
      ) : null}

      {/* Related Destinations */}
      <Section id="related" eyebrow="You May Also Like" title="Related Destinations" align="left" action={<TextLink href={routes.destinations}>All destinations</TextLink>}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((r) => (
            <DestinationCard key={r.slug} destination={r} />
          ))}
        </div>
      </Section>

      {/* Related Blogs */}
      {blogs.length ? (
        <Section id="blogs" eyebrow="Travel Inspiration" title={`Read before you visit ${d.name}`} align="left" action={<TextLink href={routes.blogs}>All articles</TextLink>}>
          <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {blogs.slice(0, 3).map((b) => (
              <BlogCard key={b.slug} post={b} />
            ))}
          </div>
        </Section>
      ) : null}

      {/* Enquiry CTA */}
      <CtaBanner script={`Dreaming of ${d.name}?`} titleLines={["Let’s plan your", `${d.name} journey`]} />
    </>
  );
}
