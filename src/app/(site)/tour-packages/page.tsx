import type { Metadata } from "next";
import { getDestinations, getFaqGroup, getPackages, getTravelStyles } from "@/lib/catalog";
import { routes } from "@/data/site";
import { india } from "@/data/catalog/media";
import { PageHero } from "@/components/templates/PageHero";
import { Section } from "@/components/templates/Section";
import { FaqAccordion } from "@/components/templates/FaqAccordion";
import { CtaBanner } from "@/components/templates/CtaBanner";
import { PackageExplorer } from "@/components/packages/PackageExplorer";
import { PackageCard } from "@/components/cards/PackageCard";
import { StyleTiles } from "@/components/shared/StyleTiles";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Tour Packages | Vivid Yatra",
};

type SearchParams = Promise<Record<string, string | undefined>>;

export default async function TourPackagesPage({ searchParams }: { searchParams: SearchParams }) {
  const [params, packages, destinations, styles, faqGroup] = await Promise.all([searchParams, getPackages(), getDestinations(), getTravelStyles(), getFaqGroup("packages")]);

  const destinationOptions = destinations.filter((d) => d.packagesCount > 0).map((d) => ({ label: d.name, value: d.slug }));
  const featured = packages.filter((p) => p.featured).slice(0, 4);
  const popular = [...packages].sort((a, b) => b.reviews - a.reviews).slice(0, 3);
  const styleCounts = Object.fromEntries(styles.map((s) => [s.slug, packages.filter((p) => p.styles.includes(s.slug)).length]));
  const minPrice = Math.min(...packages.map((p) => p.startingPrice));

  return (
    <>
      {/* Hero */}
      <PageHero
        image={india("kerala-houseboat", "Houseboat on the Kerala backwaters")}
        breadcrumbs={[{ label: "Home", href: routes.home }, { label: "Tour Packages" }]}
        script="Handpicked Journeys"
        title="Tour Packages"
        subtitle="Thoughtfully planned itineraries with stays, transfers and experiences included — every one of them fully customisable."
      >
        <ul className="flex flex-wrap gap-3">
          {[
            { icon: "suitcase" as const, label: `${packages.length}+ curated packages` },
            { icon: "rupee" as const, label: `From ₹${minPrice.toLocaleString("en-IN")} per person` },
            { icon: "star" as const, label: "4.8 average rating" },
          ].map((chip) => (
            <li key={chip.label} className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[14px] text-white backdrop-blur-sm">
              <Icon name={chip.icon} className="size-4" />
              {chip.label}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Package Search + Featured + Filters + All Packages */}
      <PackageExplorer key={JSON.stringify(params)} packages={packages} destinations={destinationOptions} styles={styles} initial={params}>
        <Section id="featured" eyebrow="Editor’s Picks" title="Featured Packages" subtitle="Our most-loved journeys, refined over hundreds of happy trips.">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 2xl:gap-6">
            {featured.map((p) => (
              <PackageCard key={p.slug} pkg={p} />
            ))}
          </div>
        </Section>
      </PackageExplorer>

      {/* Popular Packages */}
      <Section id="popular" eyebrow="Traveller Favourites" title="Popular Packages" subtitle="Booked again and again by families, couples and friends." tone="band">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:gap-6">
          {popular.map((p) => (
            <PackageCard key={p.slug} pkg={p} />
          ))}
        </div>
      </Section>

      {/* Packages by Travel Style */}
      <Section id="by-style" eyebrow="Travel Your Way" title="Packages by Travel Style">
        <StyleTiles styles={styles} hrefFor={(slug) => `${routes.packages}?style=${slug}#all-packages`} counts={styleCounts} countLabel="packages" />
      </Section>

      {/* FAQ */}
      <Section id="faq" eyebrow="Good To Know" title="Tour Package FAQs" width="narrow">
        <FaqAccordion faqs={faqGroup?.items ?? []} name="packages-faq" />
      </Section>

      {/* Final CTA */}
      <CtaBanner script="Can’t find the right fit?" titleLines={["Let us design a", "trip just for you"]} primary={{ label: "Plan a Custom Trip", href: routes.planTrip }} />
    </>
  );
}
