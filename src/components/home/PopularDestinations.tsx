"use client";

import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/types/content";
import { routes } from "@/data/site";
import { BaseIcon as Icon } from "@/components/ui/iconsBase";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BotanicalBranch } from "@/components/ui/Decorations";
import { TextLink } from "@/components/ui/TextLink";
import { useLoopSlider } from "@/hooks/useLoopSlider";

/** Popular destinations — continuous-loop slider driven by the arrow buttons (as in the original). */
export function PopularDestinations({ destinations }: { destinations: Destination[] }) {
  const { trackRef, order, next, prev, swipeHandlers } = useLoopSlider(destinations.length);

  return (
    <section aria-labelledby="destinations-title" className="relative z-[2] pt-[30px] md:pt-[34px] lg:pt-[50px]">
      <BotanicalBranch className="absolute -top-[22px] left-3.5 z-0 hidden h-[300px] w-[150px] opacity-55 lg:block" />

      <div className="container-site relative">
        <SectionHeading
          eyebrow="Domestic Travel"
          title="Popular Destinations in India"
          subtitle="From the hills next door to deserts, backwaters and beaches — places we love planning trips to."
          titleId="destinations-title"
          action={
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous destinations"
                className="flex size-10 items-center justify-center rounded-full border border-[#E3DFD3] bg-white text-ink-soft transition-colors duration-[250ms] hover:border-olive hover:text-olive"
              >
                <Icon name="arrowLeft" className="size-[18px]" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next destinations"
                className="flex size-10 items-center justify-center rounded-full bg-olive text-white transition-colors duration-[250ms] hover:bg-olive-dark"
              >
                <Icon name="arrowRight" className="size-[18px]" />
              </button>
            </div>
          }
        />

        <div className="relative overflow-hidden" {...swipeHandlers}>
          <div ref={trackRef} className="flex touch-pan-y gap-3.5 pb-1 will-change-transform">
            {order.map((index) => {
              const destination = destinations[index % destinations.length];
              const isClone = index >= destinations.length;
              return (
                <article
                  key={index}
                  aria-hidden={isClone || undefined}
                  className="group relative h-[230px] flex-[0_0_86%] overflow-hidden rounded-xl bg-[linear-gradient(150deg,#b9c2c6,#8d9a86)] xs:flex-[0_0_78%] sm:flex-[0_0_calc((100%-14px)/2)] md:h-[250px] md:flex-[0_0_calc((100%-28px)/3)] xl:flex-[0_0_calc((100%-42px)/4)] 2xl:flex-[0_0_calc((100%-56px)/5)]"
                >
                  <Image
                    src={destination.image.src}
                    alt={destination.image.alt}
                    fill
                    sizes="(min-width: 1281px) 20vw, (min-width: 768px) 33vw, 80vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2.5 bg-[linear-gradient(to_top,rgba(15,18,10,.82)_0%,rgba(15,18,10,.42)_55%,rgba(15,18,10,0)_100%)] px-[15px] pt-10 pb-4">
                    <div className="min-w-0">
                      <p className="truncate text-[10.5px] font-medium tracking-[1.6px] text-white/75 uppercase">{destination.tagline}</p>
                      <h3 className="mt-1 text-lg leading-[1.2] font-semibold text-white">{destination.name}</h3>
                      <p className="mt-1 line-clamp-2 text-[13px] leading-[1.4] font-light text-white/86">{destination.description}</p>
                    </div>
                    <Link
                      href={routes.contact}
                      aria-label={`Enquire about ${destination.name}`}
                      tabIndex={isClone ? -1 : undefined}
                      className="flex size-[34px] flex-none items-center justify-center rounded-full bg-white text-ink transition-colors duration-[250ms] group-hover:bg-olive group-hover:text-white after:absolute after:inset-0"
                    >
                      <Icon name="arrowRight" className="size-[17px]" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-7 flex justify-center">
          <TextLink href={routes.contact}>Enquire About a Destination</TextLink>
        </div>
      </div>
    </section>
  );
}
