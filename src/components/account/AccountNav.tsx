"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "@/data/site";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/Icon";

const items: { href: string; label: string; icon: IconName; exact?: boolean }[] = [
  { href: routes.account, label: "Dashboard", icon: "grid", exact: true },
  { href: `${routes.account}/bookings`, label: "My Bookings", icon: "suitcase" },
  { href: `${routes.account}/enquiries`, label: "My Enquiries", icon: "chat" },
  { href: `${routes.account}/profile`, label: "Profile & Settings", icon: "user" },
  { href: `${routes.account}#saved`, label: "Saved Packages", icon: "heart" },
];

export function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        try {
          window.localStorage.removeItem("vivid-yatra:session");
        } catch {}
        router.push(routes.login);
      }}
      className={cn("inline-flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14.5px] font-medium text-[#A8442C] transition-colors hover:bg-[#F6E9E4]", className)}
    >
      <Icon name="logout" className="size-[18px]" />
      Log out
    </button>
  );
}

/** Account navigation — vertical on desktop, scrollable pills on mobile. */
export function AccountNav() {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) => (href.includes("#") ? false : exact ? pathname === href : pathname.startsWith(href));

  return (
    <nav aria-label="Account">
      <ul className="-mx-1 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <li key={item.href} className="flex-none">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex w-full items-center gap-3 rounded-full border px-4 py-2 text-[14px] font-medium whitespace-nowrap transition-colors lg:rounded-xl lg:border-0 lg:px-3.5 lg:py-2.5 lg:text-[14.5px]",
                  active ? "border-olive bg-olive text-white" : "border-line-soft bg-white text-ink-soft hover:border-olive hover:text-olive lg:bg-transparent lg:hover:bg-cream-2",
                )}
              >
                <Icon name={item.icon} className="size-[18px]" />
                {item.label}
              </Link>
            </li>
          );
        })}
        <li className="flex-none lg:mt-2 lg:border-t lg:border-line-soft lg:pt-2">
          <LogoutButton className="rounded-full border border-line-soft bg-white px-4 py-2 lg:w-full lg:rounded-xl lg:border-0 lg:bg-transparent lg:px-3.5 lg:py-2.5" />
        </li>
      </ul>
    </nav>
  );
}
