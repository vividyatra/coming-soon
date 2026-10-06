import type { plannerHero as HeroData } from "@/data/planner";
import type { Category } from "@/types/content";
import { Icon } from "@/components/ui/Icon";

/* ------------------------------------------------------------------
   HERO — "Trip Planner" with the looping paper-plane path
   ------------------------------------------------------------------ */
export function ContactHero({ hero }: { hero: typeof HeroData }) {
  return (
    <section aria-labelledby="planner-title" className="relative pt-[42px] md:pt-14 lg:pt-[72px] 2xl:pt-[92px]">
      <div className="container-narrow relative">
        <div className="lg:pl-[52px] 2xl:pl-[88px]">
          <h1 id="planner-title" className="text-[31px] leading-[1.14] font-semibold text-ink sm:text-4xl md:text-[44px] lg:text-[50px] 2xl:text-[56px]">
            {hero.title}
          </h1>
          <p className="mt-2.5 text-[16.5px] leading-[1.55] font-light text-body md:mt-3 md:text-lg 2xl:text-[19px]">
            {hero.subtitle}
            <br />
            <strong className="font-semibold text-olive">{hero.highlight}</strong>
          </p>
        </div>

        <svg
          className="pointer-events-none absolute top-1 right-[var(--gutter)] h-auto w-[104px] sm:top-0 sm:w-32 sm:opacity-80 md:w-[168px] md:opacity-100 lg:top-2.5 lg:w-[200px] 2xl:w-[232px]"
          viewBox="0 0 210 150"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M204 8c-36 4-62 20-74 41-11 19-5 37 9 41 13 3 23-8 18-21-8-19-36-27-66-21-25 5-47 18-63 36"
            stroke="#A9A48C"
            strokeWidth="1.4"
            strokeDasharray="4 7"
            strokeLinecap="round"
          />
          <g transform="translate(52 92) rotate(200) scale(.92)" fill="#5B6A2C">
            <path d="M0 8 24 0l-8 21-4.2-7.8L0 8Z" />
          </g>
        </svg>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   WHY PLAN WITH US — four icon items
   ------------------------------------------------------------------ */
export function WhyPlan({ items }: { items: Category[] }) {
  return (
    <section aria-labelledby="why-plan-title" className="pt-11 text-center md:pt-[54px] 2xl:pt-[52px]">
      <div className="container-site">
        <h2 id="why-plan-title" className="text-[25px] font-semibold text-ink sm:text-[28px] md:text-4xl 2xl:text-[40px]">
          Why Plan with Us?
        </h2>
        <div className="mx-auto mt-[34px] grid max-w-[560px] grid-cols-2 gap-x-[18px] gap-y-[30px] sm:gap-x-6 sm:gap-y-9 lg:mt-10 lg:max-w-[1000px] lg:grid-cols-4 lg:gap-[30px]">
          {items.map((item) => (
            <div key={item.title}>
              <Icon name={item.icon} className="mx-auto size-11 text-olive md:size-[58px]" />
              <h3 className="mt-3.5 font-sans text-base leading-[1.35] font-bold whitespace-pre-line text-ink md:mt-[18px] md:text-[17px]">{item.title}</h3>
              <p className="mt-1.5 text-sm text-subtle md:text-[15px]">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
