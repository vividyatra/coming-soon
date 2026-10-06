import { Fragment } from "react";
import type { Feature } from "@/types/content";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/** Light features bar from the original Destinations page (Custom Travel · Best Price · 24/7 · Safe). */
export function FeaturesBar({ features, className }: { features: Pick<Feature, "icon" | "title" | "description">[]; className?: string }) {
  return (
    <section aria-label="Why travel with us" className={cn("pt-5 pb-11 sm:pt-[22px] sm:pb-[54px] lg:pt-5 lg:pb-16", className)}>
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)] md:px-3">
        <div className="grid grid-cols-1 gap-5 rounded-2xl border border-[#E8E3D4] bg-[#F4F1E6] px-5 py-[22px] sm:grid-cols-2 sm:gap-x-[30px] sm:gap-y-6 sm:rounded-[14px] sm:px-7 sm:py-[26px] lg:flex lg:items-center lg:gap-3.5 lg:px-[26px] lg:py-7 2xl:gap-5 2xl:px-[34px] 2xl:py-[30px]">
          {features.map((feature, i) => (
            <Fragment key={feature.title}>
              {i > 0 ? <span className="hidden h-[46px] w-px flex-none bg-[#E2DCCA] lg:block" aria-hidden="true" /> : null}
              <div className={`flex min-w-0 flex-1 items-center gap-3 2xl:gap-4 2xl:pl-[22px] ${i === 0 ? "3xl:pl-[34px]" : ""}`}>
                <Icon name={feature.icon} className="size-[30px] flex-none text-olive 2xl:size-11" />
                <span className="block min-w-0">
                  <span className="block text-[15px] leading-[1.35] font-semibold text-ink lg:whitespace-nowrap 2xl:text-[15.5px]">
                    {feature.title}
                  </span>
                  <span className="mt-1 block text-xs leading-[1.35] font-light text-muted lg:whitespace-nowrap 2xl:text-[12.5px]">
                    {feature.description}
                  </span>
                </span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
