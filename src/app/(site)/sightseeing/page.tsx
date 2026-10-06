import type { Metadata } from "next";
import { getBlogs, getDestinations, getSightseeing } from "@/lib/catalog";
import type { SightseeingCategory } from "@/types/catalog";
import type { IconName } from "@/components/ui/Icon";
import { routes } from "@/data/site";
import { india } from "@/data/catalog/media";
import { PageHero } from "@/components/templates/PageHero";
import { Section } from "@/components/templates/Section";
import { FaqAccordion } from "@/components/templates/FaqAccordion";
import { CtaBanner } from "@/components/templates/CtaBanner";
import { SightExplorer } from "@/components/sightseeing/SightExplorer";
import { CategoryTiles, ExperienceCards, PhotoTiles } from "@/components/sightseeing/SightListingSections";
import { BentoGrid } from "@/components/shared/BentoGrid";
import { BlogCard } from "@/components/cards/BlogCard";
import { TextLink } from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: "Sightseeing & Attractions | Vivid Yatra",
};

const CATEGORY_ICONS: Record<SightseeingCategory, IconName> = {
  Heritage: "culture",
  Spiritual: "spiritual",
  Nature: "relaxation",
  Adventure: "adventure",
  "Culture & Food": "food",
  Landmarks: "camera",
};

const faqs = [
  { question: "Are entry tickets included in your packages?", answer: "Monument entry fees are usually excluded so you only pay for what you visit, but we can include them on request." },
  { question: "Can I book a guide for a single attraction?", answer: "Yes — we arrange licensed local guides for half-day and full-day sightseeing in every destination we cover." },
  { question: "What is the best time of day for sightseeing?", answer: "Early mornings are cooler and less crowded. Many forts and palaces open around 8–9 AM." },
];

type SearchParams = Promise<{ q?: string; destination?: string; category?: string }>;

export default async function SightseeingPage({ searchParams }: { searchParams: SearchParams }) {
  const [params, sights, destinations, blogs] = await Promise.all([searchParams, getSightseeing(), getDestinations(), getBlogs()]);

  const withSights = destinations.filter((d) => sights.some((s) => s.destinationSlug === d.slug));
  const destinationOptions = withSights.map((d) => ({ label: d.name, value: d.slug }));
  const categories = [...new Set(sights.map((s) => s.category))];
  const nameOf = (slug: string) => destinations.find((d) => d.slug === slug)?.name ?? "";

  const experiences = sights
    .flatMap((s) => s.experiences.map((e) => ({ ...e, where: s.name, href: `${routes.sightseeing}/${s.slug}` })))
    .slice(0, 6);

  return (
    <>
      {/* Hero */}
      <PageHero
        image={india("varanasi-aarti", "Ganga aarti in Varanasi")}
        breadcrumbs={[{ label: "Home", href: routes.home }, { label: "Sightseeing" }]}
        script="Must-See Places"
        title="Sightseeing & Attractions"
        subtitle="Forts, temples, lakes and landmarks — with timings, tickets and insider tips for every stop."
      />

      <SightExplorer key={JSON.stringify(params)} sights={sights} destinations={destinationOptions} categories={categories} initial={params}>
        {/* Popular Experiences */}
        <Section id="experiences" eyebrow="Popular Experiences" title="Moments Travellers Love" subtitle="Signature experiences you can add to any trip.">
          <ExperienceCards items={experiences} />
        </Section>

        {/* Explore by Destination */}
        <Section id="by-destination" eyebrow="Explore by Destination" title="Where do you want to explore?">
          <PhotoTiles
            items={withSights.map((d) => ({
              href: `${routes.sightseeing}?destination=${d.slug}#attractions`,
              image: d.image,
              title: d.name,
              meta: `${sights.filter((s) => s.destinationSlug === d.slug).length} attractions`,
            }))}
          />
        </Section>

        {/* Explore by Category */}
        <Section id="by-category" eyebrow="Explore by Category" title="What kind of place?">
          <CategoryTiles
            items={categories.map((c) => ({
              href: `${routes.sightseeing}?category=${encodeURIComponent(c)}#attractions`,
              icon: CATEGORY_ICONS[c as SightseeingCategory] ?? "pin",
              title: c,
              count: sights.filter((s) => s.category === c).length,
            }))}
          />
        </Section>

        {/* Featured Sightseeing */}
        <Section id="featured" eyebrow="Editor’s Picks" title="Featured Sightseeing" align="left" action={<TextLink href="#attractions">See all attractions</TextLink>}>
          <BentoGrid
            items={sights
              .filter((s) => s.featured)
              .map((s) => ({ href: `${routes.sightseeing}/${s.slug}`, image: s.image, chip: `${nameOf(s.destinationSlug)}, ${s.location.state}`, title: s.name, text: s.shortDescription, cta: "Explore" }))}
          />
        </Section>
      </SightExplorer>

      {/* Travel Inspiration */}
      <Section id="inspiration" eyebrow="Travel Inspiration" title="Guides to Help You Plan" align="left" action={<TextLink href={routes.blogs}>Read the blog</TextLink>}>
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {blogs.slice(0, 3).map((b) => (
            <BlogCard key={b.slug} post={b} />
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" eyebrow="Good To Know" title="Sightseeing FAQs" width="narrow">
        <FaqAccordion faqs={faqs} name="sightseeing-faq" />
      </Section>

      {/* CTA */}
      <CtaBanner script="Want it all planned?" titleLines={["Add these experiences", "to your perfect trip"]} />
    </>
  );
}
