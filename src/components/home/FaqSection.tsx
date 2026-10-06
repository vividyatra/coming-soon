import type { Faq } from "@/types/content";
import { routes, site } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <section aria-labelledby="faq-title" className="pt-14 md:pt-[72px] lg:pt-[84px]">
      <div className="container-site grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-14 2xl:gap-20">
        <div>
          <SectionHeading
            eyebrow="Good To Know"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know before planning your journey with us."
            align="left"
            titleId="faq-title"
          />

          {/* support card */}
          <div className="relative mt-2 overflow-hidden rounded-2xl border border-line-soft bg-white p-6 shadow-tile md:p-7">
            <Icon name="headset" className="absolute -right-5 -bottom-5 size-[120px] text-cream-2" />
            <div className="relative">
              <p className="font-script text-[32px] leading-none text-olive">Still have questions?</p>
              <p className="mt-3 max-w-[340px] text-[14.5px] leading-[1.65] text-body">
                Our travel specialists are happy to help — call, WhatsApp or send us an enquiry.
              </p>
              <ul className="mt-5 space-y-3">
                <li>
                  <a href={site.contact.phoneHref} className="inline-flex items-center gap-3 text-[15px] font-medium text-ink hover:text-olive">
                    <span className="flex size-9 items-center justify-center rounded-full bg-cream-2 text-olive">
                      <Icon name="phone" className="size-[18px]" />
                    </span>
                    {site.contact.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-3 text-[15px] font-medium text-ink hover:text-olive">
                    <span className="flex size-9 items-center justify-center rounded-full bg-cream-2 text-olive">
                      <Icon name="mail" className="size-[18px]" />
                    </span>
                    {site.contact.email}
                  </a>
                </li>
              </ul>
              <ButtonLink href={routes.enquire} icon="arrowRight" className="mt-6">
                Enquire Now
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="space-y-3.5 lg:pt-2">
          {faqs.map((faq, i) => (
            <details
              key={faq.question}
              name="home-faq"
              open={i === 0}
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
      </div>
    </section>
  );
}
