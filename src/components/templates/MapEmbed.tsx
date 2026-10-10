import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

/**
 * Google Maps embed with an "open in Maps" link.
 * Pass `embedUrl` / `mapsUrl` to show an exact Google Maps listing; otherwise `query` is searched.
 */
export function MapEmbed({
  query,
  title,
  className,
  embedUrl,
  mapsUrl,
}: {
  query: string;
  title: string;
  className?: string;
  embedUrl?: string;
  mapsUrl?: string;
}) {
  const q = encodeURIComponent(query);
  return (
    <div className={cn("overflow-hidden rounded-[14px] border border-line-soft bg-cream-2 shadow-tile", className)}>
      <iframe
        title={title}
        src={embedUrl ?? `https://www.google.com/maps?q=${q}&output=embed`}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="block h-[280px] w-full border-0 md:h-[340px]"
      />
      <a
        href={mapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${q}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-3 bg-white px-5 py-3.5 text-[14px] font-medium text-ink transition-colors hover:text-olive"
      >
        <span className="inline-flex items-center gap-2">
          <Icon name="pin" className="size-4 text-olive" />
          Open in Google Maps
        </span>
        <Icon name="arrowRight" className="size-4" />
      </a>
    </div>
  );
}
