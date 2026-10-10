import Image from "next/image";
import Link from "next/link";
import type { IconName } from "@/components/ui/Icon";
import type { Media } from "@/types/content";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

/* Additional About page sections, built in the page's existing style. */

type IntroData = { title: string; paragraphs: string[]; highlights: string[]; badge: { script: string; text: string } };

export function AboutIntro({ intro, image }: { intro: IntroData; image: Media }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
      <div>
        <h3 className="text-[26px] leading-[1.25] font-semibold text-ink md:text-[32px]">{intro.title}</h3>
        <div className="mt-5 space-y-4 text-[15.5px] leading-[1.85] text-body md:text-base">
          {intro.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {intro.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-[15px] font-medium text-ink">
              <span className="mt-0.5 flex size-[22px] flex-none items-center justify-center rounded-full bg-olive text-white">
                <Icon name="check" className="size-3.5" />
              </span>
              {h}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative mx-auto h-[320px] w-full max-w-[520px] sm:h-[400px] lg:h-[440px]">
        <div className="absolute top-0 right-0 h-[82%] w-[78%] overflow-hidden rounded-[18px] bg-white p-[7px] shadow-photo">
          <div className="relative size-full overflow-hidden rounded-xl">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 992px) 30vw, 80vw" className="object-cover" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-[58%] rounded-[18px] bg-moss p-5 text-white shadow-soft md:p-6">
          <p className="font-script text-[30px] leading-none text-[#F2EFE0]">{intro.badge.script}</p>
          <p className="mt-2 text-[14.5px] leading-[1.6] text-white/85">{intro.badge.text}</p>
        </div>
      </div>
    </div>
  );
}

export function VisionMission({ items }: { items: { icon: IconName; label: string; title: string; text: string }[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 2xl:gap-6">
      {items.map((item, i) => (
        <article
          key={item.label}
          className={cn(
            "relative overflow-hidden rounded-[18px] p-7 md:p-9",
            i === 0 ? "bg-moss text-white" : "border border-line-soft bg-white text-ink shadow-card",
          )}
        >
          <Icon name={item.icon} className={cn("absolute -right-6 -bottom-6 size-[150px]", i === 0 ? "text-white/8" : "text-cream-2")} />
          <span className={cn("relative flex size-14 items-center justify-center rounded-full", i === 0 ? "bg-white/12 text-[#F2EFE0]" : "bg-cream-2 text-olive")}>
            <Icon name={item.icon} className="size-7" />
          </span>
          <p className={cn("relative mt-5 text-[12.5px] font-semibold tracking-[1.6px] uppercase", i === 0 ? "text-white/70" : "text-eyebrow")}>{item.label}</p>
          <h3 className={cn("relative mt-2 text-[22px] leading-[1.35] font-semibold md:text-[26px]", i === 0 ? "text-white" : "text-ink")}>{item.title}</h3>
          <p className={cn("relative mt-3 text-[15px] leading-[1.75]", i === 0 ? "text-white/82" : "text-body")}>{item.text}</p>
        </article>
      ))}
    </div>
  );
}

/** Four-step planning approach — numbered step circles. */
export function ApproachSteps({ steps }: { steps: { icon: IconName; title: string; text: string }[] }) {
  return (
    <ol className="mx-auto grid max-w-[520px] gap-8 lg:max-w-none lg:grid-cols-4 lg:gap-6">
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        return (
          <li
            key={step.title}
            className={cn(
              "relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center",
              !last &&
                "before:absolute before:top-[72px] before:-bottom-6 before:left-8 before:border-l before:border-dashed before:border-[#CFC9B8] lg:before:hidden lg:after:absolute lg:after:top-8 lg:after:right-[calc(-50%+46px)] lg:after:left-[calc(50%+46px)] lg:after:border-t lg:after:border-dashed lg:after:border-[#CFC9B8]",
            )}
          >
            <span className="relative flex size-16 flex-none items-center justify-center rounded-full border border-[#DCD7C8] bg-card text-olive shadow-tile">
              <Icon name={step.icon} className="size-[30px]" />
              <span className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full bg-olive text-[11.5px] font-semibold text-white">{i + 1}</span>
            </span>
            <span className="block pt-1 lg:pt-5">
              <span className="block font-serif text-[19px] font-semibold text-ink md:text-xl">{step.title}</span>
              <span className="mt-1.5 block text-[14px] leading-[1.6] text-subtle lg:mx-auto lg:max-w-[240px]">{step.text}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function DifferenceTable({ data }: { data: { columns: string[]; rows: string[][] } }) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-line-soft bg-white shadow-card">
      <div className="grid grid-cols-2 text-[13px] font-semibold tracking-[.6px] uppercase md:text-[14px]">
        <div className="bg-cream-2/70 px-4 py-4 text-muted md:px-7">{data.columns[0]}</div>
        <div className="bg-olive px-4 py-4 text-white md:px-7">{data.columns[1]}</div>
      </div>
      <ul className="divide-y divide-line-soft">
        {data.rows.map(([them, us]) => (
          <li key={us} className="grid grid-cols-2">
            <span className="flex items-start gap-2.5 px-4 py-4 text-[14px] leading-[1.5] text-subtle md:px-7 md:text-[15px]">
              <Icon name="close" className="mt-0.5 size-4 flex-none text-stone" />
              {them}
            </span>
            <span className="flex items-start gap-2.5 bg-olive/[.04] px-4 py-4 text-[14px] leading-[1.5] font-medium text-ink md:px-7 md:text-[15px]">
              <Icon name="check" className="mt-0.5 size-4 flex-none text-olive" />
              {us}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ExpertiseGrid({ items }: { items: { title: string; text: string; image: Media; href: string }[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-5">
      {items.map((item) => (
        <li key={item.title}>
          <Link href={item.href} className="group relative flex h-[240px] overflow-hidden rounded-[14px] md:h-[270px]">
            <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 992px) 33vw, (min-width: 576px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
            <span className="relative mt-auto w-full bg-[linear-gradient(to_top,rgba(15,18,10,.86),rgba(15,18,10,0))] px-5 pt-14 pb-5">
              <span className="block font-serif text-[21px] font-semibold text-white">{item.title}</span>
              <span className="mt-1 block text-[14px] leading-[1.55] text-white/85">{item.text}</span>
              <span className="mt-2.5 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-white">
                Enquire
                <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function CustomerPromise({ promise }: { promise: { quote: string; cite: string; promises: { icon: IconName; title: string; text: string }[] } }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-14">
      <blockquote className="relative rounded-[18px] bg-moss px-7 py-9 text-white md:px-10 md:py-11">
        <Icon name="quote" className="size-10 text-[#F2EFE0]/40" />
        <p className="mt-4 font-serif-italic text-[23px] leading-[1.45] italic md:text-[28px]">{promise.quote}</p>
        <cite className="mt-5 block text-[14.5px] font-semibold text-[#F2EFE0] not-italic">— {promise.cite}</cite>
      </blockquote>
      <ul className="grid gap-4 sm:grid-cols-2">
        {promise.promises.map((p) => (
          <li key={p.title} className="rounded-[14px] border border-line-soft bg-white p-5 shadow-tile">
            <span className="flex size-11 items-center justify-center rounded-full bg-cream-2 text-olive">
              <Icon name={p.icon} className="size-5" />
            </span>
            <p className="mt-3 text-[16px] font-semibold text-ink">{p.title}</p>
            <p className="mt-1 text-[14px] leading-[1.6] text-subtle">{p.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
