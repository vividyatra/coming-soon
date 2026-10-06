import Image from "next/image";
import { Fragment } from "react";
import type { aboutStory as StoryData, aboutTeam as TeamData } from "@/data/about";
import type { Category } from "@/types/content";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/* ------------------------------------------------------------------
   OUR STORY — copy on the left, faded photo bleeding in from the right
   ------------------------------------------------------------------ */
export function AboutStory({ story }: { story: typeof StoryData }) {
  return (
    <section aria-labelledby="story-title" className="relative overflow-hidden pt-11 pb-14 lg:pt-14 lg:pb-[72px] 2xl:pt-[66px] 2xl:pb-[84px]">
      <div className="story-mask absolute inset-y-0 right-0 z-0 w-full opacity-30 lg:w-[66%] lg:opacity-75">
        <Image src={story.image.src} alt={story.image.alt} fill sizes="(min-width: 992px) 66vw, 100vw" className="object-cover object-[center_40%]" />
      </div>

      <div className="container-site relative z-[2]">
        <div className="max-w-[560px] lg:max-w-[420px]">
          <h2 id="story-title" className="text-[32px] font-semibold text-ink md:text-[42px] 2xl:text-5xl">
            {story.title}
          </h2>
          <p className="mt-[18px] max-w-[560px] text-base leading-[1.9] text-body md:mt-[26px] md:text-[17.5px] lg:max-w-[386px]">{story.text}</p>
          <ButtonLink
            href={story.cta.href}
            className="mt-7 h-12 px-6 text-[14.5px] md:mt-9 md:h-[54px] md:px-[30px] md:text-[15px]"
          >
            {story.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   STATS BAR — green band with serif numbers
   ------------------------------------------------------------------ */
export function AboutStats({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section aria-label="Vivid Yatra in numbers" className="pt-[26px]">
      <div className="container-site">
        <div className="grid grid-cols-2 gap-x-5 gap-y-[26px] rounded-[18px] bg-moss px-[22px] py-[30px] lg:flex lg:items-center lg:gap-0 lg:rounded-[22px] lg:px-6 lg:py-[52px]">
          {stats.map((stat, i) => (
            <Fragment key={stat.label}>
              {i > 0 ? <span className="hidden h-[74px] w-px flex-none bg-white/28 lg:block" aria-hidden="true" /> : null}
              <div className="min-w-0 flex-1 text-center">
                <span className="block font-serif text-[32px] leading-[1.2] font-semibold text-white sm:text-[40px] 2xl:text-[46px]">
                  {stat.value}
                </span>
                <span className="mt-1 block text-[13px] text-white/82 sm:text-sm 2xl:text-base">{stat.label}</span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   WHAT DRIVES US — four values with vertical dividers
   ------------------------------------------------------------------ */
export function AboutValues({ values, title = "What Drives Us?" }: { values: Category[]; title?: string }) {
  return (
    <section id="what-drives-us" aria-labelledby="values-title" className="scroll-mt-6 pt-[50px] text-center md:pt-[62px] 2xl:pt-[74px]">
      <div className="container-site">
        <h2 id="values-title" className="text-[25px] font-semibold text-ink sm:text-[28px] md:text-[38px] 2xl:text-[42px]">
          {title}
        </h2>

        <div className="mt-9 grid grid-cols-2 gap-x-5 gap-y-10 lg:mt-11 lg:flex lg:items-center lg:gap-0">
          {values.map((value, i) => (
            <Fragment key={value.title}>
              {i > 0 ? <span className="hidden h-[116px] w-px flex-none bg-[#DFDACB] lg:block" aria-hidden="true" /> : null}
              <div className="min-w-0 flex-1 lg:px-5">
                <Icon name={value.icon} className="mx-auto size-11 text-olive md:size-16" />
                <h3 className="mt-3.5 font-sans text-base font-bold text-ink md:mt-5 md:text-lg">{value.title}</h3>
                <p className="mt-1.5 text-sm text-subtle md:text-base">{value.subtitle}</p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   MEET THE TEAM
   ------------------------------------------------------------------ */
export function AboutTeam({ team }: { team: typeof TeamData }) {
  return (
    <section aria-labelledby="team-title" className="pt-12 pb-[60px] text-center md:pt-[60px] md:pb-[74px] 2xl:pt-[72px] 2xl:pb-[84px]">
      <div className="container-site">
        <h2 id="team-title" className="text-[25px] leading-[1.35] font-semibold text-ink sm:text-[28px] md:text-[38px] md:leading-[1.4] 2xl:text-[42px]">
          {team.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <div className="mx-auto mt-[34px] grid max-w-[600px] grid-cols-2 gap-5 sm:gap-6 md:mt-[50px] md:gap-[34px] lg:max-w-[91%] lg:grid-cols-4 lg:gap-8 2xl:gap-[42px]">
          {team.members.map((member) => (
            <article key={member.name}>
              <div className="relative aspect-[1/1.02] overflow-hidden rounded-[14px] bg-[linear-gradient(150deg,#cfd7d9,#97a48f)]">
                <Image
                  src={member.photo.src}
                  alt={member.photo.alt}
                  fill
                  sizes="(min-width: 992px) 22vw, (min-width: 576px) 290px, 45vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-3.5 text-[16.5px] font-semibold text-ink md:mt-5 md:text-[19px]">{member.name}</h3>
              <p className="mt-[5px] text-sm text-subtle md:text-base">{member.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
