import Image from "next/image";
import Link from "next/link";
import type { IconName } from "@/components/ui/Icon";
import type { Media } from "@/types/content";
import { Icon } from "@/components/ui/Icon";

/* Sections for the Sightseeing listing template. */

export type ExperienceItem = { icon: IconName; title: string; text: string; where: string; href: string };

export function ExperienceCards({ items }: { items: ExperienceItem[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-5">
      {items.map((item) => (
        <li key={item.title + item.where}>
          <Link href={item.href} className="group flex h-full gap-4 rounded-[14px] border border-line-soft bg-white p-5 shadow-tile transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
            <span className="flex size-12 flex-none items-center justify-center rounded-full bg-cream-2 text-olive transition-colors group-hover:bg-olive group-hover:text-white">
              <Icon name={item.icon} className="size-6" />
            </span>
            <span className="block min-w-0">
              <span className="block text-[16px] font-semibold text-ink group-hover:text-olive">{item.title}</span>
              <span className="mt-1 block text-[14px] leading-[1.6] text-subtle">{item.text}</span>
              <span className="mt-2.5 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-olive">
                <Icon name="pin" className="size-3.5" />
                {item.where}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function PhotoTiles({ items }: { items: { href: string; image: Media; title: string; meta: string }[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3.5 md:grid-cols-3 lg:grid-cols-4 2xl:gap-5">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="group relative block aspect-[4/5] overflow-hidden rounded-[14px] bg-cream-2 sm:aspect-[4/3]">
            <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 992px) 25vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
            <span className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(15,18,10,.82),rgba(15,18,10,0))] px-4 pt-10 pb-4">
              <span className="block font-serif text-[18px] font-semibold text-white md:text-[20px]">{item.title}</span>
              <span className="block text-[12.5px] text-white/85">{item.meta}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function CategoryTiles({ items }: { items: { href: string; icon: IconName; title: string; count: number }[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6 2xl:gap-5">
      {items.map((item) => (
        <li key={item.title}>
          <Link
            href={item.href}
            className="group flex h-full flex-col items-center rounded-[14px] border border-line-soft bg-white px-3 py-6 text-center shadow-tile transition-all duration-300 hover:-translate-y-1 hover:border-olive hover:shadow-card"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-cream-2 text-olive transition-colors group-hover:bg-olive group-hover:text-white">
              <Icon name={item.icon} className="size-7" />
            </span>
            <span className="mt-3 text-[15px] font-semibold text-ink">{item.title}</span>
            <span className="mt-0.5 text-[12.5px] text-muted">
              {item.count} {item.count === 1 ? "place" : "places"}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
