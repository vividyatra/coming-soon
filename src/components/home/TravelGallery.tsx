"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { GalleryItem } from "@/types/content";
import { routes } from "@/data/site";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { FilterTabs } from "@/components/shared/FilterTabs";

const shapeClass: Record<GalleryItem["shape"], string> = {
  tall: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[4/3]",
};

export function TravelGallery({ categories, items }: { categories: string[]; items: GalleryItem[] }) {
  const [active, setActive] = useState(categories[0] ?? "All");
  const visible = useMemo(() => (active === "All" ? items : items.filter((item) => item.category === active)), [active, items]);

  return (
    <section aria-labelledby="gallery-title" className="pt-14 md:pt-[72px] lg:pt-[84px]">
      <div className="container-site">
        <SectionHeading
          eyebrow="Moments From The Road"
          title="Travel Gallery"
          subtitle="A curated collection of photographs from journeys planned by Vivid Yatra."
          titleId="gallery-title"
        />

        <FilterTabs options={categories} active={active} onChange={setActive} label="Filter gallery" />

        <ul className="masonry mt-8" aria-live="polite">
          {visible.map((item) => (
            <li key={item.id} className="mb-3 break-inside-avoid animate-step-in sm:mb-[18px]">
              <figure className={cn("group relative overflow-hidden rounded-[14px] bg-[linear-gradient(150deg,#c3ccd0,#95a28d)]", shapeClass[item.shape])}>
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1281px) 25vw, (min-width: 992px) 33vw, (min-width: 576px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 lg:translate-y-2 bg-[linear-gradient(to_top,rgba(15,18,10,.8),rgba(15,18,10,0))] px-3 pt-8 pb-3 opacity-100 sm:px-4 sm:pt-10 sm:pb-4 transition-all duration-300 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                  <span className="block font-serif text-[14px] leading-tight font-semibold text-white sm:text-[17px]">{item.caption}</span>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-white/85 sm:text-[12.5px]">
                    <Icon name="pin" className="size-3.5" />
                    {item.location}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-center">
          <TextLink href={routes.gallery}>View Full Gallery</TextLink>
        </div>
      </div>
    </section>
  );
}
