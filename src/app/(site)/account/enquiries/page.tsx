import type { Metadata } from "next";
import Link from "next/link";
import { getEnquiries } from "@/lib/catalog";
import type { Enquiry } from "@/types/catalog";
import { routes } from "@/data/site";
import { Icon } from "@/components/ui/Icon";
import { EmptyState, Panel, StatusBadge } from "@/components/account/AccountUi";

export const metadata: Metadata = {
  title: "My Enquiries | Vivid Yatra",
};

function EnquiryItem({ e, open }: { e: Enquiry; open?: boolean }) {
  return (
    <details open={open} className="faq-item group rounded-[14px] border border-line-soft bg-white shadow-tile open:shadow-card">
      <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-3 px-5 py-4">
        <span className="min-w-0">
          <span className="block text-[16.5px] font-semibold text-ink">{e.destination}</span>
          <span className="block text-[13px] text-muted">
            #{e.id} · Sent {e.createdOn}
          </span>
        </span>
        <span className="flex items-center gap-3">
          <StatusBadge status={e.status} />
          <Icon name="chevronDown" className="size-5 text-olive transition-transform group-open:rotate-180" />
        </span>
      </summary>
      <div className="border-t border-line-soft px-5 pt-4 pb-5">
        {/* Enquiry Details */}
        <dl className="grid gap-3 text-[14px] sm:grid-cols-3">
          {[
            ["Travel month", e.travelMonth],
            ["Travellers", e.travellers],
            ["Budget", e.budget],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-cream-2/60 px-3 py-2.5">
              <dt className="text-[12px] font-medium tracking-[.5px] text-muted uppercase">{k}</dt>
              <dd className="font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-[14.5px] leading-[1.7] text-body">
          <span className="font-semibold text-ink">Your message: </span>
          {e.message}
        </p>

        {/* Follow-up information */}
        <p className="mt-5 text-[13px] font-semibold tracking-[.6px] text-ink uppercase">Follow-ups</p>
        <ol className="mt-3 space-y-3 border-l border-dashed border-[#CFC9B8] pl-5">
          {e.followUps.map((f) => (
            <li key={f.date + f.note} className="relative">
              <span className="absolute top-1.5 -left-[25px] size-2.5 rounded-full bg-olive ring-4 ring-white" />
              <p className="text-[13px] text-muted">
                {f.date} · {f.by}
              </p>
              <p className="text-[14.5px] text-ink">{f.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </details>
  );
}

export default async function MyEnquiriesPage() {
  const enquiries = await getEnquiries();
  const active = enquiries.filter((e) => e.status !== "Converted" && e.status !== "Closed");
  const previous = enquiries.filter((e) => e.status === "Converted" || e.status === "Closed");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold text-ink md:text-[34px]">My Enquiries</h1>
          <p className="mt-1 text-[15px] text-subtle">Every trip request you’ve sent us, with status and follow-ups from your specialist.</p>
        </div>
        <Link href={routes.planTrip} className="inline-flex h-11 items-center gap-2 rounded-lg bg-olive px-5 text-[14.5px] font-medium text-white hover:bg-olive-dark">
          <Icon name="plus" className="size-4" />
          New enquiry
        </Link>
      </div>

      {/* Active Enquiries */}
      <Panel title={`Active Enquiries (${active.length})`}>
        {active.length ? (
          <div className="space-y-3.5">
            {active.map((e, i) => (
              <EnquiryItem key={e.id} e={e} open={i === 0} />
            ))}
          </div>
        ) : (
          <EmptyState icon="chat" title="No active enquiries" text="Send us your trip idea and we’ll reply within 24 hours." />
        )}
      </Panel>

      {/* Previous Enquiries */}
      <Panel title={`Previous Enquiries (${previous.length})`}>
        {previous.length ? (
          <div className="space-y-3.5">
            {previous.map((e) => (
              <EnquiryItem key={e.id} e={e} />
            ))}
          </div>
        ) : (
          <EmptyState icon="list" title="No previous enquiries" text="Closed and converted enquiries appear here." />
        )}
      </Panel>
    </div>
  );
}
