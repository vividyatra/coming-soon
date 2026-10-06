import type { Metadata } from "next";
import Link from "next/link";
import { getBookings, getCustomer, getEnquiries, getPackagesBySlugs } from "@/lib/catalog";
import { routes } from "@/data/site";
import { BookingRow, EmptyState, Panel, StatTile, StatusBadge, isUpcoming } from "@/components/account/AccountUi";
import { LogoutButton } from "@/components/account/AccountNav";
import { PackageCard } from "@/components/cards/PackageCard";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "My Account | Vivid Yatra",
};

type SearchParams = Promise<{ welcome?: string }>;

export default async function AccountDashboard({ searchParams }: { searchParams: SearchParams }) {
  const [params, customer, bookings, enquiries] = await Promise.all([searchParams, getCustomer(), getBookings(), getEnquiries()]);
  const saved = await getPackagesBySlugs(customer.savedPackages);
  const upcoming = bookings.filter((b) => isUpcoming(b.status));
  const past = bookings.filter((b) => b.status === "Completed");
  const activeEnquiries = enquiries.filter((e) => e.status !== "Converted" && e.status !== "Closed");

  return (
    <div className="space-y-6">
      {/* Welcome */}
      {params.welcome ? (
        <div className="flex items-start gap-3 rounded-2xl bg-olive px-5 py-4 text-white" role="status">
          <Icon name="sparkle" className="mt-0.5 size-5 flex-none" />
          <p className="text-[15px]">Welcome aboard! Your account is ready — start by exploring packages or planning a custom trip.</p>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatTile icon="calendar" value={upcoming.length} label="Upcoming trips" href="#upcoming" />
        <StatTile icon="suitcase" value={bookings.length} label="Total bookings" href={`${routes.account}/bookings`} />
        <StatTile icon="chat" value={activeEnquiries.length} label="Active enquiries" href={`${routes.account}/enquiries`} />
        <StatTile icon="heart" value={saved.length} label="Saved packages" href="#saved" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        {/* Upcoming Trips */}
        <Panel id="upcoming" title="Upcoming Trips" action={<Link href={`${routes.account}/bookings`} className="text-[14px] font-medium text-olive hover:underline">All bookings</Link>}>
          {upcoming.length ? (
            <div className="space-y-4">
              {upcoming.map((b) => (
                <BookingRow key={b.id} booking={b} />
              ))}
            </div>
          ) : (
            <EmptyState icon="suitcase" title="No upcoming trips yet" text="Your next adventure is one enquiry away." action={<Link href={routes.planTrip} className="font-medium text-olive hover:underline">Plan a trip</Link>} />
          )}
        </Panel>

        {/* Profile */}
        <Panel title="Profile" action={<Link href={`${routes.account}/profile`} className="text-[14px] font-medium text-olive hover:underline">Edit</Link>}>
          <dl className="space-y-3 text-[14.5px]">
            {[
              ["Name", customer.name, "user"],
              ["Email", customer.email, "mail"],
              ["Phone", customer.phone, "phone"],
              ["City", customer.city, "pin"],
            ].map(([k, v, icon]) => (
              <div key={k} className="flex items-center gap-3">
                <Icon name={icon as "user"} className="size-4 flex-none text-olive" />
                <dt className="sr-only">{k}</dt>
                <dd className="min-w-0 break-words text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 border-t border-line-soft pt-4">
            <p className="text-[12.5px] font-medium tracking-[.6px] text-muted uppercase">Travel preferences</p>
            <p className="mt-1.5 text-[14px] text-body">Budget: {customer.preferences.budget}</p>
          </div>
        </Panel>
      </div>

      {/* My Enquiries */}
      <Panel title="My Enquiries" action={<Link href={`${routes.account}/enquiries`} className="text-[14px] font-medium text-olive hover:underline">View all</Link>}>
        <ul className="divide-y divide-line-soft">
          {enquiries.slice(0, 3).map((e) => (
            <li key={e.id} className="flex flex-wrap items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <p className="text-[15.5px] font-semibold text-ink">{e.destination}</p>
                <p className="text-[13px] text-muted">
                  #{e.id} · {e.travelMonth} · {e.travellers}
                </p>
              </div>
              <StatusBadge status={e.status} />
            </li>
          ))}
        </ul>
      </Panel>

      {/* Past Trips */}
      <Panel title="Past Trips">
        {past.length ? (
          <div className="space-y-4">
            {past.map((b) => (
              <BookingRow key={b.id} booking={b} />
            ))}
          </div>
        ) : (
          <EmptyState icon="flag" title="No past trips yet" text="Completed trips will appear here." />
        )}
      </Panel>

      {/* Saved / Favourite Packages */}
      <Panel id="saved" title="Saved Packages" action={<Link href={routes.packages} className="text-[14px] font-medium text-olive hover:underline">Browse packages</Link>}>
        <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
          {saved.map((p) => (
            <PackageCard key={p.slug} pkg={p} />
          ))}
        </div>
      </Panel>

      {/* Account Settings + Logout */}
      <Panel title="Account Settings">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {[
            { href: `${routes.account}/profile#personal`, icon: "user" as const, label: "Personal information" },
            { href: `${routes.account}/profile#password`, icon: "lock" as const, label: "Change password" },
            { href: `${routes.account}/profile#preferences`, icon: "settings" as const, label: "Preferences & notifications" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="flex items-center gap-3 rounded-xl border border-line-soft px-4 py-3.5 text-[14.5px] font-medium text-ink transition-colors hover:border-olive hover:text-olive">
              <Icon name={l.icon} className="size-5 text-olive" />
              {l.label}
            </Link>
          ))}
        </div>
        <div className="mt-4 border-t border-line-soft pt-4">
          <LogoutButton />
        </div>
      </Panel>
    </div>
  );
}
