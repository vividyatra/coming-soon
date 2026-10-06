import Image from "next/image";
import type { destinationsHero as HeroData } from "@/data/destinations";
import { ButtonLink } from "@/components/ui/Button";
import { FlightPath, TornEdge } from "@/components/ui/Decorations";
import { HeroTitle } from "@/components/shared/HeroTitle";
import { StatsCard } from "@/components/shared/StatsCard";

/**
 * Destinations hero — same headline as Home, photo fading in from the right,
 * stats card and a torn-paper edge. Stacks below 992px like the original.
 */
export function DestinationsHero({ hero }: { hero: typeof HeroData }) {
  const buttonClass = "gap-2 px-3.5 text-[13.5px] xs:flex-auto sm:flex-none sm:gap-2.5 sm:px-[22px] sm:text-[14.5px]";

  return (
    <section
      aria-labelledby="destinations-hero-title"
      className="relative flex flex-col px-[var(--gutter)] pt-[34px] md:pt-[42px] lg:block lg:overflow-hidden lg:px-0 lg:pt-[54px] lg:pb-[86px] 2xl:pt-[76px] 2xl:pb-[126px]"
    >
      <div className="dest-hero-mask relative order-2 mt-[26px] h-[200px] overflow-hidden rounded-[14px] bg-[linear-gradient(140deg,#cfd7d9,#97a48f)] sm:h-[240px] md:h-[300px] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:w-[58%] lg:rounded-none xl:w-[64%]">
        <Image src={hero.image.src} alt={hero.image.alt} fill preload sizes="(min-width: 992px) 64vw, 100vw" className="object-cover object-[center_38%]" />
      </div>

      <FlightPath className="absolute top-[104px] left-1.5 z-[1] hidden h-[195px] w-[120px] opacity-80 lg:block xl:left-1 xl:h-[190px] xl:w-[90px]" />

      <div className="contents lg:container-site lg:relative lg:z-[2] lg:flex lg:items-start lg:justify-between lg:gap-10">
        <div className="order-1 flex-auto lg:flex-[0_1_540px] lg:pl-4 xl:pl-9 2xl:flex-[0_1_600px] 2xl:pl-[58px] 4xl:pl-0">
          <HeroTitle id="destinations-hero-title" lines={hero.titleLines} script={hero.titleScript} />

          <p className="mt-[18px] max-w-[520px] text-base leading-[1.8] font-light text-body md:mt-[30px] md:text-[17px] md:leading-[1.85] lg:max-w-[248px] 2xl:mt-[34px] 2xl:max-w-[262px] 2xl:text-lg [&>strong]:font-semibold [&>strong]:text-[#2F3227]">
            Curated journeys that <strong>inspire</strong>, experiences that <strong>stay</strong>, memories that{" "}
            <strong>last forever</strong>.
          </p>

          <div className="mt-[26px] flex flex-col items-stretch gap-3 xs:flex-row xs:items-center sm:gap-3.5 md:mt-10">
            <ButtonLink href={hero.primaryCta.href} icon="arrowRight" className={buttonClass}>
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="outline" icon="calendar" className={buttonClass}>
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <StatsCard
          stats={hero.stats}
          className="lg:mt-[128px] lg:w-[190px] lg:px-[17px] lg:py-1 xl:mt-[156px] 2xl:mt-[176px] 2xl:w-[210px] 2xl:px-5 2xl:py-1.5 4xl:mt-[190px]"
          itemClassName="lg:py-[19px] 2xl:py-[17px]"
        />
      </div>

      <TornEdge fill="#F7F4ED" stroke="#E7E2D3" className="absolute inset-x-0 -bottom-px z-[3] hidden h-[62px] lg:block 2xl:h-[76px]" />
    </section>
  );
}
