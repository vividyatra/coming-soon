import Image from "next/image";
import Link from "next/link";
import type { Category, Stat } from "@/types/content";
import type { hero as HeroData } from "@/data/home";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { FlightPath } from "@/components/ui/Decorations";
import { HeroTitle } from "@/components/shared/HeroTitle";
import { StatsCard } from "@/components/shared/StatsCard";

type Props = {
  hero: typeof HeroData;
  stats: Stat[];
  categories: Category[];
};

/**
 * Home hero — a 1:1 port of the original HTML/CSS hero.
 * Desktop: image bleeds in from the right behind the header.
 * < 992px: stacks as content → image → stats → categories.
 */
export function HeroSection({ hero, stats, categories }: Props) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative -mt-20 flex flex-col px-[var(--gutter)] pt-[104px] pb-1.5 md:-mt-[92px] md:pt-[122px] lg:block lg:overflow-hidden lg:px-0 lg:pb-2 xl:-mt-[105px] xl:pt-[159px]"
    >
      {/* image */}
      <div className="hero-mask relative order-2 mt-[26px] h-[200px] overflow-hidden rounded-[14px] bg-[linear-gradient(140deg,#cfd7d9,#97a48f)] sm:h-[240px] md:h-[300px] lg:absolute lg:top-0 lg:right-0 lg:bottom-3.5 lg:mt-0 lg:h-auto lg:w-[54%] lg:rounded-none xl:w-[58%] 2xl:w-[60%]">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          preload
          sizes="(min-width: 992px) 60vw, 100vw"
          className="object-cover object-[center_42%]"
        />
      </div>

      <FlightPath className="absolute top-[86px] left-3 z-[1] hidden h-[210px] w-[130px] opacity-85 lg:block xl:left-[26px] xl:h-[275px] xl:w-[175px]" />

      <div className="contents lg:container-site lg:relative lg:z-[2] lg:flex lg:items-start lg:justify-between lg:gap-10">
        {/* copy */}
        <div className="order-1 flex-auto lg:flex-[0_1_560px] lg:pt-1.5 2xl:flex-[0_1_640px] 2xl:pl-6 4xl:pl-0">
          <HeroTitle id="hero-title" lines={hero.titleLines} script={hero.titleScript} />

          <div className="mt-1.5 flex items-center gap-2" aria-hidden="true">
            <span className="block h-px w-16 bg-sage md:w-[88px]" />
            <Icon name="plane" className="size-[18px] text-[#4F5D25]" />
          </div>

          <p className="mt-3 max-w-[560px] text-base leading-[1.65] font-light text-body md:text-[17px] lg:max-w-[390px] 2xl:max-w-[445px] 2xl:text-[17.5px] [&>strong]:font-semibold [&>strong]:text-[#2F3227]">
            Curated journeys that <strong>inspire</strong>, experiences that <strong>stay</strong>, memories that{" "}
            <strong>last forever</strong>.
          </p>

          <div className="mt-[22px] flex flex-col items-stretch gap-3 xs:flex-row xs:items-center sm:gap-4">
            <ButtonLink
              href={hero.primaryCta.href}
              icon="arrowRight"
              className="gap-2 px-3.5 text-[13.5px] xs:flex-auto sm:flex-none sm:gap-2.5 sm:px-[22px] sm:text-[14.5px]"
            >
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              variant="outline"
              icon="calendar"
              className="gap-2 px-3.5 text-[13.5px] xs:flex-auto sm:flex-none sm:gap-2.5 sm:px-[22px] sm:text-[14.5px]"
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        {/* stats card */}
        <StatsCard stats={stats} />
      </div>

      {/* category bar */}
      <div className="relative z-[3] order-4 mt-[22px] lg:container-site lg:mt-10">
        <div className="grid grid-cols-1 gap-4 rounded-[20px] bg-white px-5 py-[22px] shadow-[0_14px_34px_rgb(45_50_25/2%)] sm:grid-cols-2 sm:gap-x-6 sm:gap-y-[18px] sm:px-[26px] sm:py-6 lg:mx-auto lg:flex lg:max-w-full lg:items-center lg:gap-4 lg:rounded-[60px] lg:py-[15px] lg:pr-[15px] lg:pl-[26px] xl:max-w-[1024px] 2xl:gap-[26px] 2xl:pl-11">
          {categories.map((category, i) => (
            <div key={category.title} className="contents">
              {i > 0 ? <span className="hidden h-[42px] w-px flex-none bg-line-warm lg:block" aria-hidden="true" /> : null}
              <div className="flex min-w-0 flex-1 items-center gap-[15px]">
                <Icon name={category.icon} className="size-[29px] flex-none text-olive 2xl:size-[33px]" />
                <span className="block min-w-0">
                  <span className="block pb-0.5 text-[14.5px] leading-[1.35] font-semibold text-ink-deep 2xl:text-[15px]">
                    {category.title}
                  </span>
                  <span className="block text-[11.5px] leading-[1.35] text-muted 2xl:text-xs">{category.subtitle}</span>
                </span>
              </div>
            </div>
          ))}
          <Link
            href={hero.categoriesCta.href}
            aria-label={hero.categoriesCta.label}
            className="flex size-[46px] flex-none items-center justify-center justify-self-center rounded-full bg-olive text-white transition-colors duration-[250ms] hover:bg-olive-dark sm:col-span-2 sm:size-[50px] lg:ml-2.5 2xl:size-14"
          >
            <Icon name="arrowRight" className="size-[22px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
