"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { routes, site } from "@/data/site";
import { submitLead } from "@/lib/leads";
import { cn, formatINR } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { EMAIL_RE, Field, FormSuccess, SelectInput, SubmitButton, TextInput, validPhone } from "@/components/forms/Fields";

/** Next 12 months as "Oct 2026" style labels. */
export function upcomingMonths(count = 12) {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => new Date(now.getFullYear(), now.getMonth() + i, 1).toLocaleDateString("en-IN", { month: "short", year: "numeric" }));
}

type Props = {
  /** what the enquiry is about, sent with the lead (e.g. package or destination name) */
  subject: string;
  title?: string;
  price?: number;
  priceNote?: string;
  originalPrice?: number;
  /** primary booking link (package pages) */
  bookHref?: string;
  className?: string;
};

/** Sticky sidebar card: price, quick enquiry form and contact shortcuts. */
export function EnquiryCard({ subject, title = "Plan this trip with us", price, priceNote, originalPrice, bookHref, className }: Props) {
  const [values, setValues] = useState({ name: "", phone: "", email: "", date: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState("");

  const set = (k: keyof typeof values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: "" }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!validPhone(values.phone)) next.phone = "Please enter a valid 10-digit phone number.";
    if (values.email && !EMAIL_RE.test(values.email)) next.email = "Please enter a valid email.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    const res = await submitLead("quick-enquiry", { subject, ...values });
    setLoading(false);
    setReference(res.reference);
  };

  return (
    <aside className={cn("rounded-2xl border border-line-soft bg-white p-5 shadow-card md:p-6", className)}>
      {price ? (
        <div className="border-b border-line-soft pb-4">
          <p className="text-[13px] text-muted">
            Starting from
            {originalPrice ? <span className="ml-2 text-stone line-through">{formatINR(originalPrice)}</span> : null}
          </p>
          <p className="font-serif text-[30px] leading-tight font-semibold text-ink-deep">
            {formatINR(price)}
            <span className="ml-1.5 font-sans text-[13px] font-normal text-muted">{priceNote}</span>
          </p>
          {bookHref ? (
            <Link
              href={bookHref}
              className="mt-4 inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-[10px] bg-olive text-[15px] font-medium text-white transition-colors hover:bg-olive-dark"
            >
              Book Now
              <Icon name="arrowRight" className="size-4" />
            </Link>
          ) : null}
        </div>
      ) : null}

      {reference ? (
        <FormSuccess title="Thank you!" text="Our travel specialist will call you within 24 hours to plan your trip." reference={reference} />
      ) : (
        <form onSubmit={onSubmit} noValidate className={cn(price && "pt-5")}>
          <h2 className="font-serif text-[21px] font-semibold text-ink">{title}</h2>
          <p className="mt-1 text-[13.5px] leading-[1.6] text-subtle">Get a free, no-obligation quote within 24 hours.</p>
          <div className="mt-4 space-y-3.5">
            <Field error={errors.name}>
              <TextInput name="name" autoComplete="name" placeholder="Your name" aria-label="Your name" icon="user" value={values.name} onChange={set("name")} invalid={Boolean(errors.name)} />
            </Field>
            <Field error={errors.phone}>
              <TextInput name="phone" type="tel" autoComplete="tel" placeholder="Phone number" aria-label="Phone number" icon="phone" value={values.phone} onChange={set("phone")} invalid={Boolean(errors.phone)} />
            </Field>
            <Field error={errors.email}>
              <TextInput name="email" type="email" autoComplete="email" placeholder="Email (optional)" aria-label="Email" icon="mail" value={values.email} onChange={set("email")} invalid={Boolean(errors.email)} />
            </Field>
            <SelectInput name="date" aria-label="Travel month" value={values.date} onChange={set("date")} options={upcomingMonths()} placeholder="Travel month (optional)" />
          </div>
          <SubmitButton loading={loading} className={cn("mt-4", price && bookHref && "bg-transparent text-olive ring-1 ring-olive hover:bg-olive hover:text-white")}>
            Send Enquiry
          </SubmitButton>
        </form>
      )}

      <div className="mt-5 grid grid-cols-2 gap-2.5 border-t border-line-soft pt-4">
        <a href={site.contact.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-lg bg-cream-2 py-2.5 text-[13.5px] font-medium text-ink hover:text-olive">
          <Icon name="phone" className="size-4 text-olive" />
          Call us
        </a>
        <a href={site.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-cream-2 py-2.5 text-[13.5px] font-medium text-ink hover:text-olive">
          <Icon name="whatsapp" className="size-4 text-olive" />
          WhatsApp
        </a>
      </div>
      <p className="mt-3 text-center text-[12.5px] text-muted">
        Prefer the full planner?{" "}
        <Link href={routes.planTrip} className="font-medium text-olive hover:underline">
          Plan your trip
        </Link>
      </p>
    </aside>
  );
}
