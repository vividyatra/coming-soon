import type { Metadata } from "next";
import { getBlogs, getDestinations } from "@/lib/catalog";
import { getBlogPage } from "@/lib/content";
import { routes } from "@/data/site";
import { india } from "@/data/catalog/media";
import { PageHero } from "@/components/templates/PageHero";
import { Section } from "@/components/templates/Section";
import { ArticleExplorer } from "@/components/blog/ArticleExplorer";
import { BlogHeroSearch, CategoryList, FeaturedArticle } from "@/components/blog/BlogListingSections";
import { BlogCta } from "@/components/blog/BlogSections";
import { PhotoTiles } from "@/components/sightseeing/SightListingSections";
import { Newsletter } from "@/components/shared/Newsletter";
import { BlogCard } from "@/components/cards/BlogCard";
import { TextLink } from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: "Travel Blog: Guides, Itineraries & Tips | Vivid Yatra",
};

type SearchParams = Promise<{ q?: string; category?: string; destination?: string; page?: string }>;

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const [params, posts, destinations, legacy] = await Promise.all([searchParams, getBlogs(), getDestinations(), getBlogPage()]);

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const popular = posts.filter((p) => p.popular).slice(0, 4);
  const categories = [...new Set(posts.map((p) => p.category))];
  const categoryCounts = categories.map((name) => ({ name, count: posts.filter((p) => p.category === name).length }));
  const withArticles = destinations.filter((d) => posts.some((p) => p.destinationSlugs.includes(d.slug)));
  const guides = posts.filter((p) => p.category === "Destination Guides" || p.category === "Itineraries").slice(0, 3);
  const tips = posts.filter((p) => p.category === "Travel Tips" || p.category === "Budget Travel").slice(0, 3);

  return (
    <>
      {/* Hero + Search */}
      <PageHero
        image={india("kerala-canoe", "Canoe on a quiet Kerala backwater")}
        breadcrumbs={[{ label: "Home", href: routes.home }, { label: "Blog" }]}
        script="Travel Inspiration"
        title="The Vivid Yatra Journal"
        subtitle="Destination guides, day-by-day itineraries and honest travel tips from people who’ve been there."
        edgeFill="#F7F4ED"
      >
        <BlogHeroSearch defaultValue={params.q} />
      </PageHero>

      {/* Featured Blog */}
      <Section id="featured" eyebrow="Featured Story" title="Editor’s Pick">
        <FeaturedArticle post={featured} />
      </Section>

      {/* Latest Articles (search, categories, pagination) */}
      <ArticleExplorer key={JSON.stringify(params)} posts={posts} categories={categories} destinations={withArticles.map((d) => ({ label: d.name, value: d.slug }))} initial={params} />

      {/* Popular Articles + Categories */}
      <Section id="popular" tone="band">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <p className="eyebrow-dashed inline-flex items-center gap-3 text-xs font-medium tracking-[2.2px] text-eyebrow uppercase before:hidden">Most Read</p>
            <h2 className="mt-1 text-[25px] font-medium text-ink-deep sm:text-[28px] md:text-[32px]">Popular Articles</h2>
            <ol className="mt-6 space-y-5">
              {popular.map((post, i) => (
                <li key={post.slug} className="flex items-center gap-4">
                  <span className="w-7 flex-none font-serif text-[28px] leading-none font-semibold text-olive/40">{String(i + 1).padStart(2, "0")}</span>
                  <BlogCard post={post} variant="row" className="flex-1" />
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="eyebrow-dashed inline-flex items-center gap-3 text-xs font-medium tracking-[2.2px] text-eyebrow uppercase before:hidden">Browse by Topic</p>
            <h2 className="mt-1 text-[25px] font-medium text-ink-deep sm:text-[28px] md:text-[32px]">Categories</h2>
            <div className="mt-6">
              <CategoryList categories={categoryCounts} />
            </div>
          </div>
        </div>
      </Section>

      {/* Destination-based Articles */}
      <Section id="by-destination" eyebrow="Destination-based Articles" title="Read by Destination">
        <PhotoTiles
          items={withArticles.map((d) => ({
            href: `${routes.blogs}?destination=${d.slug}#latest`,
            image: d.image,
            title: d.name,
            meta: `${posts.filter((p) => p.destinationSlugs.includes(d.slug)).length} articles`,
          }))}
        />
      </Section>

      {/* Travel Guides */}
      <Section id="guides" eyebrow="Travel Guides" title="In-depth Destination Guides" align="left" action={<TextLink href={`${routes.blogs}?category=Destination%20Guides#latest`}>All guides</TextLink>}>
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      {/* Travel Tips */}
      <Section id="tips" eyebrow="Travel Tips" title="Smart Tips for Better Trips" align="left" action={<TextLink href={`${routes.blogs}?category=Travel%20Tips#latest`}>All tips</TextLink>}>
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {tips.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      {/* Newsletter / Travel Updates */}
      <Newsletter />

      {/* CTA — the original blog CTA band */}
      <div className="pt-14 md:pt-[72px] lg:pt-[84px]">
        <BlogCta cta={legacy.cta} />
      </div>
    </>
  );
}
