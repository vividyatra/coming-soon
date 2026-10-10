import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/content";
import { routes } from "@/data/site";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";

export function LatestBlogs({ posts }: { posts: BlogPost[] }) {
  return (
    <section aria-labelledby="blogs-title" className="pt-12 md:pt-16 lg:pt-[72px]">
      <div className="container-site">
        <SectionHeading
          eyebrow="Travel Planning Tips"
          title="Good to Know Before You Go"
          subtitle="Practical pointers we share with travellers while planning their trips."
          align="left"
          titleId="blogs-title"
          action={<TextLink href={routes.contact}>Talk to a Specialist</TextLink>}
        />

        <div className="mt-2 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3 2xl:gap-x-[30px]">
          {posts.map((post) => {
            return (
              <article key={post.slug} className="group flex flex-col">
                <div className="relative block aspect-[1.5] overflow-hidden rounded-[14px] bg-[linear-gradient(150deg,#c3ccd0,#95a28d)] sm:aspect-[1.35]" aria-hidden="true">
                  <Image
                    src={post.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 992px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-white/92 px-3 py-1.5 text-xs font-medium text-olive-dark backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>

                {post.date || post.readTime ? (
                  <p className="mt-4 flex items-center gap-3 text-[13px] text-muted">
                    {post.date ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Icon name="calendar" className="size-4 text-olive" />
                        <time>{post.date}</time>
                      </span>
                    ) : null}
                    {post.date && post.readTime ? <span className="size-1 rounded-full bg-line" aria-hidden="true" /> : null}
                    {post.readTime ? <span>{post.readTime}</span> : null}
                  </p>
                ) : null}
                <h3 className="mt-4 text-[17.5px] leading-[1.3] font-semibold text-ink md:text-[19px] 2xl:text-[21px]">
                  {post.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.65] text-subtle md:text-[15px]">{post.excerpt}</p>
                <Link
                  href={routes.contact}
                  aria-label={`Ask a travel expert about: ${post.title}`}
                  className="mt-4 inline-flex items-center gap-2 self-start border-b border-[#B7B3A2] pb-0.5 text-[14px] font-medium text-ink transition-colors hover:border-olive hover:text-olive"
                >
                  Ask a Travel Expert
                  <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
