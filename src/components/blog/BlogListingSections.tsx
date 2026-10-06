import Image from "next/image";
import Link from "next/link";
import Form from "next/form";
import type { BlogArticle } from "@/types/catalog";
import type { IconName } from "@/components/ui/Icon";
import { routes } from "@/data/site";
import { Icon } from "@/components/ui/Icon";

/* Sections for the Blog listing template. */

/** Hero search — a plain GET form, so it also works without JavaScript. */
export function BlogHeroSearch({ defaultValue }: { defaultValue?: string }) {
  return (
    <Form action={routes.blogs} role="search" className="flex h-12 w-full max-w-[600px] items-center gap-2.5 rounded-[40px] bg-white px-5 shadow-[0_12px_28px_rgba(25,30,12,.16)] sm:h-[52px] md:h-14 md:gap-3 md:px-[26px]">
      <Icon name="search" className="size-[18px] flex-none text-stone sm:size-[21px]" />
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Search travel guides, tips and itineraries"
        aria-label="Search articles"
        className="h-full min-w-0 flex-auto appearance-none border-0 bg-transparent text-[14.5px] text-ink outline-none placeholder:text-stone md:text-[15.5px]"
      />
      <button type="submit" className="hidden h-9 flex-none rounded-full bg-olive px-4 text-[13.5px] font-medium text-white hover:bg-olive-dark sm:inline-flex sm:items-center">
        Search
      </button>
    </Form>
  );
}

/** Large featured article card. */
export function FeaturedArticle({ post }: { post: BlogArticle }) {
  const href = `${routes.blogs}/${post.slug}`;
  return (
    <article className="group relative grid overflow-hidden rounded-[18px] border border-line-soft bg-white shadow-card lg:grid-cols-[1.15fr_1fr]">
      <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px]">
        <Image src={post.image.src} alt={post.image.alt} fill preload sizes="(min-width: 992px) 55vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        <span className="absolute top-4 left-4 rounded-full bg-olive px-3.5 py-1.5 text-[11.5px] font-semibold tracking-[.6px] text-white uppercase">Featured</span>
      </div>
      <div className="flex flex-col justify-center p-6 md:p-9 lg:p-11">
        <p className="text-[12px] font-medium tracking-[1.4px] text-eyebrow uppercase">{post.category}</p>
        <h2 className="mt-3 text-[24px] leading-[1.25] font-semibold text-ink transition-colors group-hover:text-olive md:text-[30px]">
          <Link href={href} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 text-[15.5px] leading-[1.75] text-body">{post.excerpt}</p>
        <div className="mt-6 flex items-center gap-3">
          <span className="relative size-11 overflow-hidden rounded-full bg-cream-2">
            <Image src={post.author.avatar.src} alt="" fill sizes="44px" className="object-cover" />
          </span>
          <span>
            <span className="block text-[14.5px] font-semibold text-ink">{post.author.name}</span>
            <span className="block text-[13px] text-muted">
              {post.date} · {post.readTime}
            </span>
          </span>
        </div>
        <span className="mt-7 inline-flex items-center gap-2 self-start border-b border-[#B7B3A2] pb-0.5 text-[14.5px] font-medium text-ink group-hover:border-olive group-hover:text-olive">
          Read the full guide
          <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

const CATEGORY_ICON: Record<string, IconName> = {
  "Destination Guides": "map",
  "Travel Tips": "info",
  Itineraries: "route",
  "Food & Culture": "food",
  "Spiritual Travel": "spiritual",
  "Budget Travel": "rupee",
};

/** Category cards with article counts. */
export function CategoryList({ categories }: { categories: { name: string; count: number }[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {categories.map((c) => (
        <li key={c.name}>
          <Link
            href={`${routes.blogs}?category=${encodeURIComponent(c.name)}#latest`}
            className="group flex items-center gap-4 rounded-[14px] border border-line-soft bg-white p-4 shadow-tile transition-all hover:-translate-y-0.5 hover:border-olive hover:shadow-card"
          >
            <span className="flex size-11 flex-none items-center justify-center rounded-full bg-cream-2 text-olive transition-colors group-hover:bg-olive group-hover:text-white">
              <Icon name={CATEGORY_ICON[c.name] ?? "bookmark"} className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15.5px] font-semibold text-ink">{c.name}</span>
              <span className="block text-[13px] text-muted">
                {c.count} {c.count === 1 ? "article" : "articles"}
              </span>
            </span>
            <Icon name="arrowRight" className="size-4 text-olive" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
