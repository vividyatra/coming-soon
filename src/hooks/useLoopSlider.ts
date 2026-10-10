"use client";

import { useCallback, useLayoutEffect, useRef, useState, type TouchEvent } from "react";

const DURATION = 450;

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Continuous-loop slider from the original site, made React-safe:
 * the item order lives in state and the track transform is reset in the
 * same frame the order changes, so there is never a visible jump.
 *
 * The list is duplicated once so a card is always waiting off-stage.
 * `order` holds indices into that doubled list; `index % count` is the
 * source item and `index >= count` marks the (aria-hidden) clone.
 */
export function useLoopSlider(count: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);
  const pending = useRef<"next" | "prev" | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const [order, setOrder] = useState(() => Array.from({ length: count * 2 }, (_, i) => i));

  const step = () => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return first.getBoundingClientRect().width + gap;
  };

  const next = useCallback(() => {
    const track = trackRef.current;
    if (!track || animating.current) return;
    animating.current = true;
    const d = reducedMotion() ? 0 : DURATION;
    track.style.transition = `transform ${d}ms ease`;
    track.style.transform = `translateX(-${step()}px)`;
    window.setTimeout(() => {
      pending.current = "next";
      setOrder((o) => [...o.slice(1), o[0]]);
    }, d);
  }, []);

  const prev = useCallback(() => {
    if (!trackRef.current || animating.current) return;
    animating.current = true;
    pending.current = "prev";
    setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || !pending.current) return;
    const d = reducedMotion() ? 0 : DURATION;
    track.style.transition = "none";
    if (pending.current === "next") {
      track.style.transform = "translateX(0)";
      void track.offsetWidth;
      animating.current = false;
    } else {
      track.style.transform = `translateX(-${step()}px)`;
      void track.offsetWidth;
      track.style.transition = `transform ${d}ms ease`;
      track.style.transform = "translateX(0)";
      window.setTimeout(() => (animating.current = false), d);
    }
    pending.current = null;
  }, [order]);

  /** spread on the overflow-hidden viewport for swipe support */
  const swipeHandlers = {
    onTouchStart: (e: TouchEvent) => {
      touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    },
    onTouchEnd: (e: TouchEvent) => {
      const start = touch.current;
      touch.current = null;
      if (!start) return;
      const dx = e.changedTouches[0].clientX - start.x;
      const dy = e.changedTouches[0].clientY - start.y;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? next : prev)();
    },
  };

  return { trackRef, order, next, prev, swipeHandlers };
}
