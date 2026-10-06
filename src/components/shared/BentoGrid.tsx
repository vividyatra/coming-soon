import Image from "next/image";
import Link from "next/link";
import type { Media } from "@/types/content";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

export type BentoItem = { href: string; image: Media; chip: string; title: string; text: string; cta: string };

/** Photo bento — first tile large (2×2 on desktop), as in Home "Featured Sightseeing". */
export function BentoGrid({ items }: { items: BentoItem[] }) {
  return (
    <ul className="grid auto-rows-[250px] gap-3.5 sm:grid-cols-2 md:auto-rows-[270px] lg:grid-cols-4 lg:auto-rows-[280px] 2xl:gap-[18px]">
      {items.slice(0, 5).map((item, i) => {
        const big = i === 0;
        return (
          <li key={`${item.href}-${i}`} className={cn(big && "sm:col-span-2 lg:row-span-2")}>
            <Link href={item.href} className="group relative flex h-full overflow-hidden rounded-[14px] bg-[linear-gradient(150deg,#b9c2c6,#8d9a86)]">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes={big ? "(min-width: 992px) 50vw, 100vw" : "(min-width: 992px) 25vw, (min-width: 576px) 50vw, 100vw"}
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className={cn("relative mt-auto w-full bg-[linear-gradient(to_top,rgba(15,18,10,.86)_0%,rgba(15,18,10,.45)_55%,rgba(15,18,10,0)_100%)] px-[18px] pt-14 pb-[18px]", big && "lg:px-7 lg:pb-7")}>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/18 px-2.5 py-1 text-[11.5px] font-medium text-white backdrop-blur-sm">
                  <Icon name="pin" className="size-3.5" />
                  {item.chip}
                </span>
                <h3 className={cn("mt-2.5 leading-[1.2] font-semibold text-white", big ? "text-[22px] lg:text-[32px]" : "text-[19px]")}>{item.title}</h3>
                <p className={cn("mt-1.5 text-[13.5px] leading-[1.55] font-light text-white/85", big ? "max-w-[460px] lg:text-[15px]" : "line-clamp-2")}>{item.text}</p>
                <span className="mt-3 inline-flex items-center gap-2 border-b border-white/45 pb-0.5 text-[13.5px] font-medium text-white group-hover:border-white">
                  {item.cta}
                  <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
