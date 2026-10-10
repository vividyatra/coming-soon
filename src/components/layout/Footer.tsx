import Image from "next/image";
import Link from "next/link";
import { footerColumns, headerCta, legalLinks, routes, site, socialLinks } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { TornEdge } from "@/components/ui/Decorations";

type ContactRow = { icon: IconName; label: string; value: string | string[]; href?: string; external?: boolean };

/* Two-column contact grid (stacked on mobile): Call / Email, Support / WhatsApp, Address / Hours. */
const contactRows: ContactRow[] = [
  { icon: "phone", label: "Call Us", value: site.contact.phone, href: site.contact.phoneHref },
  { icon: "mail", label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
  { icon: "headset", label: "Support", value: site.contact.supportEmail, href: `mailto:${site.contact.supportEmail}` },
  { icon: "whatsapp", label: "WhatsApp", value: site.contact.phone, href: site.contact.whatsappHref, external: true },
  { icon: "pin", label: "Address", value: site.contact.addressLines },
  { icon: "clock", label: "Hours", value: site.contact.hours },
];

/** Shared site footer - brand, quick links and company contact details; legal links sit in the bottom bar. */
export function Footer() {
  return (
    <footer className="relative mt-6 text-white">
      {/* torn-paper edge leading into the footer */}
      <TornEdge fill="#3F4A1C" stroke="#3F4A1C" className="relative z-10 -mb-px h-[42px] md:h-[62px]" />

      <div className="relative overflow-hidden bg-olive-dark">
        {/* faint mountain illustration */}
        <Image
          src="/images/706d355f-414f-4e11-b792-3420639ebfa1.jpg"
          alt=""
          aria-hidden="true"
          width={2172}
          height={724}
          sizes="100vw"
          className="pointer-events-none absolute bottom-0 left-0 w-full opacity-[.12] mix-blend-luminosity [mask-image:linear-gradient(to_bottom,transparent,#000_45%)]"
        />

        <div className="container-site relative pt-10 md:pt-14">
          <div className="grid gap-x-8 gap-y-10 pb-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,.6fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-9 xl:gap-x-12">
            {/* brand */}
            <div>
              <Link href={routes.home} aria-label={`${site.name} home`} className="block w-[88px] md:w-[104px]">
                <Image src={site.footerLogo.src} alt={site.footerLogo.alt} width={392} height={373} className="h-auto w-full" unoptimized />
              </Link>
              <p className="mt-5 font-script text-[34px] leading-none text-[#F2EFE0] md:text-[40px]">Travel, beautifully planned.</p>
              <p className="mt-3 max-w-[420px] text-[14.5px] leading-[1.7] font-light text-white/75">{site.description}</p>

              <p className="mt-7 text-[13px] tracking-[1.6px] text-white/70 uppercase">Follow our journeys</p>
              <ul className="mt-3 flex flex-wrap items-center gap-[13px]">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex size-9 items-center justify-center rounded-full bg-white text-olive-dark transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <Icon name={social.icon} className="size-[20px]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links (Privacy / Terms live in the bottom bar) */}
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={`Footer ${column.title}`}>
                <h2 className="mb-5 font-sans text-[17px] font-medium text-white md:text-lg">{column.title}</h2>
                <ul className="space-y-[13px]">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-block text-[14.5px] text-white/80 transition-all duration-200 hover:translate-x-1 hover:text-white md:text-[15px]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* company contact details — spans two columns, 2-column inner grid from 576px */}
            <div className="sm:col-span-2">
              <h2 className="mb-5 font-sans text-[17px] font-medium text-white md:text-lg">Contact Us</h2>
              <address className="not-italic">
                <ul className="grid gap-x-6 gap-y-[18px] sm:grid-cols-2 xl:gap-x-8">
                  {contactRows.map((row) => (
                    <li key={row.label} className="flex items-start gap-[13px]">
                      <span className="flex size-9 flex-none items-center justify-center rounded-full bg-white/10 text-white">
                        <Icon name={row.icon} className="size-[18px]" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[12px] tracking-[1.2px] text-white/70 uppercase">{row.label}</span>
                        {row.href ? (
                          <a
                            href={row.href}
                            target={row.external ? "_blank" : undefined}
                            rel={row.external ? "noopener noreferrer" : undefined}
                            className="block text-[14.5px] leading-[1.55] [overflow-wrap:anywhere] text-white/90 transition-colors hover:text-white md:text-[15px] lg:text-[14.5px] xl:text-[15px]"
                          >
                            {row.value}
                          </a>
                        ) : (
                          <span className="block text-[14.5px] leading-[1.55] text-white/90 md:text-[15px] lg:text-[14.5px] xl:text-[15px]">
                            {Array.isArray(row.value)
                              ? row.value.map((line) => (
                                  <span key={line} className="block">
                                    {line}
                                  </span>
                                ))
                              : row.value}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </address>
              <ButtonLink href={headerCta.href} variant="light" icon="arrowRight" className="mt-7">
                {headerCta.label}
              </ButtonLink>
            </div>
          </div>

          {/* bottom bar */}
          <div className="flex flex-col gap-4 border-t border-white/18 pt-6 pb-8 text-[13px] md:text-sm lg:flex-row lg:items-center lg:justify-between">
            <p>&copy; {new Date().getFullYear()} {site.legalName}. All Rights Reserved.</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/75 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p>
              Designed with <span className="text-[#F0EAD6]" aria-label="love">&#10084;</span> for Amazing Journeys
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
