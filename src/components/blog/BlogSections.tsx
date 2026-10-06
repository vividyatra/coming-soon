import Image from "next/image";
import type { blogCta as CtaData } from "@/data/blog";
import { ButtonLink } from "@/components/ui/Button";

/* ------------------------------------------------------------------
   CTA BAND — "Let's Plan Your Next Unforgettable Journey"
   ------------------------------------------------------------------ */
export function BlogCta({ cta }: { cta: typeof CtaData }) {
  return (
    <section aria-labelledby="blog-cta-title" className="relative overflow-hidden bg-moss-soft pt-10 pb-9 md:pt-12 md:pb-10 lg:pt-14 lg:pb-[42px]">
      <Image
        src={cta.image.src}
        alt={cta.image.alt}
        aria-hidden="true"
        width={2172}
        height={724}
        sizes="(min-width: 992px) 64vw, 100vw"
        className="pointer-events-none absolute right-0 bottom-0 z-0 h-full w-full object-cover object-right opacity-60 md:w-[80%] md:opacity-85 lg:w-[64%] lg:opacity-10"
      />
      <div className="container-site relative z-[2]">
        <h2 id="blog-cta-title" className="text-[23px] leading-[1.4] font-semibold text-white sm:text-[26px] md:text-[32px] md:leading-[1.45] lg:pl-[30px] 2xl:pl-[60px] 2xl:text-4xl">
          {cta.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <ButtonLink
          href={cta.cta.href}
          variant="light"
          className="mt-[22px] h-[46px] px-6 text-[14.5px] md:mt-7 md:h-[50px] md:px-7 md:text-[15px] lg:ml-[30px] 2xl:ml-[60px]"
        >
          {cta.cta.label}
        </ButtonLink>
      </div>
    </section>
  );
}
