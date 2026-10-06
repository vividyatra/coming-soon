import Image from "next/image";
import type { ContentBlock } from "@/types/catalog";
import { Icon } from "@/components/ui/Icon";

/** Renders structured article content (CMS blocks) with the site's editorial typography. */
export function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="text-[16.5px] leading-[1.85] text-body md:text-[17px]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} id={block.id} className="mt-11 mb-4 scroll-mt-24 text-[24px] leading-[1.25] font-semibold text-ink first:mt-0 md:text-[28px]">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-8 mb-3 text-[20px] font-semibold text-ink">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="mt-4 first:mt-0">
                {block.text}
              </p>
            );
          case "list": {
            const Tag = block.ordered ? "ol" : "ul";
            return (
              <Tag key={i} className="mt-5 space-y-2.5">
                {block.items.map((item, n) => (
                  <li key={item} className="flex items-start gap-3">
                    {block.ordered ? (
                      <span className="mt-0.5 flex size-7 flex-none items-center justify-center rounded-full bg-olive font-serif text-[14px] font-semibold text-white">{n + 1}</span>
                    ) : (
                      <span className="mt-[11px] size-2 flex-none rounded-full bg-olive" />
                    )}
                    <span>{item}</span>
                  </li>
                ))}
              </Tag>
            );
          }
          case "image":
            return (
              <figure key={i} className="my-8">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[14px] bg-cream-2">
                  <Image src={block.image.src} alt={block.image.alt} fill sizes="(min-width: 992px) 720px, 100vw" className="object-cover" />
                </div>
                {block.caption ? <figcaption className="mt-2.5 text-center text-[13.5px] text-muted italic">{block.caption}</figcaption> : null}
              </figure>
            );
          case "quote":
            return (
              <blockquote key={i} className="relative my-9 rounded-[14px] bg-sand px-7 py-7 md:px-10">
                <Icon name="quote" className="absolute top-5 left-5 size-8 text-olive/20" />
                <p className="relative font-serif text-[21px] leading-[1.5] text-ink italic md:text-[23px]">{block.text}</p>
                {block.cite ? <cite className="mt-3 block text-[14px] font-semibold text-olive not-italic">— {block.cite}</cite> : null}
              </blockquote>
            );
          case "tip":
            return (
              <aside key={i} className="my-7 flex gap-4 rounded-[14px] border border-dashed border-olive/50 bg-cream-2/60 p-5">
                <span className="flex size-10 flex-none items-center justify-center rounded-full bg-olive text-white">
                  <Icon name="sparkle" className="size-5" />
                </span>
                <div>
                  <p className="text-[15px] font-semibold text-ink">{block.title}</p>
                  <p className="mt-1 text-[15px] leading-[1.7]">{block.text}</p>
                </div>
              </aside>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
