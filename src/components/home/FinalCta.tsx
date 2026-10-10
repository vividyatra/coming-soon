import Image from "next/image";
import { routes, site } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { PlaneLoop } from "@/components/ui/Decorations";

/** Closing call-to-action — the original Blog CTA band, presented as a card. */
export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="pt-14 md:pt-[72px] lg:pt-[84px]">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-2xl bg-moss-soft px-6 pt-10 pb-9 md:rounded-[20px] md:px-12 md:pt-12 lg:px-16 lg:py-14">
          <Image
            src="/images/706d355f-414f-4e11-b792-3420639ebfa1.jpg"
            alt=""
            aria-hidden="true"
            width={2172}
            height={724}
            sizes="(min-width: 992px) 64vw, 100vw"
            className="pointer-events-none absolute right-0 bottom-0 h-full w-full object-cover object-right opacity-30 mix-blend-luminosity lg:w-[64%] lg:[mask-image:linear-gradient(to_right,transparent,#000_35%)]"
          />
          <PlaneLoop className="absolute top-8 right-[8%] hidden w-[200px] opacity-80 md:block" stroke="#E7E4D4" plane="#EFEDDF" />

          <div className="relative">
            <p className="font-script text-[32px] leading-none text-[#F2EFE0] md:text-[40px]">Your story starts here</p>
            <h2 id="cta-title" className="mt-3 text-[23px] leading-[1.4] font-semibold text-white xs:text-[26px] md:text-[32px] 2xl:text-[36px] 2xl:leading-[1.45]">
              <span className="block">Let&rsquo;s Plan Your</span>
              <span className="block">Next Journey</span>
            </h2>
            <p className="mt-3 max-w-[460px] text-[15px] leading-[1.7] font-light text-white/80">
              Share your dates and dream destination — our travel planners will shape an itinerary just for you.
            </p>
            <div className="mt-7 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center xs:gap-4">
              <ButtonLink href={routes.contact} variant="light" size="lg" icon="arrowRight">
                Enquire Now
              </ButtonLink>
              <ButtonLink href={site.contact.phoneHref} variant="outlineLight" size="lg" icon="phone">
                Call {site.contact.phone}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
