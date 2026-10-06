import Image from "next/image";
import Link from "next/link";
import type { Sightseeing } from "@/types/content";
import { routes } from "@/data/site";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";

/** Bento grid of attractions; the first one is featured large. */
export function FeaturedSightseeing({ places }: { places: Sightseeing[] }) {
  return (
    <section aria-labelledby="sightseeing-title" className="pt-14 md:pt-[72px] lg:pt-[84px]">
      <div className="container-site">
        <SectionHeading
          eyebrow="Must-See Places"
          title="Featured Sightseeing"
          subtitle="Iconic attractions our travellers love — included in our curated itineraries."
          align="left"
          titleId="sightseeing-title"
          action={<TextLink href={routes.sightseeing}>Explore All Sightseeing</TextLink>}
        />

        <ul className="mt-2 grid auto-rows-[250px] gap-3.5 sm:grid-cols-2 md:auto-rows-[260px] lg:grid-cols-4 lg:auto-rows-[270px] 2xl:gap-[18px]">
          {places.map((place, i) => {
            const featured = i === 0;
            return (
              <li key={place.slug} className={cn(featured && "sm:col-span-2 lg:row-span-2")}>
                <Link
                  href={`${routes.sightseeing}/${place.slug}`}
                  className="group relative flex h-full overflow-hidden rounded-[14px] bg-[linear-gradient(150deg,#b9c2c6,#8d9a86)]"
                >
                  <Image
                    src={place.image.src}
                    alt={place.image.alt}
                    fill
                    sizes={featured ? "(min-width: 992px) 50vw, 100vw" : "(min-width: 992px) 25vw, (min-width: 576px) 50vw, 100vw"}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div
                    className={cn(
                      "relative mt-auto w-full bg-[linear-gradient(to_top,rgba(15,18,10,.85)_0%,rgba(15,18,10,.45)_55%,rgba(15,18,10,0)_100%)] px-[18px] pt-14 pb-[18px]",
                      featured && "lg:px-7 lg:pb-7",
                    )}
                  >
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/18 px-2.5 py-1 text-[11.5px] font-medium tracking-[.4px] text-white backdrop-blur-sm">
                      <Icon name="pin" className="size-3.5" />
                      {place.destination}
                    </span>
                    <h3 className={cn("mt-2.5 leading-[1.2] font-semibold text-white", featured ? "text-[21px] lg:text-[30px]" : "text-[19px]")}>
                      {place.name}
                    </h3>
                    <p
                      className={cn(
                        "mt-1.5 text-[13.5px] leading-[1.55] font-light text-white/85",
                        featured ? "max-w-[460px] lg:text-[15px]" : "line-clamp-2",
                      )}
                    >
                      {place.info}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 border-b border-white/45 pb-0.5 text-[13.5px] font-medium text-white transition-colors group-hover:border-white">
                      Explore
                      <Icon name="arrowRight" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
