import type { Metadata } from "next";
import { getDestinationsPage } from "@/lib/content";
import { getBlogs, getDestinations, getDestinationsByState, getFaqGroup, getTravelStyles } from "@/lib/catalog";
import { routes } from "@/data/site";
import { DestinationsHero } from "@/components/destinations/DestinationsHero";
import { DestinationsPanel } from "@/components/destinations/DestinationsPanel";
import { DestinationExplorer } from "@/components/destinations/DestinationExplorer";
import { FeaturedDestinations, StatesGrid } from "@/components/destinations/DestinationListingSections";
import { FeaturesBar } from "@/components/shared/FeaturesBar";
import { StyleTiles } from "@/components/shared/StyleTiles";
import { Section } from "@/components/templates/Section";
import { FaqAccordion } from "@/components/templates/FaqAccordion";
import { CtaBanner } from "@/components/templates/CtaBanner";
import { BlogCard } from "@/components/cards/BlogCard";
import { TextLink } from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: "Destinations | Vivid Yatra",
};

type SearchParams = Promise<{ q?: string; state?: string; style?: string; region?: string }>;

export default async function DestinationsPage({ searchParams }: { searchParams: SearchParams }) {
  const [params, page, destinations, byState, styles, blogs, faqGroup] = await Promise.all([
    searchParams,
    getDestinationsPage(),
    getDestinations(),
    getDestinationsByState(),
    getTravelStyles(),
    getBlogs(),
    getFaqGroup("destinations"),
  ]);

  const popular = destinations.filter((d) => d.popular).map((d) => ({ slug: d.slug, name: d.name, tagline: d.tagline, description: d.shortDescription, image: d.image }));
  const featured = destinations.filter((d) => d.featured);
  const styleCounts = Object.fromEntries(styles.map((s) => [s.slug, destinations.filter((d) => d.styles.includes(s.slug)).length]));

  return (
    <>
      {/* 01 Hero */}
      <DestinationsHero hero={page.hero} />

      {/* 02 Destination Search + 03 Explore Destinations */}
      <DestinationExplorer key={JSON.stringify(params)} destinations={destinations} styles={styles} initial={params} />

      {/* 04 Popular Destinations */}
      <div className="pt-14 md:pt-[72px] lg:pt-[84px]">
        <DestinationsPanel title="Popular Destinations" subtitle="The places our travellers love the most, season after season." items={popular} />
      </div>

      {/* 05 Destinations by State */}
      <Section id="by-state" eyebrow="Incredible India" title="Destinations by State" subtitle="From the deserts of Rajasthan to the backwaters of Kerala — explore India state by state.">
        <StatesGrid groups={byState} />
      </Section>

      {/* 06 Destinations by Travel Style */}
      <Section id="by-style" eyebrow="Travel Your Way" title="Destinations by Travel Style" subtitle="Pick the kind of journey you’re dreaming of.">
        <StyleTiles styles={styles} hrefFor={(slug) => `${routes.destinations}?style=${slug}#explore`} counts={styleCounts} countLabel="places" />
      </Section>

      {/* 07 Featured Destinations */}
      <Section id="featured" eyebrow="Editor’s Picks" title="Featured Destinations" align="left" action={<TextLink href="#explore">View all destinations</TextLink>}>
        <FeaturedDestinations items={featured} />
      </Section>

      {/* 08 Travel Inspiration */}
      <Section id="inspiration" eyebrow="Travel Inspiration" title="Stories to Spark Your Next Trip" align="left" action={<TextLink href={routes.blogs}>Read the blog</TextLink>}>
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3 2xl:gap-x-[30px]">
          {blogs.slice(0, 3).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      {/* 09 FAQ */}
      <Section id="faq" eyebrow="Good To Know" title="Destination FAQs" width="narrow">
        <FaqAccordion faqs={faqGroup?.items ?? []} name="destinations-faq" />
      </Section>

      <FeaturesBar features={page.features} className="pt-14 pb-0 sm:pt-[72px] sm:pb-0 lg:pt-[84px] lg:pb-0" />

      {/* 10 Final CTA */}
      <CtaBanner />
    </>
  );
}
