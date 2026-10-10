import Image from "next/image";
import type { aboutHero as AboutHeroData } from "@/data/about";
import { FramedPhoto } from "@/components/shared/FramedPhoto";

function Leaf({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 90 120" fill="none" aria-hidden="true">
      <path d="M44 118C40 92 38 62 44 34 48 18 56 8 68 2" stroke="#5B6A2C" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M45 90c-13-2-22-9-24-21 14-2 23 5 24 21ZM47 84c11-7 16-17 13-29-12 5-17 15-13 29ZM43 62c-13-2-22-9-24-21 14-2 23 5 24 21ZM46 56c11-7 16-17 13-29-12 5-17 15-13 29ZM47 32c-11-4-20-2-27 7 11 6 21 4 27-7ZM53 28c9-8 12-18 8-29-10 7-13 17-8 29Z"
        fill="#5B6A2C"
        fillOpacity=".9"
      />
    </svg>
  );
}

/** About hero — title + tagline on the left, tilted photo collage with compass on the right. */
export function AboutHero({ hero }: { hero: typeof AboutHeroData }) {
  return (
    <section aria-labelledby="about-title" className="relative pt-12 pb-5 lg:pt-16 lg:pb-[34px] 2xl:pt-[88px]">
      <div className="container-site flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        <div className="flex-auto lg:flex-[0_1_420px] lg:pt-[46px] 2xl:flex-[0_1_460px]">
          <h1 id="about-title" className="text-4xl leading-[1.1] font-semibold text-ink sm:text-[44px] md:text-[55px] xl:text-[62px] 2xl:text-[70px]">
            {hero.title}
            {hero.kicker ? (
              <span className="mt-3 block font-sans text-[15px] leading-[1.5] font-medium tracking-[.2px] text-olive sm:text-base md:mt-4 md:text-lg 2xl:text-xl">
                {hero.kicker}
              </span>
            ) : null}
          </h1>
          <p className="mt-[18px] text-[16.5px] leading-[1.85] text-body md:mt-[30px] md:text-lg md:leading-[1.95] 2xl:text-xl">
            {hero.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        <div className="relative h-[230px] w-full flex-auto xs:h-[270px] sm:h-[330px] md:h-[400px] lg:h-[380px] lg:w-auto lg:flex-[0_0_50%] xl:h-[420px] xl:flex-[0_0_53%] 2xl:h-[520px]">
          <Leaf className="absolute top-[11%] left-[10%] h-auto w-[12%]" />
          <FramedPhoto
            src={hero.smallPhoto.src}
            alt={hero.smallPhoto.alt}
            sizes="(min-width: 992px) 19vw, 35vw"
            className="top-1/4 left-[17%] h-[52%] w-[35%] -rotate-3"
          />
          <FramedPhoto
            src={hero.largePhoto.src}
            alt={hero.largePhoto.alt}
            sizes="(min-width: 992px) 27vw, 50vw"
            preload
            className="top-0 right-[2%] z-[2] h-full w-1/2 rotate-2"
          />
          <Image
            src={hero.compass.src}
            alt={hero.compass.alt}
            width={640}
            height={616}
            sizes="(min-width: 992px) 14vw, 26vw"
            className="absolute top-[48%] left-[1%] z-[3] h-auto w-[24%] drop-shadow-[0_10px_18px_rgba(45,50,25,.22)] sm:top-1/2 sm:w-[26%]"
          />
        </div>
      </div>
    </section>
  );
}
