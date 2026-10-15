"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { isUpcomingTripActive, upcomingTrip as trip, upcomingTripWhatsappHref } from "@/data/upcomingTrip";
import { BaseIcon as Icon } from "@/components/ui/iconsBase";

const STORAGE_KEY = "vy-upcoming-trip-dismissed";
const DELAY_MS = 1800;

export function UpcomingTripPopup() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isUpcomingTripActive()) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* storage blocked - still show once */
    }
    const t = window.setTimeout(() => {
      lastFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    }, DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    lastFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  /* Custom 1px scroll indicator (native scrollbar is hidden via .vy-thin-scroll). */
  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!el || !track || !thumb) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const overflow = scrollHeight - clientHeight > 1;
      track.style.display = overflow ? "block" : "none";
      if (!overflow) return;
      const h = Math.max(24, (clientHeight / scrollHeight) * clientHeight);
      const top = (scrollTop / (scrollHeight - clientHeight)) * (clientHeight - h);
      thumb.style.height = `${h}px`;
      thumb.style.transform = `translateY(${top}px)`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    el.addEventListener("scroll", schedule, { passive: true });
    const ro = new ResizeObserver(schedule);
    ro.observe(el);
    Array.from(el.children).forEach((child) => ro.observe(child));
    return () => {
      el.removeEventListener("scroll", schedule);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-3 pt-[calc(12px+env(safe-area-inset-top))] xs:px-4 xs:pb-4 sm:items-center sm:p-6" id="upcoming-trip-popup">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]" aria-hidden="true" onClick={close} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="upcoming-trip-title"
        aria-describedby="upcoming-trip-desc"
        className="relative flex max-h-[calc(100dvh-24px-env(safe-area-inset-top))] w-full sm:max-h-[90vh] max-w-[474px] min-w-0 flex-col overflow-hidden rounded-2xl bg-cream text-ink shadow-2xl"
      >
        {/* Close stays fixed at the card corner; only the inner area scrolls. */}
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 grid size-9 place-items-center rounded-full bg-white/95 text-ink shadow transition-colors hover:bg-white hover:text-olive"
        >
          <Icon name="close" className="size-4" />
        </button>

        <div ref={trackRef} aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-px bg-olive/10">
          <div ref={thumbRef} className="w-px bg-olive will-change-transform" />
        </div>

        <div ref={scrollRef} className="vy-thin-scroll overflow-y-auto overflow-x-hidden overscroll-contain">
          {trip.image ? (
            <div className="relative aspect-[16/9] max-h-[260px] w-full">
              <Image src={trip.image.src} alt={trip.image.alt} fill sizes="(min-width: 474px) 474px, 100vw" className="object-cover" />
              <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-ink/75 to-transparent p-4 pb-10 pr-14 text-white">
                <p className="font-script text-[24px] leading-none">{trip.tagline}</p>
              </div>
              <div className="absolute bottom-3 left-3 max-w-[calc(100%-24px)] rounded-xl bg-white/95 p-2.5 shadow-lg sm:bottom-4 sm:left-4 sm:p-3.5">
                {trip.earlyBird.enabled ? (
                  <p className="inline-block rounded-full bg-olive px-2.5 py-0.5 text-[11px] font-medium text-white sm:text-[12px]">{trip.earlyBird.text}</p>
                ) : null}
                <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2 text-ink">
                  <span className="font-serif text-[24px] font-semibold leading-none text-olive sm:text-[30px]">{trip.priceLabel}</span>
                  <span className="text-[12.5px] text-ink/70 sm:text-[14px]">{trip.priceNote}</span>
                  {trip.originalPriceLabel ? (
                    <del className="text-[14px] text-ink/50 sm:text-[16px]" aria-label={`Original price ${trip.originalPriceLabel}`}>
                      {trip.originalPriceLabel}
                    </del>
                  ) : null}
                </p>
              </div>
            </div>
          ) : null}

          <div className="min-w-0 px-4 py-5 xs:px-5 sm:p-7">
            <p className="font-script text-[22px] leading-none text-olive">Upcoming trip</p>
            <h2 id="upcoming-trip-title" className="mt-2 pr-8 font-serif text-[24px] leading-tight sm:text-[28px]">
              {trip.title}
            </h2>
            <p className="mt-1.5 text-[13px] text-ink/70">{trip.theme.join(" | ")}</p>

            <div id="upcoming-trip-desc" className="mt-4 grid grid-cols-1 gap-1.5 text-[14.5px] xs:grid-cols-2">
              <p className="flex items-center gap-2">
                <Icon name="calendar" className="size-[18px] shrink-0 text-olive" />
                <span>{trip.dateLabel}</span>
              </p>
              <p className="flex items-center gap-2">
                <Icon name="star" className="size-[18px] shrink-0 text-olive" />
                <span>{trip.duration}</span>
              </p>
              <p className="flex items-center gap-2 xs:col-span-2">
                <Icon name="pin" className="size-[18px] shrink-0 text-olive" />
                <span>Boarding point: {trip.boardingPoint}</span>
              </p>
            </div>

            {trip.trustPoints.length > 0 && (
            <ul className="mt-5 grid grid-cols-1 gap-1.5 border-t border-line pt-4 text-[13px] text-ink/80 xs:grid-cols-2">
              {trip.trustPoints.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Icon name="star" className="mt-0.5 size-3.5 shrink-0 text-olive" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            )}

            <div className="mt-6">
              <a
                href={upcomingTripWhatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="inline-flex h-12 w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-lg bg-olive px-[22px] text-[14.5px] font-medium leading-none tracking-[.2px] text-white transition-colors duration-[250ms] hover:bg-olive-dark"
              >
                <Icon name="whatsapp" className="size-5 flex-none" />
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
