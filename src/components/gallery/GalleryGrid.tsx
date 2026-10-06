"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { GalleryPhoto } from "@/types/catalog";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { FilterTabs } from "@/components/shared/FilterTabs";

const shapeClass: Record<GalleryPhoto["shape"], string> = {
  tall: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[4/3]",
};

/** Filterable masonry gallery with a keyboard-accessible lightbox. */
export function GalleryGrid({ photos, initialCategory }: { photos: GalleryPhoto[]; initialCategory?: string }) {
  const tabs = useMemo(() => ["All", ...new Set(photos.map((p) => p.category))], [photos]);
  const [active, setActive] = useState(tabs.includes(initialCategory ?? "") ? (initialCategory as string) : "All");
  const [open, setOpen] = useState<number | null>(null);
  const visible = active === "All" ? photos : photos.filter((p) => p.category === active);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + visible.length) % visible.length)), [visible.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const current = open === null ? null : visible[open];

  return (
    <>
      <FilterTabs options={tabs} active={active} onChange={setActive} label="Filter photos" />

      <ul className="masonry mt-8" aria-live="polite">
        {visible.map((photo, i) => (
          <li key={photo.id} className="mb-3 break-inside-avoid animate-step-in sm:mb-[18px]">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open photo: ${photo.caption}, ${photo.location}`}
              className={cn("group relative block w-full overflow-hidden rounded-[14px] bg-cream-2 text-left", shapeClass[photo.shape])}
            >
              <Image src={photo.image.src} alt={photo.image.alt} fill sizes="(min-width: 1281px) 25vw, (min-width: 992px) 33vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
              <span className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(15,18,10,.8),rgba(15,18,10,0))] px-3 pt-8 pb-3 transition-all duration-300 sm:px-4 sm:pt-10 sm:pb-4 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                <span className="block font-serif text-[14px] leading-tight font-semibold text-white sm:text-[17px]">{photo.caption}</span>
                <span className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-white/85 sm:text-[12.5px]">
                  <Icon name="pin" className="size-3.5" />
                  {photo.location}
                </span>
              </span>
              <span className="absolute top-3 right-3 hidden size-9 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 transition-opacity group-hover:opacity-100 lg:flex">
                <Icon name="eye" className="size-4" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* lightbox */}
      {current ? (
        <div role="dialog" aria-modal="true" aria-label={current.caption} className="fixed inset-0 z-[60] flex flex-col bg-[#11140c]/95 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4 px-4 py-3 text-white md:px-6">
            <p className="text-[13.5px] text-white/70">
              {open! + 1} / {visible.length}
            </p>
            <button type="button" onClick={close} aria-label="Close" className="flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
              <Icon name="close" className="size-5" />
            </button>
          </div>
          <div className="relative flex-1" onClick={close}>
            <Image src={current.image.src} alt={current.image.alt} fill sizes="100vw" className="object-contain p-2 md:p-6" onClick={(e) => e.stopPropagation()} />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous photo"
              className="absolute top-1/2 left-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white hover:bg-white/25 md:left-6"
            >
              <Icon name="arrowLeft" className="size-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next photo"
              className="absolute top-1/2 right-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white hover:bg-white/25 md:right-6"
            >
              <Icon name="arrowRight" className="size-5" />
            </button>
          </div>
          <div className="px-4 py-4 text-center text-white md:py-5">
            <p className="font-serif text-[20px] font-semibold">{current.caption}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-[13.5px] text-white/75">
              <Icon name="pin" className="size-4" />
              {current.location} · {current.category}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
