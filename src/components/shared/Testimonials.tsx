"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/types/content";
import { cn } from "@/lib/utils";
import { BaseIcon as Icon } from "@/components/ui/iconsBase";
import { SectionHeading } from "@/components/ui/SectionHeading";

const DELAY = 5000;

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" className={cn("size-4", i < rating ? "text-[#C9A24B]" : "text-[#D6D1C1]")} />
      ))}
    </span>
  );
}

/** Testimonial carousel ported from the original Trip Planner page. */
export function Testimonials({
  items,
  showHeading = true,
  className = "pt-14 md:pt-[72px] lg:pt-[84px]",
}: {
  items: Testimonial[];
  /** the Trip Planner page shows the carousel without a section heading */
  showHeading?: boolean;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const count = items.length;

  const goTo = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  // autoplay — pauses on hover/focus, hidden tab and reduced motion
  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, DELAY);
    return () => window.clearInterval(timer);
  }, [paused, count, index]);

  return (
    <section aria-labelledby={showHeading ? "testimonials-title" : undefined} aria-label={showHeading ? undefined : "What our travellers say"} className={className}>
      <div className="container-site">
        {showHeading ? (
        <SectionHeading
          eyebrow="Traveller Stories"
          title="What Our Travellers Say"
          subtitle="Real journeys, real memories — shared by the people who travelled with us."
          titleId="testimonials-title"
        />
        ) : null}

        <div
          className="mx-auto max-w-[1080px] rounded-2xl bg-sand px-6 pt-[30px] pb-6 md:rounded-[20px] md:px-[42px] md:pt-[42px] md:pb-[30px] 2xl:px-14 2xl:pt-12 2xl:pb-[34px]"
          aria-roledescription="carousel"
          aria-label="Traveller testimonials"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") goTo(index + 1);
            if (e.key === "ArrowLeft") goTo(index - 1);
          }}
        >
          <div
            className="overflow-hidden"
            onTouchStart={(e) => {
              touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
              setPaused(true);
            }}
            onTouchEnd={(e) => {
              const start = touch.current;
              touch.current = null;
              setPaused(false);
              if (!start) return;
              const dx = e.changedTouches[0].clientX - start.x;
              const dy = e.changedTouches[0].clientY - start.y;
              if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) goTo(dx < 0 ? index + 1 : index - 1);
            }}
          >
            <div className="flex transition-transform duration-[550ms] ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
              {items.map((item, i) => (
                <div
                  key={item.name}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Testimonial ${i + 1} of ${count}`}
                  aria-hidden={i !== index}
                  className="min-w-0 flex-[0_0_100%]"
                >
                  <div className="flex flex-col-reverse items-center gap-7 lg:flex-row lg:justify-between lg:gap-11">
                    <div className="w-full min-w-0 flex-auto">
                      <Stars rating={item.rating} />
                      <p className="mt-4 text-[15.5px] leading-[1.7] text-ink sm:text-[16.5px] lg:max-w-[560px] lg:text-[18.5px] lg:leading-[1.75] 2xl:text-xl">
                        <span className="font-serif text-[26px] leading-none text-[#B4B09B]" aria-hidden="true">
                          &ldquo;
                        </span>
                        {item.quote}
                        <span className="ml-0.5 font-serif text-[26px] leading-none text-[#B4B09B]" aria-hidden="true">
                          &rdquo;
                        </span>
                      </p>
                      <p className="mt-[22px] text-base font-bold text-ink md:mt-[30px] md:text-[17px]">&ndash; {item.name}</p>
                      <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-olive md:text-[14.5px]">
                        <Icon name="pin" className="size-4" />
                        {item.trip}
                      </p>
                      <p className="mt-1 text-sm text-subtle md:text-[14.5px]">{item.tagline}</p>
                    </div>
                    <div className="relative size-[124px] flex-none overflow-hidden rounded-full bg-[linear-gradient(150deg,#c3ccd0,#95a28d)] sm:size-[140px] md:size-40 lg:size-[178px] 2xl:size-[210px]">
                      <Image src={item.photo.src} alt={item.photo.alt} fill sizes="210px" className="object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-[26px] flex items-center justify-center gap-4 md:mt-[34px]">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous testimonial"
              className="flex size-8 items-center justify-center rounded-full border border-[#D6D1C1] text-ink-soft transition-colors hover:border-olive hover:text-olive"
            >
              <Icon name="arrowLeft" className="size-4" />
            </button>
            <div className="flex items-center gap-2.5" role="tablist" aria-label="Choose a testimonial">
              {items.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-[250ms]",
                    i === index ? "w-6 bg-moss" : "w-2 bg-[#D6D1C1] hover:bg-[#B8B2A0]",
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next testimonial"
              className="flex size-8 items-center justify-center rounded-full border border-[#D6D1C1] text-ink-soft transition-colors hover:border-olive hover:text-olive"
            >
              <Icon name="arrowRight" className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
