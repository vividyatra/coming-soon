import Image from "next/image";
import type { DestinationDetail, SeasonInfo } from "@/types/catalog";
import type { Media } from "@/types/content";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

/* Blocks specific to the Destination Detail template. */

export function PhotoStrip({ photos: all }: { photos: Media[] }) {
  const photos = all.filter((p, i) => all.findIndex((x) => x.src === p.src) === i);
  if (photos.length < 2) return null;
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {photos.slice(0, 3).map((photo, i) => (
        <li key={photo.src + i} className={cn("relative aspect-[4/3] overflow-hidden rounded-xl", i === 2 && "hidden sm:block")}>
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 992px) 18vw, 45vw" className="object-cover transition-transform duration-500 hover:scale-[1.05]" />
        </li>
      ))}
    </ul>
  );
}

export function TopPlaces({ places }: { places: DestinationDetail["topPlaces"] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2">
      {places.map((place, i) => (
        <li key={place.name} className="overflow-hidden rounded-[14px] border border-line-soft bg-white shadow-tile">
          {place.image ? (
            <div className="relative aspect-[16/9]">
              <Image src={place.image.src} alt={place.image.alt} fill sizes="(min-width: 992px) 30vw, (min-width: 576px) 50vw, 100vw" className="object-cover" />
              <span className="absolute top-3 left-3 flex size-8 items-center justify-center rounded-full bg-white/92 font-serif text-[15px] font-semibold text-olive-dark">{i + 1}</span>
            </div>
          ) : (
            <div className="flex aspect-[16/9] items-center justify-center bg-[linear-gradient(140deg,#F2EFE6,#E6E1D2)]">
              <span className="flex size-14 items-center justify-center rounded-full bg-white text-olive shadow-tile">
                <Icon name="pin" className="size-7" />
              </span>
            </div>
          )}
          <div className="p-5">
            <h3 className="text-[17.5px] font-semibold text-ink">
              {place.image ? null : <span className="mr-1.5 font-serif text-olive">{i + 1}.</span>}
              {place.name}
            </h3>
            <p className="mt-1.5 text-[14px] leading-[1.6] text-subtle">{place.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function SeasonCards({ seasons }: { seasons: SeasonInfo[] }) {
  const icon = (s: SeasonInfo) => (/monsoon|wet/i.test(s.season) ? "rain" : /winter/i.test(s.season) ? "snow" : "sun");
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {seasons.map((s) => (
        <li
          key={s.season}
          className={cn(
            "relative rounded-[14px] border p-5",
            s.recommended ? "border-olive bg-olive text-white shadow-card" : "border-line-soft bg-white text-ink shadow-tile",
          )}
        >
          {s.recommended ? <span className="absolute top-4 right-4 rounded-full bg-white/18 px-2.5 py-1 text-[11px] font-semibold tracking-[.5px] uppercase">Best time</span> : null}
          <Icon name={icon(s)} className={cn("size-7", s.recommended ? "text-white" : "text-olive")} />
          <p className={cn("mt-3 font-serif text-[19px] font-semibold", s.recommended ? "text-white" : "text-ink")}>{s.season}</p>
          <p className={cn("text-[13.5px] font-medium", s.recommended ? "text-white/80" : "text-olive")}>{s.months}</p>
          <p className={cn("mt-2 text-[14px] leading-[1.6]", s.recommended ? "text-white/85" : "text-subtle")}>{s.note}</p>
        </li>
      ))}
    </ul>
  );
}

export function DurationCallout({ days, text }: { days: string; text: string }) {
  return (
    <div className="flex items-start gap-4 rounded-[14px] border border-dashed border-olive/40 bg-cream-2/60 p-5">
      <span className="flex size-12 flex-none items-center justify-center rounded-full bg-white text-olive shadow-tile">
        <Icon name="clock" className="size-6" />
      </span>
      <div>
        <p className="text-[13px] font-medium tracking-[.6px] text-muted uppercase">Ideal trip duration</p>
        <p className="font-serif text-[22px] font-semibold text-ink">{days}</p>
        <p className="mt-1 text-[14.5px] leading-[1.6] text-body">{text}</p>
      </div>
    </div>
  );
}
