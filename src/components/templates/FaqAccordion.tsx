import type { Faq } from "@/types/content";
import { cn } from "@/lib/utils";
import { BaseIcon as Icon } from "@/components/ui/iconsBase";

/** Native <details> accordion in the Home FAQ style — works without JavaScript. */
export function FaqAccordion({ faqs, name, openFirst = true, className }: { faqs: Faq[]; name: string; openFirst?: boolean; className?: string }) {
  return (
    <div className={cn("space-y-3.5", className)}>
      {faqs.map((faq, i) => (
        <details
          key={faq.question}
          name={name}
          open={openFirst && i === 0}
          className="faq-item group rounded-xl border border-line-soft bg-white shadow-tile transition-shadow open:shadow-card"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-[18px] text-[15.5px] leading-[1.45] font-semibold text-ink transition-colors hover:text-olive md:px-6 md:py-5 md:text-base">
            {faq.question}
            <span className="flex size-8 flex-none items-center justify-center rounded-full bg-cream-2 text-olive transition-transform duration-300 group-open:rotate-45 group-open:bg-olive group-open:text-white">
              <Icon name="plus" className="size-4" />
            </span>
          </summary>
          <p className="-mt-1 px-5 pb-5 text-[14.5px] leading-[1.75] text-body md:px-6 md:pb-6 md:text-[15px]">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
