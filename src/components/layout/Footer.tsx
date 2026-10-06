import Image from "next/image";
import Link from "next/link";
import { footerColumns, legalLinks, routes, site, socialLinks } from "@/data/site";
import { Icon, type IconName } from "@/components/ui/Icon";
import { TornEdge } from "@/components/ui/Decorations";

const contactRows: { icon: IconName; label: string; href?: string }[] = [
  { icon: "phone", label: site.contact.phone, href: site.contact.phoneHref },
  { icon: "mail", label: site.contact.email, href: `mailto:${site.contact.email}` },
  { icon: "web", label: site.contact.website, href: site.contact.websiteHref },
  { icon: "pin", label: site.contact.address },
  { icon: "clock", label: site.contact.hours },
];

/** Shared site footer — identical on every public page. */
export function Footer() {
  return (
    <footer className="relative mt-6 text-white">
      {/* torn-paper edge leading into the footer */}
      <TornEdge fill="#3F4A1C" stroke="#3F4A1C" className="relative z-10 -mb-px h-[42px] md:h-[62px]" />

      <div className="relative overflow-hidden bg-olive-dark">
        {/* faint mountain illustration + flight path */}
        <Image
          src="/images/706d355f-414f-4e11-b792-3420639ebfa1.png"
          alt=""
          aria-hidden="true"
          width={2172}
          height={724}
          sizes="100vw"
          className="pointer-events-none absolute bottom-0 left-0 w-full opacity-[.12] mix-blend-luminosity [mask-image:linear-gradient(to_bottom,transparent,#000_45%)]"
        />

        <div className="container-site relative pt-10 md:pt-14">
          {/* brand row */}
          <div className="flex flex-col gap-8 border-b border-white/15 pb-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
              <Link href={routes.home} aria-label={`${site.name} home`} className="block w-[88px] flex-none md:w-[104px]">
                <Image src={site.footerLogo.src} alt={site.footerLogo.alt} width={392} height={373} className="h-auto w-full" loading="eager" unoptimized />
              </Link>
              <div>
                <p className="font-script text-[34px] leading-none text-[#F2EFE0] md:text-[42px]">Travel, beautifully planned.</p>
                <p className="mt-3 max-w-[460px] text-[14.5px] leading-[1.7] font-light text-white/75">{site.description}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <div>
                <p className="text-[13px] tracking-[1.6px] text-white/60 uppercase">Follow our journeys</p>
                <ul className="mt-3 flex items-center gap-[13px]">
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
            </div>
          </div>

          {/* link columns + contact */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-3 xl:grid-cols-[1fr_1fr_1fr_1.05fr_1.55fr] xl:gap-x-8">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="mb-5 font-sans text-[17px] font-medium text-white md:text-lg">{column.title}</h2>
                <ul className="space-y-[13px]">
                  {column.links.map((link) => (
                    <li key={link.label}>
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

            <div className="col-span-2 md:col-span-3 xl:col-span-1">
              <h2 className="mb-5 font-sans text-[17px] font-medium text-white md:text-lg">Contact Us</h2>
              <ul className="grid gap-[16px] sm:grid-cols-2 xl:grid-cols-1">
                {contactRows.map((row) => (
                  <li key={row.label} className="flex items-start gap-[13px]">
                    <Icon name={row.icon} className="mt-0.5 size-[20px] flex-none text-white" />
                    {row.href ? (
                      <a href={row.href} className="text-[14.5px] leading-[1.55] text-white/85 transition-colors hover:text-white md:text-[15px]">
                        {row.label}
                      </a>
                    ) : (
                      <span className="text-[14.5px] leading-[1.55] text-white/85 md:text-[15px]">{row.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* bottom bar */}
          <div className="flex flex-col gap-4 border-t border-white/18 pt-6 pb-8 text-[13px] md:text-sm lg:flex-row lg:items-center lg:justify-between">
            <p>&copy; {new Date().getFullYear()} {site.name}. All Rights Reserved.</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
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
