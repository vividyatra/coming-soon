import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Media } from "@/types/content";
import { routes, site } from "@/data/site";
import { Icon } from "@/components/ui/Icon";

type Props = {
  image: Media;
  script: string;
  quote: string;
  cite: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

/** Auth template: photo panel (desktop) + form card. Used by /login and /register. */
export function AuthShell({ image, script, quote, cite, title, subtitle, children, footer }: Props) {
  return (
    <section className="container-wide pt-6 pb-4 md:pt-10">
      <div className="grid overflow-hidden rounded-[22px] border border-line-soft bg-white shadow-card lg:min-h-[640px] lg:grid-cols-[1fr_1.05fr]">
        {/* photo panel */}
        <div className="relative hidden lg:block">
          <Image src={image.src} alt={image.alt} fill preload sizes="50vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(18,22,12,.88)_0%,rgba(18,22,12,.35)_55%,rgba(18,22,12,.15)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 p-10 text-white 2xl:p-12">
            <p className="font-script text-[40px] leading-none text-[#F2EFE0]">{script}</p>
            <blockquote className="mt-4 max-w-[440px] font-serif text-[22px] leading-[1.5] italic">“{quote}”</blockquote>
            <p className="mt-3 text-[14px] text-white/80">— {cite}</p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-white/85">
              {["Track enquiries & bookings", "Download vouchers", "Save favourite packages"].map((b) => (
                <li key={b} className="inline-flex items-center gap-2">
                  <Icon name="check" className="size-4 text-[#F2EFE0]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* form */}
        <div className="flex flex-col justify-center px-5 py-9 sm:px-10 md:px-14 md:py-12 2xl:px-20">
          <Link href={routes.home} className="mb-6 inline-block w-14" aria-label={`${site.name} home`}>
            <Image src={site.logo.src} alt={site.logo.alt} width={799} height={804} className="h-auto w-full" unoptimized />
          </Link>
          <h1 className="text-[28px] font-semibold text-ink md:text-[34px]">{title}</h1>
          <p className="mt-1.5 text-[15px] leading-[1.6] text-subtle">{subtitle}</p>
          <div className="mt-7">{children}</div>
          <div className="mt-7 border-t border-line-soft pt-5 text-center text-[14.5px] text-subtle">{footer}</div>
        </div>
      </div>
    </section>
  );
}

/** Two-option segmented toggle (Email / Mobile, Password / OTP). */
export function Segmented<T extends string>({ options, value, onChange, label }: { options: { value: T; label: string }[]; value: T; onChange: (v: T) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="grid grid-cols-2 gap-1 rounded-xl bg-cream-2 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`h-10 rounded-lg text-[14px] font-medium transition-colors ${value === o.value ? "bg-white text-ink shadow-tile" : "text-subtle hover:text-ink"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
