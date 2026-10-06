import type { Metadata } from "next";
import { getGalleryPhotos } from "@/lib/catalog";
import { routes } from "@/data/site";
import { india } from "@/data/catalog/media";
import { PageHero } from "@/components/templates/PageHero";
import { Section } from "@/components/templates/Section";
import { CtaBanner } from "@/components/templates/CtaBanner";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { BentoGrid } from "@/components/shared/BentoGrid";

export const metadata: Metadata = {
  title: "Travel Gallery | Vivid Yatra",
};

type SearchParams = Promise<{ category?: string }>;

export default async function GalleryPage({ searchParams }: { searchParams: SearchParams }) {
  const [params, photos] = await Promise.all([searchParams, getGalleryPhotos()]);
  const featured = ["p2", "p1", "p3", "p4", "p7"].map((id) => photos.find((p) => p.id === id)).filter((p): p is (typeof photos)[number] => Boolean(p));
  const count = (c: string) => photos.filter((p) => p.category === c).length;

  return (
    <>
      {/* Hero */}
      <PageHero
        image={india("agra-taj-gateway", "Taj Mahal framed by its gateway")}
        breadcrumbs={[{ label: "Home", href: routes.home }, { label: "Gallery" }]}
        script="Moments From The Road"
        title="Travel Gallery"
        subtitle="A curated collection of places, experiences and happy moments from journeys planned by Vivid Yatra."
      >
        <ul className="flex flex-wrap gap-3">
          {["Destinations", "Experiences", "Customer Moments"].map((c) => (
            <li key={c}>
              <a href={`${routes.gallery}?category=${encodeURIComponent(c)}#photos`} className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[14px] text-white backdrop-blur-sm hover:bg-white/25">
                {c}
                <span className="rounded-full bg-white/20 px-2 text-[12px]">{count(c)}</span>
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Featured Travel Photos */}
      <Section id="featured" eyebrow="Featured" title="Featured Travel Photos">
        <BentoGrid
          items={featured.map((p) => ({
            href: `${routes.gallery}?category=${encodeURIComponent(p.category)}#photos`,
            image: p.image,
            chip: p.location,
            title: p.caption,
            text: p.category,
            cta: `More ${p.category.toLowerCase()}`,
          }))}
        />
      </Section>

      {/* Destinations · Experiences · Customer Travel Moments */}
      <Section id="photos" eyebrow="Browse the Collection" title="Destinations, Experiences & Customer Moments" subtitle="Tap any photo to view it full screen.">
        <GalleryGrid key={params.category ?? "all"} photos={photos} initialCategory={params.category} />
      </Section>

      {/* CTA */}
      <CtaBanner script="Your moment is next" titleLines={["Let’s create memories", "worth framing"]} primary={{ label: "Plan Your Trip", href: routes.planTrip }} />
    </>
  );
}
