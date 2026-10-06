import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "@/types/catalog";
import { routes } from "@/data/site";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

type Props = { post: BlogArticle; variant?: "grid" | "row"; className?: string };

/** Blog card — "grid" matches the Home Latest Blogs card; "row" is a compact list item. */
export function BlogCard({ post, variant = "grid", className }: Props) {
  const href = `${routes.blogs}/${post.slug}`;

  if (variant === "row") {
    return (
      <article className={cn("group relative flex items-center gap-4", className)}>
        <div className="relative size-[84px] flex-none overflow-hidden rounded-xl bg-cream-2 sm:size-24">
          <Image src={post.image.src} alt="" fill sizes="96px" className="object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
        </div>
        <div className="min-w-0">
          <p className="text-[11.5px] font-medium tracking-[1.2px] text-eyebrow uppercase">{post.category}</p>
          <h3 className="mt-1 line-clamp-2 text-[15.5px] leading-[1.35] font-semibold text-ink transition-colors group-hover:text-olive">
            <Link href={href} className="after:absolute after:inset-0">
              {post.title}
            </Link>
          </h3>
          <p className="mt-1 text-[12.5px] text-muted">
            {post.date} · {post.readTime}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative aspect-[1.5] overflow-hidden rounded-[14px] bg-[linear-gradient(150deg,#c3ccd0,#95a28d)] sm:aspect-[1.35]">
        <Image
          src={post.image.src}
          alt=""
          fill
          sizes="(min-width: 992px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
        />
        <span className="absolute top-4 left-4 rounded-full bg-white/92 px-3 py-1.5 text-xs font-medium text-olive-dark backdrop-blur-sm">{post.category}</span>
      </div>
      <p className="mt-4 flex items-center gap-3 text-[13px] text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Icon name="calendar" className="size-4 text-olive" />
          <time>{post.date}</time>
        </span>
        <span className="size-1 rounded-full bg-line" aria-hidden="true" />
        <span>{post.readTime}</span>
      </p>
      <h3 className="mt-2 text-[17.5px] leading-[1.3] font-semibold text-ink transition-colors group-hover:text-olive md:text-[19px] 2xl:text-[21px]">
        <Link href={href} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-[14px] leading-[1.65] text-subtle md:text-[15px]">{post.excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-2 self-start border-b border-[#B7B3A2] pb-0.5 text-[14px] font-medium text-ink transition-colors group-hover:border-olive group-hover:text-olive">
        Read More
        <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </article>
  );
}
