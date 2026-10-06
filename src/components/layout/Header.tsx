"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { headerCta, headerSecondaryCta, mainNav, routes, site } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === routes.home) return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Shared site header — identical on every public page. */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // close the mobile menu on navigation and on Escape
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="relative z-30">
      <div className="container-wide flex h-20 items-center justify-between gap-3.5 md:h-[92px] xl:h-[105px] xl:gap-6">
        <Link href={routes.home} className="flex h-[80%] flex-none items-center" aria-label={`${site.name} home`}>
          <Image src={site.logo.src} alt={site.logo.alt} width={799} height={804} className="h-full w-auto" preload unoptimized />
        </Link>

        {/* desktop navigation */}
        <nav aria-label="Main" className="hidden flex-auto justify-center xl:flex">
          <ul className="flex items-center gap-6 3xl:gap-[30px] 4xl:gap-[34px]">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex items-center py-1 text-[15px] font-medium tracking-[.1px] transition-colors duration-200 hover:text-olive 3xl:text-[15.5px]",
                      active
                        ? "text-olive after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-olive"
                        : "text-ink-soft",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-none items-center gap-2.5 sm:gap-4">
          <ButtonLink
            href={headerSecondaryCta.href}
            variant="outline"
            className="hidden bg-white/70 backdrop-blur-sm 2xl:inline-flex 2xl:h-[48px] 2xl:text-[14.5px]"
          >
            {headerSecondaryCta.label}
          </ButtonLink>
          <ButtonLink
            href={headerCta.href}
            icon="arrowRight"
            className="hidden h-[42px] rounded-[9px] px-4 text-[13.5px] sm:inline-flex md:h-[46px] md:pr-5 md:pl-6 md:text-[15px] [&>svg]:hidden md:[&>svg]:block"
          >
            {headerCta.label}
          </ButtonLink>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobileNav"
            className="flex size-[42px] flex-none items-center justify-center rounded-full border border-white bg-white text-black transition-colors duration-200 hover:border-olive md:size-[46px] xl:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="size-5" />
          </button>
        </div>
      </div>

      {/* mobile / tablet dropdown — same white card as the original */}
      <nav
        id="mobileNav"
        aria-label="Main"
        className={cn(
          "absolute inset-x-[var(--gutter)] top-full z-40 rounded-[14px] bg-white px-1.5 py-2.5 shadow-soft xl:hidden",
          open ? "block" : "hidden",
        )}
      >
        <ul className="flex flex-col">
          {mainNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between border-b border-[#F0EDE4] px-4 py-[13px] text-[15.5px] font-medium",
                    active ? "text-olive" : "text-ink-soft hover:text-olive",
                  )}
                >
                  {item.label}
                  {active ? <span className="size-1.5 rounded-full bg-olive" aria-hidden="true" /> : null}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="grid grid-cols-2 gap-2.5 px-2.5 pt-3.5 pb-1.5">
          <ButtonLink href={headerSecondaryCta.href} variant="outline" className="w-full">
            {headerSecondaryCta.label}
          </ButtonLink>
          <ButtonLink href={headerCta.href} className="w-full">
            {headerCta.label}
          </ButtonLink>
        </div>
      </nav>
    </header>
  );
}
