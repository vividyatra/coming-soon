import Image from "next/image";
import type { Link } from "@/types/content";
import { ButtonLink } from "@/components/ui/Button";
import { PlaneLoop } from "@/components/ui/Decorations";
import { routes, site } from "@/data/site";

type Props = {
  script?: string;
  titleLines?: string[];
  text?: string;
  primary?: Link;
  secondary?: Link | null;
};

/** Closing call-to-action card — same design as the Home "Let's Plan Your Next Journey". */
export function CtaBanner({
  script = "Your story starts here",
  titleLines = ["Let’s Plan Your", "Next Journey"],
  text = "Share your dates and dream destination — our specialists will craft an itinerary just for you.",
  primary = { label: "Enquire Now", href: routes.planTrip },
  secondary = { label: `Call ${site.contact.phone}`, href: site.contact.phoneHref },
}: Props) {
  return (
    <section aria-label="Plan your trip" className="pt-14 md:pt-[72px] lg:pt-[84px]">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-2xl bg-moss-soft px-6 pt-10 pb-9 md:rounded-[20px] md:px-12 md:pt-12 lg:px-16 lg:py-14">
          <Image
            src="/images/706d355f-414f-4e11-b792-3420639ebfa1.png"
            alt=""
            aria-hidden="true"
            width={2172}
            height={724}
            sizes="(min-width: 992px) 64vw, 100vw"
            className="pointer-events-none absolute right-0 bottom-0 h-full w-full object-cover object-right opacity-30 mix-blend-luminosity lg:w-[64%] lg:[mask-image:linear-gradient(to_right,transparent,#000_35%)]"
          />
          <PlaneLoop className="absolute top-8 right-[8%] hidden w-[200px] opacity-80 md:block" stroke="#E7E4D4" plane="#EFEDDF" />

          <div className="relative">
            {script ? <p className="font-script text-[32px] leading-none text-[#F2EFE0] md:text-[40px]">{script}</p> : null}
            <h2 className="mt-3 text-[23px] leading-[1.4] font-semibold text-white xs:text-[26px] md:text-[32px] 2xl:text-[36px] 2xl:leading-[1.45]">
              {titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            {text ? <p className="mt-3 max-w-[480px] text-[15px] leading-[1.7] font-light text-white/80">{text}</p> : null}
            <div className="mt-7 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center xs:gap-4">
              <ButtonLink href={primary.href} variant="light" size="lg" icon="arrowRight">
                {primary.label}
              </ButtonLink>
              {secondary ? (
                <ButtonLink href={secondary.href} variant="outlineLight" size="lg" icon={secondary.href.startsWith("tel:") ? "phone" : "arrowRight"}>
                  {secondary.label}
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
