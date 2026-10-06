import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBooking, getBookings } from "@/lib/catalog";
import { routes, site } from "@/data/site";
import { cn, formatINR } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Panel, StatusBadge } from "@/components/account/AccountUi";
import { CheckList } from "@/components/templates/Blocks";
import { ItineraryTimeline } from "@/components/packages/PackageDetailBlocks";
import { packageDuration } from "@/components/cards/PackageCard";

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  return (await getBookings()).map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  return { title: `Booking ${(await params).id} | Vivid Yatra` };
}

const STEPS = ["Booking received", "Advance paid", "Trip confirmed", "Vouchers issued", "Trip completed"];

export default async function BookingDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const booking = await getBooking(id);
  if (!booking || !booking.pkg) notFound();
  const pkg = booking.pkg;

  const reached = { "Pending Payment": 0, Confirmed: 3, Completed: 4, Cancelled: -1 }[booking.status];
  const due = booking.amount - booking.paid;
  const subtotal = Math.round(booking.amount / 1.05);
  const gst = booking.amount - subtotal;

  return (
    <div className="space-y-6">
      <div>
        <Link href={`${routes.account}/bookings`} className="inline-flex items-center gap-1.5 text-[14px] font-medium text-olive hover:underline">
          <Icon name="arrowLeft" className="size-4" />
          All bookings
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-[26px] font-semibold text-ink md:text-[32px]">Booking #{booking.id}</h1>
          <StatusBadge status={booking.status} />
        </div>
        <p className="mt-1 text-[14px] text-muted">Booked on {booking.bookedOn}</p>
      </div>

      {/* Booking Status */}
      <Panel title="Booking Status">
        {booking.status === "Cancelled" ? (
          <p className="rounded-xl bg-[#F6E9E4] px-4 py-3 text-[14.5px] text-[#A8442C]">This booking was cancelled. Any eligible refund has been processed to your original payment method.</p>
        ) : (
          <ol className="grid gap-4 sm:grid-cols-5">
            {STEPS.map((s, i) => {
              const done = i <= reached;
              return (
                <li key={s} className="flex items-center gap-3 sm:flex-col sm:text-center">
                  <span className={cn("flex size-9 flex-none items-center justify-center rounded-full border text-[13px] font-semibold", done ? "border-olive bg-olive text-white" : "border-line bg-white text-muted")}>
                    {done ? <Icon name="check" className="size-4" /> : i + 1}
                  </span>
                  <span className={cn("text-[13.5px]", done ? "font-semibold text-ink" : "text-muted")}>{s}</span>
                </li>
              );
            })}
          </ol>
        )}
        {booking.status === "Pending Payment" ? (
          <div className="mt-5 flex flex-col gap-3 rounded-xl bg-[#FBF1DC] p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[14.5px] text-[#6B4E10]">Pay the {formatINR(Math.round(booking.amount * 0.25))} advance to confirm your trip.</p>
            <a href={site.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center justify-center rounded-lg bg-olive px-4 text-[14px] font-medium text-white hover:bg-olive-dark">
              Request payment link
            </a>
          </div>
        ) : null}
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        {/* Package Details */}
        <Panel title="Package Details">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative h-40 overflow-hidden rounded-xl sm:h-auto sm:w-44 sm:flex-none">
              <Image src={pkg.image.src} alt={pkg.image.alt} fill sizes="176px" className="object-cover" />
            </div>
            <div>
              <h3 className="text-[19px] font-semibold text-ink">{pkg.title}</h3>
              <p className="mt-1 text-[14px] text-subtle">{pkg.placesCovered.join(" · ")}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-[14px] text-ink">
                <Icon name="clock" className="size-4 text-olive" />
                {packageDuration(pkg)}
              </p>
              <Link href={`${routes.packages}/${pkg.slug}`} className="mt-3 block text-[14px] font-medium text-olive hover:underline">
                View package page
              </Link>
            </div>
          </div>
          {/* Travel Dates */}
          <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line-soft bg-line-soft">
            {[
              ["Departure", booking.travelDate],
              ["Return", booking.returnDate],
            ].map(([k, v]) => (
              <div key={k} className="bg-white px-4 py-3">
                <dt className="text-[12px] font-medium tracking-[.5px] text-muted uppercase">{k}</dt>
                <dd className="text-[15.5px] font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Panel>

        {/* Price Summary */}
        <Panel title="Price Summary">
          <dl className="space-y-3 text-[14.5px]">
            <div className="flex justify-between gap-3">
              <dt className="text-subtle">Package cost</dt>
              <dd className="text-ink">{formatINR(subtotal)}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-subtle">GST (5%)</dt>
              <dd className="text-ink">{formatINR(gst)}</dd>
            </div>
            <div className="flex justify-between gap-3 border-t border-line-soft pt-3">
              <dt className="font-semibold text-ink">Total</dt>
              <dd className="font-serif text-[22px] leading-none font-semibold text-ink-deep">{formatINR(booking.amount)}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-subtle">Paid</dt>
              <dd className="font-medium text-olive-dark">{formatINR(booking.paid)}</dd>
            </div>
            {booking.status !== "Cancelled" ? (
              <div className="flex justify-between gap-3 rounded-lg bg-cream-2 px-3 py-2">
                <dt className="font-medium text-ink">Balance due</dt>
                <dd className="font-semibold text-ink">{formatINR(due)}</dd>
              </div>
            ) : null}
          </dl>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {["Download voucher", "Download invoice"].map((l) => (
              <button key={l} type="button" disabled={booking.status !== "Confirmed" && booking.status !== "Completed"} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-line text-[13.5px] font-medium text-ink hover:border-olive hover:text-olive disabled:cursor-not-allowed disabled:opacity-50">
                <Icon name="download" className="size-4" />
                {l}
              </button>
            ))}
          </div>
        </Panel>
      </div>

      {/* Traveller Details */}
      <Panel title="Traveller Details">
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {booking.travellerNames.map((n, i) => (
            <li key={n} className="flex items-center gap-3 rounded-xl border border-line-soft px-4 py-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-cream-2 text-olive">
                <Icon name="user" className="size-4" />
              </span>
              <span>
                <span className="block text-[15px] font-semibold text-ink">{n}</span>
                <span className="block text-[12.5px] text-muted">{i === 0 ? "Lead traveller" : `Traveller ${i + 1}`}</span>
              </span>
            </li>
          ))}
        </ul>
      </Panel>

      {/* Itinerary */}
      <Panel title="Itinerary">
        <ItineraryTimeline days={pkg.itinerary} />
      </Panel>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Inclusions */}
        <Panel title="Inclusions">
          <CheckList items={pkg.inclusions} />
        </Panel>
        {/* Important Information */}
        <Panel title="Important Information">
          <CheckList items={pkg.importantInfo} variant="dot" />
        </Panel>
      </div>

      {/* Booking Support */}
      <Panel title="Booking Support" className="bg-moss text-white [&_h2]:text-white">
        <p className="text-[15px] text-white/85">Your trip manager is here for changes, questions and on-trip help — 24/7 while you travel.</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <a href={site.contact.phoneHref} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-paper px-5 text-[14.5px] font-medium text-ink hover:bg-white">
            <Icon name="phone" className="size-4" /> Call {site.contact.phone}
          </a>
          <a href={site.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/45 px-5 text-[14.5px] font-medium text-white hover:bg-white/10">
            <Icon name="whatsapp" className="size-4" /> WhatsApp your trip manager
          </a>
        </div>
      </Panel>
    </div>
  );
}
