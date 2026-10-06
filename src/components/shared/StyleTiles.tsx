import Image from "next/image";
import Link from "next/link";
import type { TravelStyleInfo } from "@/types/catalog";
import { Icon } from "@/components/ui/Icon";

type Props = {
  styles: TravelStyleInfo[];
  /** where each tile links to, e.g. a filtered listing */
  hrefFor: (slug: string) => string;
  /** optional count shown on each tile */
  counts?: Record<string, number>;
  countLabel?: string;
};

/** Travel style tiles — the white category card from the original Destinations page. */
export function StyleTiles({ styles, hrefFor, counts, countLabel = "trips" }: Props) {
  return (
    <ul className="grid gap-3.5 xs:grid-cols-2 md:gap-[18px] lg:grid-cols-4 2xl:gap-5">
      {styles.map((style, i) => (
        <li key={style.slug} className={i === styles.length - 1 && styles.length % 2 === 1 ? "xs:col-span-2 lg:col-span-1" : undefined}>
          <Link
            href={hrefFor(style.slug)}
            className="group block h-full overflow-hidden rounded-xl border border-[#EDE9DC] bg-white shadow-tile transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
          >
            <div className="relative h-[120px] overflow-hidden md:h-[130px] 2xl:h-[150px]">
              <Image src={style.image.src} alt={style.image.alt} fill sizes="(min-width: 992px) 25vw, (min-width: 381px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
              {counts ? (
                <span className="absolute right-3 bottom-3 rounded-full bg-white/92 px-2.5 py-1 text-[11.5px] font-medium text-olive-dark">
                  {counts[style.slug] ?? 0} {countLabel}
                </span>
              ) : null}
            </div>
            <div className="flex items-center gap-2.5 px-[13px] pt-[13px] pb-[15px] md:gap-[13px] md:px-4 md:pt-[15px] md:pb-[17px]">
              <Icon name={style.icon} className="size-[29px] flex-none text-olive 2xl:size-[33px]" />
              <span className="block min-w-0 flex-1">
                <span className="block pb-0.5 text-[14.5px] leading-[1.35] font-semibold text-ink-deep 2xl:text-[15px]">{style.title}</span>
                <span className="block text-[11.5px] leading-[1.35] text-muted 2xl:text-xs">{style.subtitle}</span>
              </span>
              <Icon name="arrowRight" className="hidden size-[18px] flex-none -translate-x-1 text-olive opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 lg:block" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
