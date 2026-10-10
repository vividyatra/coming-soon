import Image from "next/image";
import type { Feature } from "@/types/content";
import { routes } from "@/data/site";
import { Icon } from "@/components/ui/Icon";
import { PlaneLoop } from "@/components/ui/Decorations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";

/** Green panel built on the original features bar (#55632A, cream icons, soft dividers). */
export function WhyChoose({ features }: { features: Feature[] }) {
  return (
    <section aria-labelledby="why-title" className="pt-14 md:pt-[72px] lg:pt-[84px]">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-2xl bg-olive-bar px-[22px] py-9 sm:px-8 md:rounded-[18px] md:px-10 md:py-12 2xl:px-14 2xl:py-14">
          <Image
            src="/images/706d355f-414f-4e11-b792-3420639ebfa1.jpg"
            alt=""
            aria-hidden="true"
            width={2172}
            height={724}
            sizes="(min-width: 1520px) 1520px, 100vw"
            className="pointer-events-none absolute right-0 bottom-0 w-full max-w-[900px] opacity-[.14] mix-blend-luminosity [mask-image:linear-gradient(to_right,transparent,#000_35%)]"
          />
          <PlaneLoop className="absolute top-7 right-8 hidden w-[175px] opacity-80 lg:block" stroke="#E7E4D4" plane="#EFEDDF" />

          <div className="relative">
            <SectionHeading
              eyebrow="Why Vivid Yatra"
              title="Why Choose Vivid Yatra"
              subtitle="Personal, honest trip planning from a team rooted in the hills of Himachal."
              align="left"
              tone="light"
              titleId="why-title"
              className="md:pr-[220px] lg:pr-[260px]"
            />

            <ul className="mt-4 grid gap-7 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 xl:grid-cols-5 xl:gap-0">
              {features.map((feature, i) => (
                <li
                  key={feature.title}
                  className={`flex gap-4 xl:flex-col xl:gap-4 xl:px-7 ${i === 0 ? "xl:pl-0" : "xl:border-l xl:border-white/22"} ${i === features.length - 1 ? "xl:pr-0" : ""}`}
                >
                  <span className="flex size-[52px] flex-none items-center justify-center rounded-full bg-white/10 text-[#F3F1E4] ring-1 ring-white/15">
                    <Icon name={feature.icon} className="size-7" />
                  </span>
                  <span className="block">
                    <span className="block text-[15.5px] leading-[1.35] font-semibold text-white">{feature.title}</span>
                    <span className="mt-1.5 block text-[13.5px] leading-[1.6] font-light text-white/78">{feature.description}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-white/18 pt-6">
              <TextLink href={routes.about} tone="light">
                Discover Our Story
              </TextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
