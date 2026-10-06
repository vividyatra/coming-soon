import type { Stat } from "@/types/content";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

type Props = {
  stats: Stat[];
  /** desktop sizing / offsets differ per page */
  className?: string;
  itemClassName?: string;
};

/**
 * White stats card from the original hero ("100+ Destinations" …).
 * Desktop: narrow vertical card. < 992px: full-width 2-column grid (1 column ≤ 380px).
 */
export function StatsCard({ stats, className, itemClassName }: Props) {
  return (
    <aside
      aria-label="Vivid Yatra in numbers"
      className={cn(
        "order-3 mt-[22px] grid w-full grid-cols-1 gap-x-3.5 rounded-[14px] bg-white px-3.5 py-0.5 shadow-soft xs:grid-cols-2 sm:px-4 sm:py-1 md:gap-x-6 md:px-5 md:py-1.5 lg:mt-12 lg:block lg:w-[180px] lg:flex-none lg:px-[15px] lg:py-0.5 2xl:mt-[62px] 2xl:w-[210px] 2xl:px-[18px] 2xl:py-1",
        className,
      )}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={cn(
            "flex items-center gap-2.5 border-b border-[#EDEAE0] py-3 last:border-b-0 sm:gap-[13px] sm:py-3.5 lg:last:border-b-0",
            i >= 2 && "xs:border-b-0 lg:border-b",
            itemClassName,
          )}
        >
          <Icon name={stat.icon} className="size-[26px] flex-none text-olive" />
          <span className="block">
            <span className="block text-lg leading-[1.15] font-semibold tracking-[-.2px] text-ink-deep sm:text-[19px] 2xl:text-[21px]">
              {stat.value}
            </span>
            <span className="block text-[11.5px] leading-[1.4] text-muted sm:text-xs">{stat.label}</span>
          </span>
        </div>
      ))}
    </aside>
  );
}
