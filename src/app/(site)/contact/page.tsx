import type { Metadata } from "next";
import Link from "next/link";
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

export const metadata: Metadata = {
  title: "Contact Us | Vivid Yatra",
};

const channels: { icon: IconName; title: string; value: string; note: string; href: string; external?: boolean }[] = [
  { icon: "phone", title: "Call us", value: site.contact.phone, note: "Mon – Sat, 10 AM – 7 PM", href: site.contact.phoneHref },
  { icon: "whatsapp", title: "WhatsApp", value: "Chat with a specialist", note: "Replies within minutes", href: site.contact.whatsappHref, external: true },
  { icon: "mail", title: "Email", value: site.contact.email, note: "Reply within 1 working day", href: `mailto:${site.contact.email}` },
  { icon: "pin", title: "Visit us", value: "Connaught Place, New Delhi", note: "By appointment", href: "#location" },
];

const hours = [
  { day: "Monday – Friday", time: "10:00 AM – 7:00 PM" },
  { day: "Saturday", time: "10:00 AM – 5:00 PM" },
  { day: "Sunday", time: "Closed (on-trip support only)" },
  { day: "On-trip emergencies", time: "24/7 on WhatsApp & phone" },
];

const faqs = [
  { question: "How quickly will you respond?", answer: "We reply to every enquiry within 24 hours — usually much sooner during business hours." },
  { question: "Can I meet you in person?", answer: "Yes. Our New Delhi office welcomes visitors by appointment, Monday to Saturday." },
  { question: "I’m travelling right now and need help. Who do I call?", answer: "Call or WhatsApp your trip manager, or our 24/7 on-trip support line at +91 98765 43210." },
  { question: "Do you handle corporate or group travel?", answer: "Yes — choose ‘Group / corporate travel’ in the form and our groups team will get in touch." },
];

export default async function ContactPage() {
  const faqGroup = await getFaqGroup("general");

  return (
    <>
      {/* Hero */}
      <PageHero
        image={india("delhi-india-gate", "India Gate in New Delhi at dusk")}
        breadcrumbs={[{ label: "Home", href: routes.home }, { label: "Contact" }]}
        script="We’d love to hear from you"
        title="Contact Us"
        subtitle="Questions, ideas or a trip already in mind — our travel specialists are a call, message or email away."
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
      <Section id="write-to-us" eyebrow="Send a Message" title="Get in Touch" subtitle="Fill in the form and we’ll get back to you within one working day." align="left">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10">
          <div className="rounded-2xl border border-[#E7E2D3] bg-card p-6 md:p-8 lg:p-10">
            <ContactForm />
          </div>

          <div className="space-y-5">
            {/* Office / Business Information */}
            <div className="rounded-2xl border border-line-soft bg-white p-6 shadow-tile md:p-7">
              <p className="inline-flex items-center gap-2 font-serif text-[20px] font-semibold text-ink">
                <Icon name="culture" className="size-5 text-olive" />
                Head Office
              </p>
              <p className="mt-3 text-[15px] leading-[1.7] text-body">
                <strong className="font-semibold text-ink">{site.name} Travels Pvt. Ltd.</strong>
                <br />
                {site.contact.address}
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

            <Link href={routes.planTrip} className="group flex items-center justify-between gap-4 rounded-2xl border border-dashed border-olive/50 bg-cream-2/60 p-5 transition-colors hover:bg-cream-2">
              <span>
                <span className="block text-[15.5px] font-semibold text-ink">Already know where you want to go?</span>
                <span className="block text-[13.5px] text-subtle">Use our step-by-step Trip Planner.</span>
              </span>
              <Icon name="arrowRight" className="size-5 flex-none text-olive transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Section>

      {/* Location / Map */}
      <Section id="location" eyebrow="Find Us" title="Our Location" align="left">
        <MapEmbed query={`Connaught Place, New Delhi`} title="Map of the Vivid Yatra office" />
      </Section>

      {/* FAQ */}
      <Section id="faq" eyebrow="Good To Know" title="Frequently Asked Questions" width="narrow">
        <FaqAccordion faqs={[...faqs, ...(faqGroup?.items.slice(0, 2) ?? [])]} name="contact-faq" />
      </Section>

      {/* Final CTA */}
      <CtaBanner primary={{ label: "Plan Your Trip", href: routes.planTrip }} />
    </>
  );
}
