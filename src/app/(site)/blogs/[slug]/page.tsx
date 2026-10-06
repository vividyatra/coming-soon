import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlog, getBlogSlugs, getDestinations, getPackagesBySlugs, getRelatedBlogs } from "@/lib/catalog";
import { routes } from "@/data/site";
import type { ContentBlock } from "@/types/catalog";
import { Icon } from "@/components/ui/Icon";
import { TextLink } from "@/components/ui/TextLink";
import { Breadcrumbs } from "@/components/templates/Breadcrumbs";
import { FaqAccordion } from "@/components/templates/FaqAccordion";
import { Section } from "@/components/templates/Section";
import { CtaBanner } from "@/components/templates/CtaBanner";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { ShareButtons } from "@/components/shared/ShareButtons";
import { BlogCard } from "@/components/cards/BlogCard";
import { PackageCard } from "@/components/cards/PackageCard";
import { DestinationCard } from "@/components/cards/DestinationCard";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return (await getBlogSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const b = await getBlog((await params).slug);
  return { title: b ? `${b.title} | Vivid Yatra Blog` : "Article not found | Vivid Yatra" };
}

export default async function BlogDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post) notFound();

  const [related, allDestinations, packages] = await Promise.all([getRelatedBlogs(slug), getDestinations(), getPackagesBySlugs(post.packageSlugs)]);
  const destinations = allDestinations.filter((d) => post.destinationSlugs.includes(d.slug));
  const toc = post.content.filter((b): b is Extract<ContentBlock, { type: "h2" }> => b.type === "h2");

  const tocList = (
    <ol className="space-y-1">
      {toc.map((h, i) => (
        <li key={h.id}>
          <a href={`#${h.id}`} className="flex gap-2.5 rounded-lg px-2.5 py-2 text-[14px] leading-[1.45] text-ink-soft transition-colors hover:bg-cream-2 hover:text-olive">
            <span className="font-serif font-semibold text-olive">{i + 1}.</span>
            {h.text}
          </a>
        </li>
      ))}
      {post.faqs.length ? (
        <li>
          <a href="#faqs" className="flex gap-2.5 rounded-lg px-2.5 py-2 text-[14px] text-ink-soft transition-colors hover:bg-cream-2 hover:text-olive">
            <span className="font-serif font-semibold text-olive">{toc.length + 1}.</span>
            FAQs
          </a>
        </li>
      ) : null}
    </ol>
  );

  return (
    <>
      {/* Article header */}
      <header className="pt-8 md:pt-12">
        <div className="container-narrow">
          <Breadcrumbs tone="dark" items={[{ label: "Home", href: routes.home }, { label: "Blog", href: routes.blogs }, { label: post.category, href: `${routes.blogs}?category=${encodeURIComponent(post.category)}#latest` }, { label: post.title }]} />
          <Link href={`${routes.blogs}?category=${encodeURIComponent(post.category)}#latest`} className="mt-6 inline-flex rounded-full bg-olive/10 px-3.5 py-1.5 text-[12.5px] font-semibold tracking-[.4px] text-olive-dark hover:bg-olive/20">
            {post.category}
          </Link>
          <h1 className="mt-4 text-[30px] leading-[1.18] font-semibold text-ink sm:text-[36px] md:text-[44px] lg:text-[50px]">{post.title}</h1>
          <p className="mt-4 text-[17px] leading-[1.7] text-body md:text-[19px]">{post.excerpt}</p>
          <div className="mt-6 flex flex-col gap-4 border-y border-line-soft py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="relative size-12 overflow-hidden rounded-full bg-cream-2">
                <Image src={post.author.avatar.src} alt={post.author.avatar.alt} fill sizes="48px" className="object-cover" />
              </span>
              <span>
                <span className="block text-[15px] font-semibold text-ink">{post.author.name}</span>
                <span className="flex flex-wrap items-center gap-x-2 text-[13px] text-muted">
                  <span>{post.author.role}</span>
                  <span className="size-1 rounded-full bg-line" aria-hidden="true" />
                  <time>{post.date}</time>
                  <span className="size-1 rounded-full bg-line" aria-hidden="true" />
                  <span>{post.readTime}</span>
                </span>
              </span>
            </div>
            <ShareButtons title={post.title} />
          </div>
        </div>
        {/* Featured image */}
        <div className="container-site mt-8">
          <div className="relative mx-auto aspect-[16/9] max-w-[1180px] overflow-hidden rounded-[18px] bg-cream-2 md:aspect-[21/9]">
            <Image src={post.image.src} alt={post.image.alt} fill preload sizes="(min-width: 1200px) 1180px, 100vw" className="object-cover" />
          </div>
        </div>
      </header>

      {/* Body: TOC + content */}
      <div className="container-site mt-10 grid gap-10 md:mt-14 lg:grid-cols-[260px_minmax(0,720px)] lg:justify-center lg:gap-14 2xl:grid-cols-[280px_minmax(0,760px)]">
        <aside className="lg:order-first">
          <div className="lg:sticky lg:top-6 lg:space-y-6">
            {/* mobile TOC */}
            <details className="faq-item group rounded-[14px] border border-line-soft bg-white shadow-tile lg:hidden">
              <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-[15px] font-semibold text-ink">
                <span className="inline-flex items-center gap-2">
                  <Icon name="list" className="size-5 text-olive" />
                  Table of contents
                </span>
                <Icon name="chevronDown" className="size-5 text-olive transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-line-soft px-3 py-3">{tocList}</div>
            </details>
            {/* desktop TOC */}
            <nav aria-label="Table of contents" className="hidden rounded-[14px] border border-line-soft bg-white p-4 shadow-tile lg:block">
              <p className="mb-2 inline-flex items-center gap-2 px-2.5 text-[13px] font-semibold tracking-[.8px] text-ink uppercase">
                <Icon name="list" className="size-4 text-olive" />
                In this article
              </p>
              {tocList}
            </nav>
            <div className="hidden rounded-[14px] border border-line-soft bg-white p-4 shadow-tile lg:block">
              <ShareButtons title={post.title} />
            </div>
          </div>
        </aside>

        <article className="min-w-0">
          {/* Key Takeaways */}
          <div className="mb-10 rounded-[14px] bg-moss px-6 py-6 text-white md:px-8">
            <p className="inline-flex items-center gap-2 font-serif text-[20px] font-semibold text-white">
              <Icon name="sparkle" className="size-5" />
              Key takeaways
            </p>
            <ul className="mt-4 space-y-2.5">
              {post.keyTakeaways.map((k) => (
                <li key={k} className="flex items-start gap-3 text-[15px] leading-[1.6] text-white/90">
                  <Icon name="check" className="mt-1 size-4 flex-none text-[#F2EFE0]" />
                  {k}
                </li>
              ))}
            </ul>
          </div>

          {/* Article Content */}
          <ArticleBody blocks={post.content} />

          {/* FAQ */}
          {post.faqs.length ? (
            <section id="faqs" className="mt-12 scroll-mt-24">
              <h2 className="mb-5 text-[24px] font-semibold text-ink md:text-[28px]">Frequently asked questions</h2>
              <FaqAccordion faqs={post.faqs} name={`faq-${post.slug}`} />
            </section>
          ) : null}

          {/* Share + author */}
          <div className="mt-12 flex flex-col gap-5 border-t border-line-soft pt-8">
            <ShareButtons title={post.title} />
            <div className="flex gap-4 rounded-[14px] bg-sand p-5 md:p-6">
              <span className="relative size-16 flex-none overflow-hidden rounded-full bg-cream-2">
                <Image src={post.author.avatar.src} alt={post.author.avatar.alt} fill sizes="64px" className="object-cover" />
              </span>
              <div>
                <p className="text-[12.5px] font-medium tracking-[.6px] text-muted uppercase">Written by</p>
                <p className="text-[17px] font-semibold text-ink">
                  {post.author.name} <span className="text-[14px] font-normal text-muted">· {post.author.role}</span>
                </p>
                <p className="mt-1.5 text-[14.5px] leading-[1.65] text-body">{post.author.bio}</p>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Related Destinations */}
      {destinations.length ? (
        <Section id="related-destinations" eyebrow="Related Destinations" title="Destinations in this article" align="left" action={<TextLink href={routes.destinations}>All destinations</TextLink>}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.slice(0, 4).map((d) => (
              <DestinationCard key={d.slug} destination={d} />
            ))}
          </div>
        </Section>
      ) : null}

      {/* Related Packages */}
      {packages.length ? (
        <Section id="related-packages" eyebrow="Related Packages" title="Turn this guide into a trip" align="left" action={<TextLink href={routes.packages}>All packages</TextLink>}>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {packages.slice(0, 3).map((p) => (
              <PackageCard key={p.slug} pkg={p} />
            ))}
          </div>
        </Section>
      ) : null}

      {/* Related Articles */}
      <Section id="related-articles" eyebrow="Keep Reading" title="Related Articles" align="left" action={<TextLink href={routes.blogs}>All articles</TextLink>}>
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {related.map((b) => (
            <BlogCard key={b.slug} post={b} />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <CtaBanner script="Inspired?" titleLines={["Let’s turn this story", "into your next trip"]} />
    </>
  );
}
