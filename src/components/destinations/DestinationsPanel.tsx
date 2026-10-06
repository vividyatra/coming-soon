"use client";

import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/types/content";
import { routes } from "@/data/site";
import { Icon } from "@/components/ui/Icon";
import { useLoopSlider } from "@/hooks/useLoopSlider";

type Props = { title: string; subtitle: string; items: Destination[] };

/** Green "Popular Destinations" panel with the looping card slider. */
export function DestinationsPanel({ title, subtitle, items }: Props) {
  const { trackRef, order, next, prev, swipeHandlers } = useLoopSlider(items.length);
  const arrowClass =
    "flex size-9 items-center justify-center rounded-full border border-white/45 bg-transparent text-white transition-colors duration-[250ms] hover:border-white hover:bg-white/14 md:size-10";

  return (
    <section id="popular-destinations" aria-labelledby="panel-title" className="scroll-mt-6 pt-[30px] lg:pt-6">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)] md:px-3">
        <div className="rounded-2xl bg-moss px-[22px] pt-[26px] pb-7 lg:rounded-[18px] lg:px-7 lg:pt-8 lg:pb-[34px] 2xl:px-[34px] 2xl:pt-9 2xl:pb-[38px]">
          <div className="mb-5 flex flex-col gap-3.5 sm:flex-row sm:items-start sm:justify-between sm:gap-6 md:mb-[26px]">
            <div>
              <h2 id="panel-title" className="text-[23px] leading-[1.25] font-medium text-white md:text-[26px] 2xl:text-[29px]">
                {title}
              </h2>
              <p className="mt-[5px] text-[13px] font-light text-white/72 md:text-sm">{subtitle}</p>
            </div>
            <div className="flex items-center gap-2.5">
              <button type="button" onClick={prev} aria-label="Previous destinations" className={arrowClass}>
                <Icon name="chevronLeft" className="size-[17px]" />
              </button>
              <button type="button" onClick={next} aria-label="Next destinations" className={arrowClass}>
                <Icon name="chevronRight" className="size-[17px]" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden" {...swipeHandlers}>
            <div ref={trackRef} className="flex touch-pan-y gap-3.5 pb-1 will-change-transform">
              {order.map((index) => {
                const item = items[index % items.length];
                const isClone = index >= items.length;
                return (
                  <Link
                    key={index}
                    href={`${routes.destinations}/${item.slug}`}
                    aria-hidden={isClone || undefined}
                    tabIndex={isClone ? -1 : undefined}
                    className="group relative h-[230px] flex-[0_0_86%] overflow-hidden rounded-xl bg-[linear-gradient(150deg,#b9c2c6,#8d9a86)] xs:flex-[0_0_78%] sm:flex-[0_0_calc((100%-14px)/1.8)] md:h-[250px] md:flex-[0_0_calc((100%-28px)/2.6)] lg:h-[258px] lg:flex-[0_0_calc((100%-42px)/3.6)] xl:h-[270px] xl:flex-[0_0_calc((100%-56px)/4.6)] 2xl:h-[288px]"
                  >
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(min-width: 1151px) 22vw, (min-width: 768px) 38vw, 80vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(15,18,10,.78)_0%,rgba(15,18,10,.38)_45%,rgba(15,18,10,0)_100%)] px-[17px] pt-10 pb-[18px]">
                      <h3 className="pb-[5px] text-lg leading-[1.2] font-semibold text-white md:text-xl">{item.name}</h3>
                      <p className="mt-0.5 text-[13px] leading-[1.35] font-light text-white/86">{item.tagline}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
