"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import type { TourPackageDetail } from "@/types/catalog";
import { routes } from "@/data/site";
import { submitLead } from "@/lib/leads";
import { cn, formatINR } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Checkbox, EMAIL_RE, Field, SelectInput, SubmitButton, TextArea, TextInput, validPhone } from "@/components/forms/Fields";
import { packageDuration } from "@/components/cards/PackageCard";

type Props = {
  packages: TourPackageDetail[];
  initialSlug?: string;
  initialTier?: number;
};

type Traveller = { name: string; age: string; gender: string };

const CHILD_RATE = 0.6;
const GST = 0.05;
const ADVANCE = 0.25;

const minDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().slice(0, 10);
};

function Card({ title, step, children }: { title: string; step: number; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-line-soft bg-white p-5 shadow-tile md:p-7">
      <h2 className="mb-5 flex items-center gap-3 font-serif text-[20px] font-semibold text-ink md:text-[22px]">
        <span className="flex size-8 flex-none items-center justify-center rounded-full bg-olive font-sans text-[14px] font-semibold text-white">{step}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Stepper({ label, value, min, max, onChange, hint }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void; hint: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-[#E4DFD0] bg-[#FFFDF9] px-4 py-3">
      <div>
        <p className="text-[15px] font-semibold text-ink">{label}</p>
        <p className="text-[12.5px] text-muted">{hint}</p>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Fewer ${label.toLowerCase()}`} className="flex size-9 items-center justify-center rounded-full border border-line bg-white text-ink hover:border-olive hover:text-olive disabled:opacity-40">
          <span className="text-lg leading-none">−</span>
        </button>
        <span className="w-6 text-center text-[16px] font-semibold text-ink" aria-live="polite">
          {value}
        </span>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`More ${label.toLowerCase()}`} className="flex size-9 items-center justify-center rounded-full border border-line bg-white text-ink hover:border-olive hover:text-olive disabled:opacity-40">
          <Icon name="plus" className="size-4" />
        </button>
      </div>
    </div>
  );
}

export function BookingForm({ packages, initialSlug, initialTier = 0 }: Props) {
  const [slug, setSlug] = useState(initialSlug && packages.some((p) => p.slug === initialSlug) ? initialSlug : "");
  const pkg = packages.find((p) => p.slug === slug);
  const [tier, setTier] = useState(Math.min(Math.max(initialTier, 0), 2));
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [travellers, setTravellers] = useState<Traveller[]>([]);
  const [contact, setContact] = useState({ name: "", email: "", phone: "", city: "" });
  const [requests, setRequests] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState("");

  const total = adults + children;
  const rows: Traveller[] = Array.from({ length: total }, (_, i) => travellers[i] ?? { name: "", age: "", gender: "" });
  const updateTraveller = (i: number, patch: Partial<Traveller>) => setTravellers(rows.map((r, n) => (n === i ? { ...r, ...patch } : r)));

  const price = useMemo(() => {
    if (!pkg) return null;
    const unit = pkg.pricing[tier]?.price ?? pkg.startingPrice;
    const adultsCost = unit * adults;
    const childCost = Math.round(unit * CHILD_RATE) * children;
    const subtotal = adultsCost + childCost;
    const gst = Math.round(subtotal * GST);
    const grand = subtotal + gst;
    return { unit, adultsCost, childCost, subtotal, gst, grand, advance: Math.round(grand * ADVANCE) };
  }, [pkg, tier, adults, children]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!pkg) next.package = "Please choose a package.";
    if (!date) next.date = "Please choose your travel date.";
    rows.forEach((r, i) => {
      if (!r.name.trim()) next[`t${i}`] = "Name required";
    });
    if (!contact.name.trim()) next.cname = "Please enter the lead traveller’s name.";
    if (!EMAIL_RE.test(contact.email)) next.cemail = "Please enter a valid email.";
    if (!validPhone(contact.phone)) next.cphone = "Please enter a valid 10-digit phone number.";
    if (!terms) next.terms = "Please accept the terms to continue.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.querySelector<HTMLElement>("[aria-invalid='true'], [data-error='true']")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setLoading(true);
    const res = await submitLead("booking", { package: slug, tier: pkg?.pricing[tier]?.label, date, adults, children, travellers: rows, contact, requests, total: price?.grand });
    setLoading(false);
    setReference(res.reference);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (reference && pkg && price) {
    return (
      <div className="container-narrow pt-10 md:pt-14">
        <div className="rounded-2xl border border-line-soft bg-white p-7 text-center shadow-card md:p-12" role="status">
          <span className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-olive text-white">
            <Icon name="check" className="size-8" />
          </span>
          <p className="font-script text-[32px] leading-none text-olive">Pack your bags!</p>
          <h2 className="mt-2 text-[26px] font-semibold text-ink md:text-[32px]">Booking request received</h2>
          <p className="mx-auto mt-3 max-w-[520px] text-[15.5px] leading-[1.7] text-body">
            Thank you, {contact.name.split(" ")[0]}. Your trip manager will confirm availability and send a secure payment link for the {formatINR(price.advance)} advance within a few hours.
          </p>
          <dl className="mx-auto mt-7 grid max-w-[560px] gap-px overflow-hidden rounded-xl border border-line-soft bg-line-soft text-left sm:grid-cols-2">
            {[
              ["Booking reference", reference],
              ["Package", pkg.title],
              ["Travel date", new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })],
              ["Travellers", `${adults} adult${adults > 1 ? "s" : ""}${children ? `, ${children} child${children > 1 ? "ren" : ""}` : ""}`],
              ["Total (incl. GST)", formatINR(price.grand)],
              ["Advance due", formatINR(price.advance)],
            ].map(([k, v]) => (
              <div key={k} className="bg-white px-4 py-3">
                <dt className="text-[12px] font-medium tracking-[.5px] text-muted uppercase">{k}</dt>
                <dd className="text-[15px] font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={routes.account + "/bookings"} className="inline-flex h-12 items-center justify-center rounded-lg bg-olive px-6 text-[15px] font-medium text-white hover:bg-olive-dark">
              Go to My Bookings
            </Link>
            <Link href={routes.packages} className="inline-flex h-12 items-center justify-center rounded-lg border border-line px-6 text-[15px] font-medium text-ink hover:border-olive hover:text-olive">
              Browse more packages
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="container-site grid gap-8 pt-10 md:pt-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10">
      <div className="min-w-0 space-y-6">
        {/* Selected Package */}
        <Card step={1} title="Selected Package">
          {!pkg ? (
            <Field label="Choose a package" htmlFor="bk-package" error={errors.package}>
              <SelectInput id="bk-package" value={slug} onChange={(e) => setSlug(e.target.value)} options={packages.map((p) => ({ label: `${p.title} — ${packageDuration(p)}`, value: p.slug }))} placeholder="Select a package" invalid={Boolean(errors.package)} />
            </Field>
          ) : (
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative h-40 overflow-hidden rounded-xl sm:h-auto sm:w-44 sm:flex-none">
                <Image src={pkg.image.src} alt={pkg.image.alt} fill sizes="176px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-medium tracking-[1.2px] text-eyebrow uppercase">{pkg.placesCovered.slice(0, 3).join(" · ")}</p>
                <h3 className="mt-1 text-[20px] leading-[1.3] font-semibold text-ink">{pkg.title}</h3>
                <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[13.5px] text-subtle">
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="clock" className="size-4 text-olive" />
                    {packageDuration(pkg)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="star" className="size-4 text-[#C9A24B]" />
                    {pkg.rating.toFixed(1)} ({pkg.reviews})
                  </span>
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-[13.5px]">
                  <Link href={`${routes.packages}/${pkg.slug}`} className="font-medium text-olive hover:underline">
                    View itinerary
                  </Link>
                  <button type="button" onClick={() => setSlug("")} className="font-medium text-muted hover:text-olive">
                    Change package
                  </button>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Trip Details + Travel Date + Number of Travellers */}
        <Card step={2} title="Trip Details">
          {pkg ? (
            <fieldset>
              <legend className="mb-2.5 text-[14.5px] font-semibold text-ink md:text-[15px]">Hotel category</legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {pkg.pricing.map((t, i) => (
                  <label key={t.label} className={cn("cursor-pointer rounded-xl border p-4 transition-colors", tier === i ? "border-olive bg-olive/[.06] ring-1 ring-olive" : "border-[#E4DFD0] bg-[#FFFDF9] hover:border-olive")}>
                    <input type="radio" name="tier" checked={tier === i} onChange={() => setTier(i)} className="sr-only" />
                    <span className="block text-[14px] font-semibold text-ink">{t.label}</span>
                    <span className="mt-1 block font-serif text-[18px] font-semibold text-olive-dark">{formatINR(t.price)}</span>
                    <span className="block text-[12px] text-muted">per adult</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ) : null}
          <div className={cn("grid gap-5 md:grid-cols-2", pkg && "mt-6")}>
            <Field label="Travel date" htmlFor="bk-date" required error={errors.date}>
              <TextInput id="bk-date" type="date" min={minDate()} value={date} onChange={(e) => setDate(e.target.value)} icon="calendar" invalid={Boolean(errors.date)} />
            </Field>
            <div>
              <p className="mb-2.5 text-[14.5px] font-semibold text-ink md:text-[15px]">Number of travellers</p>
              <div className="space-y-3">
                <Stepper label="Adults" hint="12 years and above" value={adults} min={1} max={12} onChange={setAdults} />
                <Stepper label="Children" hint="Below 12 years (60% fare)" value={children} min={0} max={8} onChange={setChildren} />
              </div>
            </div>
          </div>
        </Card>

        {/* Traveller Details */}
        <Card step={3} title="Traveller Details">
          <p className="-mt-2 mb-4 text-[13.5px] text-subtle">Names as they appear on a government photo ID.</p>
          <ol className="space-y-4">
            {rows.map((r, i) => (
              <li key={i} className="rounded-xl border border-[#EDE9DC] p-4">
                <p className="mb-3 text-[13px] font-semibold tracking-[.5px] text-olive uppercase">{i < adults ? `Adult ${i + 1}${i === 0 ? " (lead traveller)" : ""}` : `Child ${i - adults + 1}`}</p>
                <div className="grid gap-3 sm:grid-cols-[1.6fr_.7fr_1fr]">
                  <Field error={errors[`t${i}`]}>
                    <TextInput value={r.name} onChange={(e) => updateTraveller(i, { name: e.target.value })} placeholder="Full name" aria-label={`Traveller ${i + 1} name`} invalid={Boolean(errors[`t${i}`])} />
                  </Field>
                  <TextInput type="number" min={0} max={110} value={r.age} onChange={(e) => updateTraveller(i, { age: e.target.value })} placeholder="Age" aria-label={`Traveller ${i + 1} age`} />
                  <SelectInput value={r.gender} onChange={(e) => updateTraveller(i, { gender: e.target.value })} options={["Female", "Male", "Other"]} placeholder="Gender" aria-label={`Traveller ${i + 1} gender`} />
                </div>
              </li>
            ))}
          </ol>
        </Card>

        {/* Special Requests */}
        <Card step={4} title="Special Requests">
          <TextArea value={requests} onChange={(e) => setRequests(e.target.value)} placeholder="Dietary needs, room preferences, celebrations, accessibility…" aria-label="Special requests" />
        </Card>

        {/* Contact Information */}
        <Card step={5} title="Contact Information">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" htmlFor="bk-name" required error={errors.cname}>
              <TextInput id="bk-name" autoComplete="name" value={contact.name} onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))} invalid={Boolean(errors.cname)} />
            </Field>
            <Field label="Email" htmlFor="bk-email" required error={errors.cemail}>
              <TextInput id="bk-email" type="email" autoComplete="email" value={contact.email} onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))} invalid={Boolean(errors.cemail)} />
            </Field>
            <Field label="Phone" htmlFor="bk-phone" required error={errors.cphone}>
              <TextInput id="bk-phone" type="tel" autoComplete="tel" value={contact.phone} onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))} invalid={Boolean(errors.cphone)} />
            </Field>
            <Field label="City" htmlFor="bk-city">
              <TextInput id="bk-city" autoComplete="address-level2" value={contact.city} onChange={(e) => setContact((c) => ({ ...c, city: e.target.value }))} />
            </Field>
          </div>
        </Card>

        {/* Terms & Conditions */}
        <Card step={6} title="Terms & Conditions">
          <div data-error={errors.terms ? "true" : undefined}>
            <Checkbox
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              label={
                <>
                  I have read and agree to the{" "}
                  <Link href={routes.terms} target="_blank" className="font-medium text-olive underline">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href={routes.cancellation} target="_blank" className="font-medium text-olive underline">
                    Cancellation Policy
                  </Link>
                  .
                </>
              }
            />
            {errors.terms ? (
              <p className="mt-2 text-[13px] text-[#A8442C]" role="alert">
                {errors.terms}
              </p>
            ) : null}
          </div>
        </Card>
      </div>

      {/* Price Summary */}
      <aside className="lg:relative">
        <div className="lg:sticky lg:top-6">
          <div className="rounded-2xl border border-line-soft bg-white p-5 shadow-card md:p-6">
            <h2 className="font-serif text-[21px] font-semibold text-ink">Price Summary</h2>
            {pkg && price ? (
              <>
                <dl className="mt-4 space-y-3 text-[14.5px]">
                  <div className="flex justify-between gap-3">
                    <dt className="text-subtle">
                      {adults} adult{adults > 1 ? "s" : ""} × {formatINR(price.unit)}
                    </dt>
                    <dd className="font-medium text-ink">{formatINR(price.adultsCost)}</dd>
                  </div>
                  {children ? (
                    <div className="flex justify-between gap-3">
                      <dt className="text-subtle">
                        {children} child{children > 1 ? "ren" : ""} × {formatINR(Math.round(price.unit * CHILD_RATE))}
                      </dt>
                      <dd className="font-medium text-ink">{formatINR(price.childCost)}</dd>
                    </div>
                  ) : null}
                  <div className="flex justify-between gap-3">
                    <dt className="text-subtle">GST (5%)</dt>
                    <dd className="font-medium text-ink">{formatINR(price.gst)}</dd>
                  </div>
                  <div className="flex justify-between gap-3 border-t border-line-soft pt-3">
                    <dt className="font-semibold text-ink">Total</dt>
                    <dd className="font-serif text-[24px] leading-none font-semibold text-ink-deep">{formatINR(price.grand)}</dd>
                  </div>
                  <div className="flex justify-between gap-3 rounded-lg bg-cream-2 px-3 py-2.5">
                    <dt className="font-medium text-ink">Advance to confirm (25%)</dt>
                    <dd className="font-semibold text-olive-dark">{formatINR(price.advance)}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-[12.5px] leading-[1.6] text-muted">Balance due 15 days before travel. No payment is taken now — we’ll send a secure payment link after confirming availability.</p>
              </>
            ) : (
              <p className="mt-3 text-[14px] text-subtle">Choose a package to see your price.</p>
            )}
            <SubmitButton loading={loading} className="mt-5">
              Confirm Booking
            </SubmitButton>
            <ul className="mt-4 space-y-2 text-[13px] text-subtle">
              <li className="flex items-center gap-2">
                <Icon name="shieldCheck" className="size-4 text-olive" /> Secure booking, no hidden fees
              </li>
              <li className="flex items-center gap-2">
                <Icon name="calendar" className="size-4 text-olive" /> Free date change up to 21 days before
              </li>
              <li className="flex items-center gap-2">
                <Icon name="headset" className="size-4 text-olive" /> 24/7 on-trip support
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </form>
  );
}
