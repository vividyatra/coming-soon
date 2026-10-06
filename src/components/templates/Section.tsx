import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  /** "band" adds the soft sand background used for alternating sections */
  tone?: "plain" | "band" | "paper";
  width?: "site" | "narrow" | "wide";
};

/** Standard section wrapper: consistent vertical rhythm + the site's section heading. */
export function Section({ id, eyebrow, title, subtitle, align = "center", action, children, className, tone = "plain", width = "site" }: Props) {
  const container = width === "narrow" ? "container-narrow" : width === "wide" ? "container-wide" : "container-site";
  return (
    <section
      id={id}
      aria-labelledby={id && title ? `${id}-title` : undefined}
      className={cn(
        "scroll-mt-24",
        tone === "plain" && "pt-14 md:pt-[72px] lg:pt-[84px]",
        tone !== "plain" && "mt-14 py-14 md:mt-[72px] md:py-[72px] lg:mt-[84px] lg:py-[84px]",
        tone === "band" && "bg-sand",
        tone === "paper" && "bg-paper",
        className,
      )}
    >
      <div className={container}>
        {title ? (
          <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} align={align} action={action} titleId={id ? `${id}-title` : undefined} />
        ) : null}
        {children}
      </div>
    </section>
  );
}
