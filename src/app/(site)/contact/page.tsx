import type { Metadata } from "next";
import { getFaqGroup } from "@/lib/catalog";
import { routes, site, socialLinks } from "@/data/site";
import { india } from "@/data/catalog/media";
import { PageHero } from "@/components/templates/PageHero";
import { Section } from "@/components/templates/Section";
import { FaqAccordion } from "@/components/templates/FaqAccordion";
import { CtaBanner } from "@/components/templates/CtaBanner";
import { MapEmbed } from "@/components/templates/MapEmbed";
import { ContactForm } from "@/components/contact/ContactForm";
import { Icon, type IconName } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, jsonLdGraph, organizationSchema, pageMetadata, webPageSchema } from "@/lib/seo";

const page = {
  title: "Contact Our Travel Planners in Solan",
  description:
    "Contact Vivid Yatra in Solan, Himachal Pradesh. Call or WhatsApp +91 99159 68487 or email info@vividyatra.com to plan a holiday, group tour or corporate trip.",
  path: routes.contact,
};

export const metadata: Metadata = pageMetadata(page);

const channels: { icon: IconName; title: string; value: string; note: string; href: string; external?: boolean }[] = [
  { icon: "phone", title: "Call us", value: site.contact.phone, note: site.contact.hours, href: site.contact.phoneHref },
  { icon: "whatsapp", title: "WhatsApp", value: "Chat with a planner", note: "Quick questions & trip updates", href: site.contact.whatsappHref, external: true },
  { icon: "mail", title: "Email", value: site.contact.email, note: "New enquiries & quotes", href: `mailto:${site.contact.email}` },
  { icon: "pin", title: "Visit us", value: site.contact.city, note: "Please call before you visit", href: "#location" },
];

const hours = [
  { day: "Office hours", time: site.contact.hours },
  { day: "Email & form enquiries", time: "We aim to reply within 24 hours" },
];

/* Contact-specific answers (direct, 40–60 words), followed by two general FAQs. */
const faqs = [
  {
    question: "How quickly will Vivid Yatra reply to my message?",
    answer: `We aim to reply to every enquiry within 24 hours, and often sooner during our office hours of ${site.contact.hours}. For anything urgent, such as a trip that starts in the next few days, please call or WhatsApp us on ${site.contact.phone} instead of emailing.`,
  },
  {
    question: "Which contact option should I use?",
    answer: `Use the form or ${site.contact.email} for new enquiries and quotes, and ${site.contact.supportEmail} for help with an existing booking. For quick questions, or anything time-sensitive while you are travelling, call or WhatsApp ${site.contact.phone} so we can respond as fast as possible.`,
  },
  {
    question: "Do you handle group tours and corporate travel?",
    answer:
      "Yes. Choose ‘Group tour’ or ‘Corporate travel’ as the subject in the form and tell us the group size, preferred dates, budget and any meeting or activity needs. We will come back with suggested stays, transport and an itinerary, shared in one clear written quote.",
  },
];

