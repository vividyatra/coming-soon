"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { submitLead } from "@/lib/leads";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ChipGroup } from "@/components/forms/Fields";

type Options = { tripTypes: string[]; adults: string[]; children: string[]; budget: string[]; experiences: string[] };

type Props = {
  steps: string[];
  options: Options;
  success: { title: string; text: string; next: string[] };
  /** destination suggestions for the "Where to?" field */
  suggestions: string[];
  /** pre-filled from ?package= / ?destination= / ?offer= */
  prefill?: { destination?: string; note?: string };
};

type Values = {
  destination: string;
  tripType: string;
  startDate: string;
  endDate: string;
  flexible: boolean;
  adults: string;
  children: string;
  budget: string;
  experiences: string[];
  requirements: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
};

type Field = keyof Values;

const DRAFT_KEY = "vivid-yatra:planner-draft";
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const today = () => new Date().toISOString().slice(0, 10);

/* ---------------- field primitives (original Trip Planner styles) ---------------- */

const inputBase =
  "h-[50px] w-full rounded-[10px] border border-[#E4DFD0] bg-[#FFFDF9] px-[18px] text-[15px] text-ink outline-none transition-colors duration-200 placeholder:text-[#9A9C8F] focus:border-olive md:h-[52px] md:text-[15.5px] lg:h-14";

function Label({ htmlFor, children }: { htmlFor?: string; children: ReactNode }) {
  const cls = "mb-3 block text-[15.5px] font-semibold text-ink md:text-base lg:mb-3.5 lg:text-[17px]";
  return htmlFor ? (
    <label htmlFor={htmlFor} className={cls}>
      {children}
    </label>
  ) : (
    <span className={cls}>{children}</span>
  );
}

function IconSlot({ name, end = false }: { name: IconName; end?: boolean }) {
  return (
    <span className={cn("pointer-events-none absolute size-5 text-stone", end ? "right-[18px]" : "left-[18px]")} aria-hidden="true">
      <Icon name={name} className="size-full" />
    </span>
  );
}

