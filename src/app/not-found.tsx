import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { routes } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { FlightPath } from "@/components/ui/Decorations";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  const links = [
    { href: routes.about, label: "About Us", icon: "users" as const },
    { href: routes.faq, label: "FAQs", icon: "info" as const },
    { href: routes.contact, label: "Contact Us", icon: "phone" as const },
    { href: routes.privacy, label: "Privacy Policy", icon: "shieldCheck" as const },
  ];
  return (
    <>
      <Header />
      <main id="main" className="relative overflow-hidden">
        <FlightPath className="absolute top-10 left-6 hidden h-[260px] w-[170px] opacity-70 md:block" />
        <div className="container-narrow py-16 text-center md:py-24">
          <p className="font-serif text-[88px] leading-none font-semibold text-olive/25 md:text-[140px]">404</p>
          <p className="-mt-4 font-script text-[36px] leading-none text-olive md:-mt-6 md:text-[48px]">Looks like you’re off the map</p>
          <h1 className="mt-4 text-[26px] font-semibold text-ink md:text-[34px]">We couldn’t find that page</h1>
          <p className="mx-auto mt-3 max-w-[480px] text-[15.5px] leading-[1.7] text-body">The page may have moved or no longer exists. Let’s get you back on the trail.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 xs:flex-row">
            <ButtonLink href={routes.home} icon="arrowRight" size="lg">
              Back to Home
            </ButtonLink>
            <ButtonLink href={routes.contact} variant="outline" size="lg">
              Plan Your Trip
            </ButtonLink>
          </div>
          <ul className="mx-auto mt-12 grid max-w-[640px] grid-cols-2 gap-3 sm:grid-cols-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="flex flex-col items-center gap-2 rounded-[14px] border border-line-soft bg-white px-3 py-4 text-[14px] font-medium text-ink shadow-tile transition-colors hover:border-olive hover:text-olive">
                  <Icon name={l.icon} className="size-6 text-olive" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
