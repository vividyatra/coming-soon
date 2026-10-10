import Image from "next/image";
import Link from "next/link";
import type { TravelStyle } from "@/types/content";
import { routes } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Travel style tiles — the white "category card" from the original Destinations page. */
export function TravelStyles({ styles }: { styles: TravelStyle[] }) {
  return (
    <section id="travel-styles" aria-labelledby="styles-title" className="scroll-mt-6 pt-14 md:pt-[72px] lg:pt-[84px]">
      <div className="container-site">
        <SectionHeading
          eyebrow="Travel Your Way"
          title="Holidays for Every Kind of Traveller"
          subtitle="Family holidays, honeymoons, adventure, culture or a quick weekend away — pick a style and we’ll shape the trip."
          titleId="styles-title"
        />

        <ul className="mt-2 grid gap-3.5 xs:grid-cols-2 md:gap-[18px] lg:grid-cols-4 2xl:gap-5">
          {styles.map((style) => (
            <li key={style.slug}>
              <Link
                href={routes.contact}
                className="group block h-full overflow-hidden rounded-xl border border-[#EDE9DC] bg-white shadow-tile transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="relative h-[120px] overflow-hidden md:h-[130px] 2xl:h-[150px]">
                  <Image
                    src={style.image.src}
                    alt={style.image.alt}
                    fill
                    sizes="(min-width: 992px) 25vw, (min-width: 381px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-col items-start gap-2 px-[13px] pt-[13px] pb-[15px] sm:flex-row sm:items-center sm:gap-2.5 md:gap-[13px] md:px-4 md:pt-[15px] md:pb-[17px]">
                  <Icon name={style.icon} className="size-[29px] flex-none text-olive 2xl:size-[33px]" />
                  <span className="block min-w-0 flex-1">
                    <span className="block pb-0.5 text-[14.5px] leading-[1.35] font-semibold text-ink-deep 2xl:text-[15px]">{style.title}</span>
                    <span className="block text-[11.5px] leading-[1.35] text-muted 2xl:text-xs">{style.subtitle}</span>
                  </span>
                  <Icon
                    name="arrowRight"
                    className="hidden size-[18px] flex-none -translate-x-1 text-olive opacity-0 lg:block transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </div>
              </Link>
            </li>
          ))}

          {/* custom-trip tile completes the grid */}
          <li className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-moss p-[18px] text-white sm:p-6">
            <Icon name="compass" className="absolute -right-6 -bottom-6 size-[140px] text-white/8" />
            <div className="relative">
              <p className="font-script text-[28px] leading-none text-[#F2EFE0] sm:text-[34px]">Can’t decide?</p>
              <p className="mt-3 text-[13.5px] leading-[1.6] font-light text-white/82 sm:text-[14.5px] sm:leading-[1.65]">
                Tell us how you like to travel and we’ll plan a customised tour around you.
              </p>
            </div>
            <ButtonLink href={routes.contact} variant="light" icon="arrowRight" className="relative mt-5 w-full px-3 text-[13.5px] sm:w-auto sm:self-start sm:px-[22px] sm:text-[14.5px]">
              Customise My Trip
            </ButtonLink>
          </li>
        </ul>
      </div>
    </section>
  );
}
