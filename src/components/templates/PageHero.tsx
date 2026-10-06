import Image from "next/image";
import type { ReactNode } from "react";
import type { Media } from "@/types/content";
import { cn } from "@/lib/utils";
import { TornEdge } from "@/components/ui/Decorations";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

type Props = {
  title: ReactNode;
  subtitle?: ReactNode;
  /** small script line above the title (Great Vibes), as used across the site */
  script?: string;
  image: Media;
  breadcrumbs?: Crumb[];
  /** search bar / chips rendered under the subtitle */
  children?: ReactNode;
  size?: "md" | "sm";
  align?: "left" | "center";
  /** colour of the section below — matches the torn edge to it */
  edgeFill?: string;
  imagePosition?: string;
};

/**
 * Inner-page hero — the photo hero with dark overlay and torn-paper edge
 * from the original Blog page, reused by every listing template.
 */
export function PageHero({
  title,
  subtitle,
  script,
  image,
  breadcrumbs,
  children,
  size = "md",
  align = "left",
  edgeFill = "#F7F4ED",
  imagePosition = "center 45%",
}: Props) {
  const centered = align === "center";
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(140deg,#cfd7d9,#97a48f)] after:absolute after:inset-0 after:bg-[linear-gradient(100deg,rgba(24,28,16,.62)_0%,rgba(24,28,16,.34)_48%,rgba(24,28,16,.14)_100%)]">
        <Image src={image.src} alt={image.alt} fill preload sizes="100vw" className="object-cover" style={{ objectPosition: imagePosition }} />
      </div>

      <div
        className={cn(
          "container-site relative z-[2]",
          size === "md"
            ? "pt-14 pb-16 md:pt-[84px] md:pb-[84px] lg:pt-[104px] lg:pb-[96px] 2xl:pt-[120px] 2xl:pb-[112px]"
            : "pt-12 pb-14 md:pt-16 md:pb-[72px] lg:pt-[76px] lg:pb-20",
          centered && "text-center",
        )}
      >
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} className={cn("mb-5 md:mb-6", centered && "flex justify-center")} /> : null}
        {script ? <p className="font-script text-[30px] leading-none text-[#F2EFE0] md:text-[38px]">{script}</p> : null}
        <h1
          className={cn(
            "font-semibold text-white",
            size === "md" ? "text-[31px] leading-[1.1] sm:text-4xl md:text-[46px] lg:text-[53px] 2xl:text-[60px]" : "text-[28px] leading-[1.15] sm:text-[32px] md:text-[40px] lg:text-[46px]",
            script && "mt-2",
          )}
        >
          {title}
        </h1>
        {subtitle ? (
          <p className={cn("mt-3 max-w-[620px] text-[16px] leading-[1.7] font-light text-white/92 md:mt-3.5 md:text-[18px] 2xl:text-[19px]", centered && "mx-auto")}>
            {subtitle}
          </p>
        ) : null}
        {children ? <div className="mt-7 md:mt-9">{children}</div> : null}
      </div>

      <TornEdge fill={edgeFill} stroke="#EDE9DB" className="absolute inset-x-0 -bottom-px z-[3] h-[34px] md:h-12 lg:h-[62px]" />
    </section>
  );
}
