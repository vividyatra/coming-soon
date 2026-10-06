import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getBlogsForPackage,
  getDestinations,
  getOffersForPackage,
  getPackage,
  getPackageSlugs,
  getRelatedPackages,
} from "@/lib/catalog";
import { routes } from "@/data/site";
import { formatINR } from "@/lib/utils";
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
import { PhotoStrip } from "@/components/destinations/DestinationDetailBlocks";
import { ApplicableOffers, CustomizeCallout, ItineraryTimeline, PricingTiers } from "@/components/packages/PackageDetailBlocks";
import { PackageCard, packageDuration } from "@/components/cards/PackageCard";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { BlogCard } from "@/components/cards/BlogCard";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return (await getPackageSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = await getPackage((await params).slug);
  return { title: p ? `${p.title} (${packageDuration(p)}) | Vivid Yatra` : "Package not found | Vivid Yatra" };
}

export default async function PackageDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const pkg = await getPackage(slug);
  if (!pkg) notFound();

  const [related, allDestinations, blogs, offers] = await Promise.all([getRelatedPackages(pkg), getDestinations(), getBlogsForPackage(slug), getOffersForPackage(slug)]);
  const destinations = allDestinations.filter((d) => pkg.destinations.includes(d.slug));
  const primary = destinations[0];
  const bookHref = `${routes.booking}?package=${pkg.slug}`;

  const nav = [
    { id: "overview", label: "Overview" },
    { id: "itinerary", label: "Itinerary" },
    { id: "inclusions", label: "Inclusions" },
    { id: "pricing", label: "Pricing" },
    { id: "info", label: "Important Info" },
    { id: "customize", label: "Customise" },
    { id: "faqs", label: "FAQs" },
  ];

  return (
    <>
      {/* Package Hero */}
      <DetailHero
        image={pkg.image}
        breadcrumbs={[{ label: "Home", href: routes.home }, { label: "Tour Packages", href: routes.packages }, { label: pkg.title }]}
        chips={[pkg.category, pkg.travelType, ...(pkg.badge ? [pkg.badge] : [])]}
        title={pkg.title}
        subtitle={pkg.placesCovered.join(" · ")}
        meta={[
          { icon: "clock", label: packageDuration(pkg) },
          { icon: "pin", label: primary ? `${primary.name}, ${primary.state}` : pkg.placesCovered[0] },
          { icon: "star", label: `${pkg.rating.toFixed(1)} (${pkg.reviews} reviews)` },
          { icon: "rupee", label: `From ${formatINR(pkg.startingPrice)} ${pkg.priceNote}` },
        ]}
        actions={
          <>
            <ButtonLink href={bookHref} variant="light" size="lg" icon="arrowRight">
              Book Now
            </ButtonLink>
            <ButtonLink href="#itinerary" variant="outlineLight" size="lg" icon="list">
              View Itinerary
            </ButtonLink>
          </>
        }
      />

      <InPageNav items={nav} />

      <DetailLayout
        sidebar={
          <EnquiryCard subject={`Package: ${pkg.title}`} title="Enquire about this trip" price={pkg.startingPrice} originalPrice={pkg.originalPrice} priceNote={pkg.priceNote} bookHref={bookHref} />
        }
      >
        {/* Quick Facts + Overview + Highlights */}
        <DetailBlock id="overview">
          <FactsPanel
            facts={[
              { label: "Duration", value: packageDuration(pkg), icon: "clock" },
              { label: "Destination", value: primary ? primary.name : pkg.placesCovered[0], icon: "pin" },
              { label: "Travel type", value: pkg.travelType, icon: "users" },
              { label: "Starting price", value: `${formatINR(pkg.startingPrice)} pp`, icon: "rupee" },
            ]}
          />
          <BlockHeading eyebrow="Package Overview" className="mt-9">
            About this journey
          </BlockHeading>
          <div className="space-y-4 text-[15.5px] leading-[1.8] text-body md:text-base">
            {pkg.overview.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="mt-6">
            <PhotoStrip photos={[pkg.image, ...pkg.gallery]} />
          </div>
          <h3 className="mt-8 mb-4 font-serif text-[21px] font-semibold text-ink">Package highlights</h3>
          <CheckList items={pkg.highlights} columns={2} />
        </DetailBlock>

        {/* Day-by-Day Itinerary */}
        <DetailBlock id="itinerary">
          <BlockHeading eyebrow="Day-by-Day Itinerary">Your {pkg.days}-day plan</BlockHeading>
          <ItineraryTimeline days={pkg.itinerary} />
        </DetailBlock>

        {/* Places Covered + Experiences */}
        <DetailBlock id="places">
          <BlockHeading eyebrow="Places Covered">Where you’ll go</BlockHeading>
          <ol className="flex flex-wrap items-center gap-2">
            {pkg.placesCovered.map((place, i) => (
              <li key={place} className="inline-flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line-soft bg-white px-3.5 py-2 text-[14px] text-ink shadow-tile">
                  <Icon name="pin" className="size-4 text-olive" />
                  {place}
                </span>
                {i < pkg.placesCovered.length - 1 ? <Icon name="arrowRight" className="size-4 text-stone" /> : null}
              </li>
            ))}
          </ol>
          <h3 className="mt-9 mb-4 font-serif text-[21px] font-semibold text-ink">Experiences & activities</h3>
          <IconGrid items={pkg.experiences} />
        </DetailBlock>

        {/* Inclusions / Exclusions */}
        <DetailBlock id="inclusions">
          <BlockHeading eyebrow="What’s Included">Inclusions & exclusions</BlockHeading>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[14px] border border-line-soft bg-white p-5 shadow-tile md:p-6">
              <p className="mb-4 inline-flex items-center gap-2 text-[16px] font-semibold text-ink">
                <Icon name="check" className="size-5 text-olive" /> Inclusions
              </p>
              <CheckList items={pkg.inclusions} />
            </div>
            <div className="rounded-[14px] border border-line-soft bg-white p-5 shadow-tile md:p-6">
              <p className="mb-4 inline-flex items-center gap-2 text-[16px] font-semibold text-ink">
                <Icon name="close" className="size-5 text-[#A8442C]" /> Exclusions
              </p>
              <CheckList items={pkg.exclusions} variant="cross" />
            </div>
          </div>
        </DetailBlock>

        {/* Pricing */}
        <DetailBlock id="pricing">
          <BlockHeading eyebrow="Pricing">Choose your comfort level</BlockHeading>
          <PricingTiers tiers={pkg.pricing} packageSlug={pkg.slug} />
          {offers.length ? (
            <div className="mt-6">
              <p className="mb-3 text-[14.5px] font-semibold text-ink">Offers on this package</p>
              <ApplicableOffers offers={offers} />
            </div>
          ) : null}
        </DetailBlock>

        {/* Important Information */}
        <DetailBlock id="info">
          <BlockHeading eyebrow="Important Information">Before you book</BlockHeading>
          <CheckList items={pkg.importantInfo} variant="dot" />
        </DetailBlock>

        {/* Customization Option */}
        <DetailBlock id="customize">
          <CustomizeCallout packageSlug={pkg.slug} title={pkg.title} />
        </DetailBlock>

        {/* FAQs */}
        <DetailBlock id="faqs">
          <BlockHeading eyebrow="FAQs">Questions about this package</BlockHeading>
          <FaqAccordion faqs={pkg.faqs} name={`faq-${pkg.slug}`} />
        </DetailBlock>
      </DetailLayout>

      {/* Related Packages */}
      <Section id="related" eyebrow="You May Also Like" title="Related Packages" align="left" action={<TextLink href={routes.packages}>All packages</TextLink>}>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:gap-6">
          {related.map((p) => (
            <PackageCard key={p.slug} pkg={p} />
          ))}
        </div>
      </Section>

      {/* Related Destinations */}
      {destinations.length ? (
        <Section id="destinations" eyebrow="Explore More" title="Destinations on this trip" align="left" action={<TextLink href={routes.destinations}>All destinations</TextLink>}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d) => (
              <DestinationCard key={d.slug} destination={d} />
            ))}
          </div>
        </Section>
      ) : null}

      {/* Related Blogs */}
      {blogs.length ? (
        <Section id="blogs" eyebrow="Travel Inspiration" title="Read before you go" align="left" action={<TextLink href={routes.blogs}>All articles</TextLink>}>
          <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {blogs.slice(0, 3).map((b) => (
              <BlogCard key={b.slug} post={b} />
            ))}
          </div>
        </Section>
      ) : null}

      {/* Enquiry / Booking CTA */}
      <CtaBanner script="Ready when you are" titleLines={["Book your", pkg.title]} text="Lock your dates with a 25% advance — or send us a quick enquiry and we’ll call you back." primary={{ label: "Book Now", href: bookHref }} />

      {/* sticky mobile booking bar */}
      <div className="mobile-action-bar fixed inset-x-0 bottom-0 z-30 border-t border-line-soft bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(45,50,25,.08)] backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11.5px] text-muted">From</p>
            <p className="font-serif text-[20px] leading-tight font-semibold text-ink-deep">
              {formatINR(pkg.startingPrice)} <span className="font-sans text-[11.5px] font-normal text-muted">{pkg.priceNote}</span>
            </p>
          </div>
          <ButtonLink href={bookHref} icon="arrowRight" className="h-11">
            Book Now
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