export function TripPlanner({ steps, options, success, suggestions, prefill }: Props) {
  const empty: Values = {
    destination: prefill?.destination ?? "",
    tripType: options.tripTypes[0],
    startDate: "",
    endDate: "",
    flexible: false,
    adults: "2",
    children: "0",
    budget: "",
    experiences: [],
    requirements: prefill?.note ?? "",
    fullName: "",
    email: "",
    phone: "",
    city: "",
  };
  const [values, setValues] = useState<Values>(empty);
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState<{ field?: Field; message: string } | null>(null);
  const [reference, setReference] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const last = steps.length - 1;

  // restore a saved draft (Save & Continue Later) unless the page was opened with a pre-fill
  useEffect(() => {
    if (prefill?.destination) return;
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw) as { values: Partial<Values>; step: number };
      setValues((v) => ({ ...v, ...draft.values, experiences: Array.isArray(draft.values.experiences) ? draft.values.experiences : [] }));
      setCurrent(Math.min(Math.max(draft.step, 0), last));
      setNote("We restored your saved trip plan.");
    } catch {
      /* storage unavailable — start fresh */
    }
  }, [last, prefill?.destination]);

  const set = (field: Field) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (error?.field === field) setError(null);
  };

  const fail = (field: Field | undefined, message: string) => {
    setError({ field, message });
    if (field) document.getElementById(`plan-${field}`)?.focus({ preventScroll: true });
    return false;
  };

  const validate = (step: number) => {
    if (step === 0 && !values.destination.trim()) return fail("destination", "Please tell us where you’d like to go.");
    if (step === 1 && !values.flexible) {
      if (!values.startDate) return fail("startDate", "Please select a start date — or tick “My dates are flexible”.");
      if (!values.endDate) return fail("endDate", "Please select an end date.");
      if (values.endDate < values.startDate) return fail("endDate", "End date must be on or after the start date.");
    }
    if (step === 3 && !values.budget) return fail("budget", "Please choose a budget range.");
    if (step === 4) {
      if (!values.fullName.trim()) return fail("fullName", "Please enter your full name.");
      if (!EMAIL.test(values.email.trim())) return fail("email", "Please enter a valid email address.");
      if (values.phone.replace(/[^0-9]/g, "").length < 10) return fail("phone", "Please enter a valid 10-digit phone number.");
    }
    setError(null);
    return true;
  };

  const show = (step: number) => {
    setCurrent(step);
    setError(null);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate(current)) return;
    if (current < last) return show(current + 1);
    setSubmitting(true);
    const res = await submitLead("trip-plan", values);
    setSubmitting(false);
    try {
      window.localStorage.removeItem(DRAFT_KEY);
    } catch {}
    setReference(res.reference);
  };

  const saveDraft = () => {
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ values, step: current }));
      setNote("Saved! Your trip plan will be here when you come back on this device.");
    } catch {
      setNote("Sorry, we couldn’t save your plan on this device.");
    }
  };

  const errorClass = (field: Field) => (error?.field === field ? "border-[#C0715C]" : "");

  const dateInput = (field: "startDate" | "endDate", label: string) => (
    <div className="relative flex items-center">
      <input
        id={`plan-${field}`}
        name={field}
        type={values[field] ? "date" : "text"}
        onFocus={(e) => {
          e.currentTarget.type = "date";
        }}
        onBlur={(e) => {
          if (!e.currentTarget.value) e.currentTarget.type = "text";
        }}
        onClick={(e) => e.currentTarget.showPicker?.()}
        min={field === "endDate" && values.startDate ? values.startDate : today()}
        value={values[field]}
        onChange={set(field)}
        disabled={values.flexible}
        placeholder={label}
        aria-label={label}
        aria-invalid={error?.field === field || undefined}
        className={cn(
          inputBase,
          "pr-[46px] disabled:opacity-50 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:size-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0",
          errorClass(field),
        )}
      />
      <IconSlot name="calendar" end />
    </div>
  );

  const select = (field: Field, items: string[], placeholder?: string) => (
    <div className="relative flex items-center">
      <select
        id={`plan-${field}`}
        name={field}
        value={values[field] as string}
        onChange={set(field)}
        aria-invalid={error?.field === field || undefined}
        className={cn(inputBase, "cursor-pointer appearance-none pr-[46px]", errorClass(field))}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <IconSlot name="chevronDown" end />
    </div>
  );

  const text = (field: Field, label: string, props: { type?: string; autoComplete?: string; placeholder: string }) => (
    <div>
      <Label htmlFor={`plan-${field}`}>{label}</Label>
      <input
        id={`plan-${field}`}
        name={field}
        type={props.type ?? "text"}
        autoComplete={props.autoComplete}
        value={values[field] as string}
        onChange={set(field)}
        placeholder={props.placeholder}
        aria-invalid={error?.field === field || undefined}
        className={cn(inputBase, errorClass(field))}
      />
    </div>
  );

  const split = "grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-[18px] md:gap-7";
  const fieldGap = "mt-6 md:mt-[30px]";

  const panels: ReactNode[] = [
    /* 1 — Where to? */
    <>
      <div>
        <Label htmlFor="plan-destination">Where do you want to go?</Label>
        <div className="relative flex items-center">
          <IconSlot name="search" />
          <input
            id="plan-destination"
            name="destination"
            list="plan-destinations"
            value={values.destination}
            onChange={set("destination")}
            placeholder="Search destinations or places"
            aria-invalid={error?.field === "destination" || undefined}
            className={cn(inputBase, "pr-[46px] pl-12", errorClass("destination"))}
          />
          <datalist id="plan-destinations">
            {suggestions.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </div>
      </div>
      <div className={fieldGap}>
        <Label htmlFor="plan-tripType">What kind of trip is it?</Label>
        {select("tripType", options.tripTypes)}
      </div>
    </>,

    /* 2 — When? */
    <div>
      <Label>Select Your Dates</Label>
      <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-3.5">
        {dateInput("startDate", "Start Date")}
        <span className="size-6 justify-self-center text-body max-sm:rotate-90" aria-hidden="true">
          <Icon name="arrowRight" className="size-full" />
        </span>
        {dateInput("endDate", "End Date")}
      </div>
      <label className="mt-5 flex cursor-pointer items-center gap-3 text-[15px] text-body">
        <input
          type="checkbox"
          checked={values.flexible}
          onChange={(e) => {
            setValues((v) => ({ ...v, flexible: e.target.checked }));
            setError(null);
          }}
          className="size-[18px] cursor-pointer accent-[#67662A]"
        />
        My dates are flexible — suggest the best time to go
      </label>
    </div>,

    /* 3 — Travellers */
    <div className={split}>
      <div>
        <Label htmlFor="plan-adults">Adults</Label>
        {select("adults", options.adults)}
      </div>
      <div>
        <Label htmlFor="plan-children">Children (below 12)</Label>
        {select("children", options.children)}
      </div>
    </div>,

    /* 4 — Preferences */
    <>
      <div>
        <Label htmlFor="plan-budget">Budget</Label>
        {select("budget", options.budget, "Select a budget")}
      </div>
      <div className={fieldGap}>
        <Label>Preferred experiences</Label>
        <ChipGroup options={options.experiences} value={values.experiences} onChange={(experiences) => setValues((v) => ({ ...v, experiences }))} label="Preferred experiences" />
      </div>
      <div className={fieldGap}>
        <Label htmlFor="plan-requirements">Special requirements</Label>
        <textarea
          id="plan-requirements"
          name="requirements"
          value={values.requirements}
          onChange={set("requirements")}
          placeholder="Dietary needs, accessibility, celebrations, preferred hotels…"
          className={cn(inputBase, "h-28 resize-y py-3.5 leading-[1.6] md:h-28 lg:h-28")}
        />
      </div>
    </>,

    /* 5 — Contact details */
    <>
      {text("fullName", "Full Name", { autoComplete: "name", placeholder: "Your full name" })}
      <div className={cn(split, fieldGap)}>
        {text("email", "Email", { type: "email", autoComplete: "email", placeholder: "you@example.com" })}
        {text("phone", "Phone", { type: "tel", autoComplete: "tel", placeholder: "+91 98765 43210" })}
      </div>
      <div className={fieldGap}>{text("city", "City (optional)", { autoComplete: "address-level2", placeholder: "Where are you travelling from?" })}</div>
    </>,
  ];

  const done = Boolean(reference);

  return (
    <>
      {/* ---------------- step markers ---------------- */}
      <section aria-label="Planner steps" className="pt-11 lg:pt-[52px] 2xl:pt-[62px]">
        <div className="container-narrow">
          <ol className="grid grid-cols-5 2xl:-mx-[30px]">
            {steps.map((label, n) => {
              const active = !done && n === current;
              const complete = done || n < current;
              const clickable = !done && n < current;
              return (
                <li
                  key={label}
                  className={cn(
                    "relative text-center",
                    n < steps.length - 1 &&
                      "after:absolute after:top-[15px] after:right-[calc(-50%+20px)] after:left-[calc(50%+20px)] after:h-px after:bg-[#DDD8CC] sm:after:top-[17px] sm:after:right-[calc(-50%+23px)] sm:after:left-[calc(50%+23px)] md:after:top-[19px] md:after:right-[calc(-50%+26px)] md:after:left-[calc(50%+26px)] lg:after:top-[21px] lg:after:right-[calc(-50%+30px)] lg:after:left-[calc(50%+30px)]",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => clickable && show(n)}
                    disabled={!clickable}
                    aria-current={active ? "step" : undefined}
                    aria-label={`Step ${n + 1}: ${label}${complete ? " (completed)" : ""}`}
                    className={cn("group inline-flex flex-col items-center disabled:cursor-default", clickable && "cursor-pointer")}
                  >
                    <span
                      className={cn(
                        "inline-flex size-[30px] items-center justify-center rounded-full border text-xs font-medium transition-colors sm:size-[34px] sm:text-[13px] md:size-[38px] md:text-sm lg:size-[42px] lg:text-[15px]",
                        active ? "border-olive bg-olive font-semibold text-white" : complete ? "border-olive bg-card text-olive group-hover:bg-cream-2" : "border-[#DCD7C8] bg-card text-ink-soft",
                      )}
                    >
                      {complete && !active ? <Icon name="check" className="size-[45%]" /> : n + 1}
                    </span>
                    <span className="mt-2.5 block text-[9.5px] leading-[1.3] font-semibold text-ink xs:text-[10.5px] sm:text-xs md:mt-3 md:text-[13.5px] lg:mt-3.5 lg:text-[15px] lg:leading-normal">{label}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ---------------- form card ---------------- */}
      <section id="planner" aria-label="Tell us about your trip" className="scroll-mt-6 pt-9 md:pt-[46px] 2xl:pt-14">
        <div className="container-narrow">
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-[14px] border border-[#E7E2D3] bg-card px-[22px] pt-[26px] pb-7 md:rounded-2xl md:px-[30px] md:pt-8 md:pb-[34px] lg:px-[38px] lg:pt-[38px] lg:pb-10 2xl:px-[46px] 2xl:pt-11 2xl:pb-[46px]"
          >
            {done ? (
              <div className="pt-[26px] pb-3.5 text-center" role="status">
                <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-olive text-white sm:mb-5 sm:size-14">
                  <Icon name="check" className="size-[26px]" />
                </span>
                <h2 className="mx-auto max-w-[560px] text-2xl leading-[1.3] font-semibold text-ink md:text-[28px]">{success.title}</h2>
                <p className="mx-auto mt-2.5 max-w-[520px] text-[15.5px] text-body md:text-[16.5px]">{success.text}</p>
                <p className="mt-3 text-[13.5px] text-muted">
                  Request reference: <strong className="font-semibold text-ink">{reference}</strong>
                </p>
                <ol className="mx-auto mt-7 grid max-w-[720px] gap-3 text-left sm:grid-cols-3">
                  {success.next.map((step, i) => (
                    <li key={step} className="flex gap-3 rounded-xl bg-white p-4 shadow-tile">
                      <span className="flex size-7 flex-none items-center justify-center rounded-full bg-cream-2 font-serif text-[14px] font-semibold text-olive">{i + 1}</span>
                      <span className="text-[13.5px] leading-[1.55] text-body">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <>
                <h2 className="mb-6 font-serif text-[22px] font-semibold text-ink md:mb-7 md:text-[26px]">Tell Us About Your Trip</h2>
                <div key={current} className="animate-step-in">
                  {panels[current]}
                </div>
                <p role="alert" className={cn("mt-3 text-[13.5px] leading-[1.5] text-[#A8442C]", !error && "hidden")}>
                  {error?.message}
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-7 inline-flex h-[50px] w-full items-center justify-center rounded-[10px] bg-olive text-[15px] font-medium text-white transition-colors duration-[250ms] hover:bg-olive-dark disabled:opacity-70 md:h-[52px] md:text-base lg:mt-[34px] lg:h-14"
                >
                  {current === last ? (submitting ? "Submitting…" : "Submit Enquiry") : "Next Step"}
                </button>

                <div className="relative flow-root">
                  {current > 0 ? (
                    <button
                      type="button"
                      onClick={() => show(current - 1)}
                      className="mt-[18px] inline-flex w-full items-center justify-center gap-[7px] text-[15px] leading-[1.6] text-ink transition-colors hover:text-olive sm:absolute sm:top-4 sm:left-0 sm:mt-0 sm:w-auto md:top-5 md:text-base"
                    >
                      <Icon name="arrowLeft" className="size-[17px]" />
                      Back
                    </button>
                  ) : null}
                  <button type="button" onClick={saveDraft} className="mx-auto mt-4 block text-center text-[15px] text-ink transition-colors hover:text-olive md:mt-5 md:text-base">
                    Save &amp; Continue Later
                  </button>
                </div>
              </>
            )}
            {note && !done ? (
              <p className="mt-3 text-center text-[13.5px] text-olive" role="status">
                {note}
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </>
  );
}
