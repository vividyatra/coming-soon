import type { Metadata } from "next";
import Link from "next/link";
import { getBookings } from "@/lib/catalog";
import { routes } from "@/data/site";
import { BookingRow, EmptyState, Panel, isUpcoming } from "@/components/account/AccountUi";

export const metadata: Metadata = {
  title: "My Bookings | Vivid Yatra",
};

export default async function MyBookingsPage() {
  const bookings = await getBookings();
  const upcoming = bookings.filter((b) => isUpcoming(b.status));
  const past = bookings.filter((b) => !isUpcoming(b.status));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-semibold text-ink md:text-[34px]">My Bookings</h1>
        <p className="mt-1 text-[15px] text-subtle">Status, travel dates and payments for every trip you’ve booked with us.</p>
      </div>

      {/* Upcoming Bookings */}
      <Panel title={`Upcoming Bookings (${upcoming.length})`}>
        {upcoming.length ? (
          <div className="space-y-4">
            {upcoming.map((b) => (
              <BookingRow key={b.id} booking={b} />
            ))}
          </div>
        ) : (
          <EmptyState icon="suitcase" title="No upcoming bookings" text="Find your next trip in our tour packages." action={<Link href={routes.packages} className="font-medium text-olive hover:underline">Browse packages</Link>} />
        )}
      </Panel>

      {/* Past Bookings */}
      <Panel title={`Past Bookings (${past.length})`}>
        {past.length ? (
          <div className="space-y-4">
            {past.map((b) => (
              <BookingRow key={b.id} booking={b} />
            ))}
          </div>
        ) : (
          <EmptyState icon="flag" title="No past bookings" text="Completed and cancelled bookings will appear here." />
        )}
      </Panel>
    </div>
  );
}
