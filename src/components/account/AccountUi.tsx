import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { BookingStatus, EnquiryStatus, TourPackageDetail } from "@/types/catalog";
import { routes } from "@/data/site";
import { cn, formatINR } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/Icon";

/* Shared building blocks for the customer dashboard template. */

const STATUS: Record<BookingStatus | EnquiryStatus, string> = {
  Confirmed: "bg-olive/12 text-olive-dark",
  "Pending Payment": "bg-[#FBF1DC] text-[#8A6414]",
  Completed: "bg-[#E7EEF0] text-[#3E5A63]",
  Cancelled: "bg-[#F6E9E4] text-[#A8442C]",
  New: "bg-[#E7EEF0] text-[#3E5A63]",
  "In Discussion": "bg-[#FBF1DC] text-[#8A6414]",
  "Quote Sent": "bg-olive/12 text-olive-dark",
  Converted: "bg-olive text-white",
  Closed: "bg-line-soft text-muted",
};

export function StatusBadge({ status }: { status: BookingStatus | EnquiryStatus }) {
  return <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold whitespace-nowrap", STATUS[status])}>{status}</span>;
}

export function Panel({ title, action, children, className, id }: { title?: string; action?: ReactNode; children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("scroll-mt-6 rounded-2xl border border-line-soft bg-white p-5 shadow-tile md:p-6", className)}>
      {title ? (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-[20px] font-semibold text-ink md:text-[22px]">{title}</h2>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function StatTile({ icon, value, label, href }: { icon: IconName; value: string | number; label: string; href: string }) {
  return (
    <Link href={href} className="group flex items-center gap-4 rounded-2xl border border-line-soft bg-white p-4 shadow-tile transition-all hover:-translate-y-0.5 hover:border-olive hover:shadow-card md:p-5">
      <span className="flex size-12 flex-none items-center justify-center rounded-full bg-cream-2 text-olive transition-colors group-hover:bg-olive group-hover:text-white">
        <Icon name={icon} className="size-6" />
      </span>
      <span>
        <span className="block font-serif text-[26px] leading-none font-semibold text-ink-deep">{value}</span>
        <span className="mt-1 block text-[13px] text-muted">{label}</span>
      </span>
    </Link>
  );
}

type BookingRowData = {
  id: string;
  status: BookingStatus;
  travelDate: string;
  returnDate: string;
  amount: number;
  paid: number;
  travellers: { adults: number; children: number };
  pkg?: TourPackageDetail;
};

/** Booking summary row: package, status, travel date, amount. */
export function BookingRow({ booking }: { booking: BookingRowData }) {
  const pkg = booking.pkg;
  const due = booking.amount - booking.paid;
  return (
    <article className="relative grid gap-4 rounded-[14px] border border-line-soft bg-white p-4 transition-shadow hover:shadow-card sm:grid-cols-[120px_minmax(0,1fr)] md:grid-cols-[140px_minmax(0,1fr)_auto] md:items-center md:p-5">
      <div className="relative h-36 overflow-hidden rounded-xl bg-cream-2 sm:h-full sm:min-h-[96px]">
        {pkg ? <Image src={pkg.image.src} alt={pkg.image.alt} fill sizes="140px" className="object-cover" /> : null}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={booking.status} />
          <span className="text-[12.5px] text-muted">#{booking.id}</span>
        </div>
        <h3 className="mt-2 text-[17px] leading-[1.3] font-semibold text-ink">
          <Link href={`${routes.account}/bookings/${booking.id}`} className="after:absolute after:inset-0 hover:text-olive">
            {pkg?.title ?? "Tour package"}
          </Link>
        </h3>
        <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[13.5px] text-subtle">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="calendar" className="size-4 text-olive" />
            {booking.travelDate} – {booking.returnDate}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="users" className="size-4 text-olive" />
            {booking.travellers.adults} adult{booking.travellers.adults > 1 ? "s" : ""}
            {booking.travellers.children ? `, ${booking.travellers.children} child` : ""}
          </span>
        </p>
      </div>
      <div className="flex items-end justify-between gap-4 border-t border-line-soft pt-3 sm:col-span-2 md:col-span-1 md:flex-col md:items-end md:border-0 md:pt-0">
        <div className="md:text-right">
          <p className="text-[12px] text-muted">Total</p>
          <p className="font-serif text-[20px] leading-tight font-semibold text-ink-deep">{formatINR(booking.amount)}</p>
          {booking.status !== "Cancelled" && due > 0 ? <p className="text-[12px] font-medium text-[#8A6414]">{formatINR(due)} due</p> : null}
        </div>
        <span className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-olive">
          Details
          <Icon name="arrowRight" className="size-4" />
        </span>
      </div>
    </article>
  );
}

export function EmptyState({ icon, title, text, action }: { icon: IconName; title: string; text: string; action?: ReactNode }) {
  return (
    <div className="rounded-[14px] border border-dashed border-line bg-cream/60 px-6 py-10 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-white text-olive shadow-tile">
        <Icon name={icon} className="size-6" />
      </span>
      <p className="mt-3 text-[16px] font-semibold text-ink">{title}</p>
      <p className="mt-1 text-[14px] text-subtle">{text}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export const isUpcoming = (status: BookingStatus) => status === "Confirmed" || status === "Pending Payment";
