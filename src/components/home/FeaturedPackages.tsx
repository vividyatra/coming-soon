import Image from "next/image";
import Link from "next/link";
import type { TourPackage } from "@/types/content";
import { routes } from "@/data/site";
import { formatINR } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";

function PackageCard({ pkg }: { pkg: TourPackage }) {
  const href = routes.contact;
  return (
    <article className="group flex flex-col overflow-hidden rounded-[14px] border border-line-soft bg-white shadow-tile transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative h-[210px] overflow-hidden bg-[linear-gradient(150deg,#c3ccd0,#95a28d)] md:h-[220px]">
        <Image
          src={pkg.image.src}
          alt={pkg.image.alt}
          fill
          sizes="(min-width: 1151px) 25vw, (min-width: 576px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/92 px-3 py-1.5 text-xs font-medium text-ink backdrop-blur-sm">
          <Icon name="clock" className="size-3.5 text-olive" />
          {pkg.duration}
        </span>
        {pkg.badge ? (
          <span className="absolute top-3.5 right-3.5 rounded-full bg-olive px-3 py-1.5 text-[11px] font-semibold tracking-[.6px] text-white uppercase">
            {pkg.badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-5 pt-[18px] pb-5">
        <p className="inline-flex items-center gap-1.5 text-[11.5px] font-medium tracking-[1.4px] text-eyebrow uppercase">
          <Icon name="pin" className="size-3.5 text-olive" />
          {pkg.destination}
        </p>
        <h3 className="mt-2 text-[19px] leading-[1.25] font-semibold text-ink md:text-xl">
          <Link href={href} className="transition-colors hover:text-olive">
            {pkg.title}
          </Link>
        </h3>

        <ul className="mt-3.5 mb-5 space-y-2">
          {pkg.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[14px] leading-[1.45] text-body">
              <span className="mt-0.5 flex size-[18px] flex-none items-center justify-center rounded-full bg-cream-2 text-olive">
                <Icon name="check" className="size-3" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line-soft pt-4">
          <div>
            <p className="text-xs text-muted">{pkg.startingPrice ? "Starting from" : "Price"}</p>
            <p className="font-serif text-[22px] leading-tight font-semibold text-ink-deep">
              {pkg.startingPrice ? formatINR(pkg.startingPrice) : "On request"}
            </p>
            <p className="text-xs text-muted">{pkg.priceNote}</p>
          </div>
          <Link
            href={href}
            aria-label={`Enquire about: ${pkg.title}`}
            className="inline-flex h-10 flex-none items-center gap-2 rounded-lg border border-line px-3.5 text-[13.5px] font-medium text-ink transition-colors duration-[250ms] hover:border-olive hover:bg-olive hover:text-white"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </article>
  );
}

export function FeaturedPackages({ packages }: { packages: TourPackage[] }) {
  return (
    <section aria-labelledby="packages-title" className="pt-14 md:pt-[72px] lg:pt-[84px]">
      <div className="container-site">
        <SectionHeading
          eyebrow="Holiday & Tour Packages"
          title="Holiday Packages Built Around You"
          subtitle="Sample tour packages to get you started — every itinerary is customised to your dates, group and budget."
          align="left"
          titleId="packages-title"
          action={<TextLink href={routes.contact}>Enquire About Packages</TextLink>}
        />
        <div className="mt-2 grid gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5 2xl:gap-6">
          {packages.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