export default async function ContactPage() {
  const faqGroup = await getFaqGroup("general");

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageSchema("ContactPage", { path: page.path, name: `${page.title} | Vivid Yatra`, description: page.description }),
          breadcrumbSchema([
            { name: "Home", path: routes.home },
            { name: "Contact", path: routes.contact },
          ]),
          organizationSchema(),
        )}
      />

      {/* Hero */}
      <PageHero
        image={india("shimla-hills", "Houses spread across the green hills of Shimla, Himachal Pradesh")}
        breadcrumbs={[{ label: "Home", href: routes.home }, { label: "Contact" }]}
        script="We’d love to hear from you"
        title="Contact Our Travel Planners in Solan"
        subtitle="Planning a holiday, honeymoon, group tour or corporate trip? Call, WhatsApp, email or visit our office in Solan, Himachal Pradesh."
        size="sm"
      />

      {/* Contact Information */}
      <section aria-label="Contact information" className="relative z-[4] pt-8 md:pt-10">
        <div className="container-site">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:gap-5">
            {channels.map((c) => (
              <li key={c.title}>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="group flex h-full items-start gap-4 rounded-[14px] border border-line-soft bg-white p-5 shadow-tile transition-all hover:-translate-y-0.5 hover:border-olive hover:shadow-card"
                >
                  <span className="flex size-12 flex-none items-center justify-center rounded-full bg-cream-2 text-olive transition-colors group-hover:bg-olive group-hover:text-white">
                    <Icon name={c.icon} className="size-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-medium tracking-[.6px] text-muted uppercase">{c.title}</span>
                    <span className="mt-0.5 block text-[15.5px] font-semibold break-words text-ink">{c.value}</span>
                    <span className="mt-0.5 block text-[13px] text-subtle">{c.note}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact Form + Office / Business Information + Business Hours */}
      <Section id="write-to-us" eyebrow="Send a Message" title="Tell Us About Your Trip" subtitle="Share a few details and we aim to get back to you within 24 hours." align="left">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10">
          <div className="rounded-2xl border border-[#E7E2D3] bg-card p-6 md:p-8 lg:p-10">
            <ContactForm />
          </div>

          <div className="space-y-5">
            {/* Office / Business Information */}
            <div className="rounded-2xl border border-line-soft bg-white p-6 shadow-tile md:p-7">
              <p className="inline-flex items-center gap-2 font-serif text-[20px] font-semibold text-ink">
                <Icon name="culture" className="size-5 text-olive" />
                Our Office
              </p>
              <p className="mt-3 text-[15px] leading-[1.7] text-body">
                <strong className="font-semibold text-ink">{site.legalName}</strong>
                {site.contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <dl className="mt-4 space-y-2.5 text-[14.5px]">
                <div className="flex gap-3">
                  <dt className="w-20 flex-none text-muted">Phone</dt>
                  <dd>
                    <a href={site.contact.phoneHref} className="font-medium text-ink hover:text-olive">
                      {site.contact.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-20 flex-none text-muted">Email</dt>
                  <dd>
                    <a href={`mailto:${site.contact.email}`} className="font-medium break-all text-ink hover:text-olive">
                      {site.contact.email}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-20 flex-none text-muted">Support</dt>
                  <dd>
                    <a href={`mailto:${site.contact.supportEmail}`} className="font-medium break-all text-ink hover:text-olive">
                      {site.contact.supportEmail}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-20 flex-none text-muted">Website</dt>
                  <dd>
                    <a href={site.contact.websiteHref} className="font-medium text-ink hover:text-olive">
                      {site.contact.website}
                    </a>
                  </dd>
                </div>
              </dl>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-line-soft pt-5">
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="flex size-9 items-center justify-center rounded-full bg-cream-2 text-olive-dark transition-colors hover:bg-olive hover:text-white">
                    <Icon name={s.icon} className="size-[18px]" />
                  </a>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="rounded-2xl bg-moss p-6 text-white md:p-7">
              <p className="inline-flex items-center gap-2 font-serif text-[20px] font-semibold text-white">
                <Icon name="clock" className="size-5" />
                Business Hours
              </p>
              <ul className="mt-4 divide-y divide-white/15">
                {hours.map((h) => (
                  <li key={h.day} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-0.5 py-3 text-[14.5px]">
                    <span className="text-white/80">{h.day}</span>
                    <span className="font-semibold text-white">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a href="#write-to-us" className="group flex items-center justify-between gap-4 rounded-2xl border border-dashed border-olive/50 bg-cream-2/60 p-5 transition-colors hover:bg-cream-2">
              <span>
                <span className="block text-[15.5px] font-semibold text-ink">Already know where you want to go?</span>
                <span className="block text-[13.5px] text-subtle">Share your plans in the form and we&apos;ll shape the trip around you.</span>
              </span>
              <Icon name="arrowRight" className="size-5 flex-none text-olive transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </Section>

      {/* Location / Map */}
      <Section id="location" eyebrow="Find Us" title="Where Is Our Office in Solan?" align="left">
        <MapEmbed
          query={site.contact.address}
          embedUrl={site.contact.mapEmbedUrl}
          mapsUrl={site.contact.mapUrl}
          title={`Map of the ${site.name} office in ${site.contact.city}`}
        />
      </Section>

      {/* FAQ */}
      <Section id="faq" eyebrow="Good To Know" title="Questions About Contacting Us" width="narrow">
        <FaqAccordion faqs={[...faqs, ...(faqGroup?.items.slice(0, 2) ?? [])]} name="contact-faq" />
      </Section>

      {/* Final CTA */}
      <CtaBanner primary={{ label: "Plan Your Trip", href: "#write-to-us" }} />
    </>
  );
}
