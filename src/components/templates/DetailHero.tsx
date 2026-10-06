import Image from "next/image";
import type { ReactNode } from "react";
import type { Media } from "@/types/content";
import { TornEdge } from "@/components/ui/Decorations";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

type Props = {
  image: Media;
  breadcrumbs: Crumb[];
  eyebrow?: string;
  title: string;
  subtitle?: string;
  meta?: { icon: IconName; label: string }[];
  actions?: ReactNode;
  /** small overlay chips on the image (e.g. badge, category) */
  chips?: string[];
};

/** Tall photo hero for detail templates (destination, package, sightseeing, offer). */
export function DetailHero({ image, breadcrumbs, eyebrow, title, subtitle, meta, actions, chips }: Props) {
  return (
    <section className="relative flex min-h-[520px] items-end overflow-hidden md:min-h-[560px] lg:min-h-[620px]">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(140deg,#cfd7d9,#97a48f)] after:absolute after:inset-0 after:bg-[linear-gradient(to_top,rgba(18,22,12,.86)_0%,rgba(18,22,12,.5)_45%,rgba(18,22,12,.2)_75%,rgba(18,22,12,.35)_100%)]">
        <Image src={image.src} alt={image.alt} fill preload sizes="100vw" className="object-cover" />
      </div>

      <div className="container-site relative z-[2] pt-28 pb-20 md:pb-24 lg:pb-[108px]">
        <Breadcrumbs items={breadcrumbs} className="mb-5" />
        {chips?.length ? (
          <ul className="mb-4 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li key={chip} className="rounded-full bg-white/18 px-3 py-1.5 text-[12px] font-medium tracking-[.4px] text-white backdrop-blur-sm">
                {chip}
              </li>
            ))}
          </ul>
        ) : null}
        {eyebrow ? <p className="font-script text-[30px] leading-none text-[#F2EFE0] md:text-[40px]">{eyebrow}</p> : null}
        <h1 className="mt-2 max-w-[880px] text-[30px] leading-[1.12] font-semibold text-white sm:text-[36px] md:text-[46px] lg:text-[54px] 2xl:text-[60px]">{title}</h1>
        {subtitle ? <p className="mt-3.5 max-w-[640px] text-base leading-[1.7] font-light text-white/90 md:text-lg">{subtitle}</p> : null}
        {meta?.length ? (
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {meta.map((m) => (
              <li key={m.label} className="inline-flex items-center gap-2 text-[14.5px] text-white">
                <span className="flex size-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                  <Icon name={m.icon} className="size-4" />
                </span>
                {m.label}
              </li>
            ))}
          </ul>
        ) : null}
        {actions ? <div className="mt-7 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center">{actions}</div> : null}
      </div>

      <TornEdge fill="#F7F4ED" stroke="#EDE9DB" className="absolute inset-x-0 -bottom-px z-[3] h-[34px] md:h-12 lg:h-[62px]" />
    </section>
  );
}
