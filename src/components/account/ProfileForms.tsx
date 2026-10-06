"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import type { Customer, TravelStyleInfo } from "@/types/catalog";
import { submitLead } from "@/lib/leads";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { ChipGroup, EMAIL_RE, Field, SelectInput, TextInput, validPhone } from "@/components/forms/Fields";

function Card({ id, title, text, children, onSubmit, saved, saving }: { id: string; title: string; text: string; children: ReactNode; onSubmit?: (e: FormEvent) => void; saved?: boolean; saving?: boolean }) {
  return (
    <form id={id} onSubmit={onSubmit} noValidate className="scroll-mt-6 rounded-2xl border border-line-soft bg-white p-5 shadow-tile md:p-7">
      <div className="mb-5">
        <h2 className="font-serif text-[20px] font-semibold text-ink md:text-[22px]">{title}</h2>
        <p className="mt-1 text-[14px] text-subtle">{text}</p>
      </div>
      {children}
      {onSubmit ? (
        <div className="mt-6 flex items-center gap-4 border-t border-line-soft pt-5">
          <button type="submit" disabled={saving} className="inline-flex h-11 items-center rounded-lg bg-olive px-6 text-[14.5px] font-medium text-white hover:bg-olive-dark disabled:opacity-70">
            {saving ? "Saving…" : "Save changes"}
          </button>
          {saved ? (
            <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-olive" role="status">
              <Icon name="check" className="size-4" /> Saved
            </span>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}

function useSave() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const save = async (payload: Record<string, unknown>) => {
    setSaving(true);
    setSaved(false);
    await submitLead("profile", payload);
    setSaving(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };
  return { saving, saved, save };
}

function Toggle({ label, text, defaultOn }: { label: string; text: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(Boolean(defaultOn));
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div>
        <p className="text-[15px] font-medium text-ink">{label}</p>
        <p className="text-[13px] text-muted">{text}</p>
      </div>
      <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={() => setOn((v) => !v)} className={cn("relative h-7 w-12 flex-none rounded-full transition-colors", on ? "bg-olive" : "bg-line")}>
        <span className={cn("absolute top-1 size-5 rounded-full bg-white shadow transition-all", on ? "left-6" : "left-1")} />
      </button>
    </div>
  );
}

export function ProfileForms({ customer, styles }: { customer: Customer; styles: TravelStyleInfo[] }) {
  const [first, ...rest] = customer.name.split(" ");
  const [personal, setPersonal] = useState({ first, last: rest.join(" "), dob: "", gender: "" });
  const [contact, setContact] = useState({ email: customer.email, phone: customer.phone, city: customer.city });
  const [contactErr, setContactErr] = useState<Record<string, string>>({});
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwErr, setPwErr] = useState("");
  const [prefs, setPrefs] = useState({ styles: styles.filter((s) => customer.preferences.styles.includes(s.slug)).map((s) => s.title), budget: customer.preferences.budget });
  const [confirmDelete, setConfirmDelete] = useState(false);

  const p = useSave();
  const c = useSave();
  const w = useSave();
  const r = useSave();

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card
        id="personal"
        title="Personal Information"
        text="As it appears on your government ID — used for hotel and travel bookings."
        saving={p.saving}
        saved={p.saved}
        onSubmit={(e) => {
          e.preventDefault();
          p.save(personal);
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="First name" htmlFor="pf-first">
            <TextInput id="pf-first" autoComplete="given-name" value={personal.first} onChange={(e) => setPersonal((v) => ({ ...v, first: e.target.value }))} />
          </Field>
          <Field label="Last name" htmlFor="pf-last">
            <TextInput id="pf-last" autoComplete="family-name" value={personal.last} onChange={(e) => setPersonal((v) => ({ ...v, last: e.target.value }))} />
          </Field>
          <Field label="Date of birth" htmlFor="pf-dob">
            <TextInput id="pf-dob" type="date" autoComplete="bday" value={personal.dob} onChange={(e) => setPersonal((v) => ({ ...v, dob: e.target.value }))} />
          </Field>
          <Field label="Gender" htmlFor="pf-gender">
            <SelectInput id="pf-gender" value={personal.gender} onChange={(e) => setPersonal((v) => ({ ...v, gender: e.target.value }))} options={["Female", "Male", "Other", "Prefer not to say"]} placeholder="Select" />
          </Field>
        </div>
      </Card>

      {/* Contact Details */}
      <Card
        id="contact"
        title="Contact Details"
        text="Where we send confirmations, vouchers and trip updates."
        saving={c.saving}
        saved={c.saved}
        onSubmit={(e) => {
          e.preventDefault();
          const next: Record<string, string> = {};
          if (!EMAIL_RE.test(contact.email)) next.email = "Please enter a valid email.";
          if (!validPhone(contact.phone)) next.phone = "Please enter a valid 10-digit phone number.";
          setContactErr(next);
          if (!Object.keys(next).length) c.save(contact);
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email" htmlFor="pf-email" error={contactErr.email}>
            <TextInput id="pf-email" type="email" autoComplete="email" icon="mail" value={contact.email} onChange={(e) => setContact((v) => ({ ...v, email: e.target.value }))} invalid={Boolean(contactErr.email)} />
          </Field>
          <Field label="Mobile" htmlFor="pf-phone" error={contactErr.phone}>
            <TextInput id="pf-phone" type="tel" autoComplete="tel" icon="phone" value={contact.phone} onChange={(e) => setContact((v) => ({ ...v, phone: e.target.value }))} invalid={Boolean(contactErr.phone)} />
          </Field>
          <Field label="City" htmlFor="pf-city" className="sm:col-span-2">
            <TextInput id="pf-city" autoComplete="address-level2" icon="pin" value={contact.city} onChange={(e) => setContact((v) => ({ ...v, city: e.target.value }))} />
          </Field>
        </div>
      </Card>

      {/* Password */}
      <Card
        id="password"
        title="Password"
        text="Use at least 8 characters with a mix of letters and numbers."
        saving={w.saving}
        saved={w.saved}
        onSubmit={(e) => {
          e.preventDefault();
          if (!pw.current) return setPwErr("Please enter your current password.");
          if (pw.next.length < 8) return setPwErr("New password must be at least 8 characters.");
          if (pw.next !== pw.confirm) return setPwErr("New passwords don’t match.");
          setPwErr("");
          w.save({ changedPassword: true });
          setPw({ current: "", next: "", confirm: "" });
        }}
      >
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Current password" htmlFor="pw-current">
            <TextInput id="pw-current" type="password" autoComplete="current-password" value={pw.current} onChange={(e) => setPw((v) => ({ ...v, current: e.target.value }))} />
          </Field>
          <Field label="New password" htmlFor="pw-next">
            <TextInput id="pw-next" type="password" autoComplete="new-password" value={pw.next} onChange={(e) => setPw((v) => ({ ...v, next: e.target.value }))} />
          </Field>
          <Field label="Confirm new password" htmlFor="pw-confirm">
            <TextInput id="pw-confirm" type="password" autoComplete="new-password" value={pw.confirm} onChange={(e) => setPw((v) => ({ ...v, confirm: e.target.value }))} />
          </Field>
        </div>
        {pwErr ? (
          <p className="mt-3 text-[13.5px] text-[#A8442C]" role="alert">
            {pwErr}
          </p>
        ) : null}
      </Card>

      {/* Preferences */}
      <Card
        id="preferences"
        title="Travel Preferences"
        text="Helps us suggest trips and offers you’ll actually love."
        saving={r.saving}
        saved={r.saved}
        onSubmit={(e) => {
          e.preventDefault();
          r.save(prefs);
        }}
      >
        <p className="mb-2.5 text-[14.5px] font-semibold text-ink">Favourite travel styles</p>
        <ChipGroup options={styles.map((s) => s.title)} value={prefs.styles} onChange={(v) => setPrefs((x) => ({ ...x, styles: v }))} label="Favourite travel styles" />
        <Field label="Typical budget" htmlFor="pf-budget" className="mt-6 max-w-[420px]">
          <SelectInput
            id="pf-budget"
            value={prefs.budget}
            onChange={(e) => setPrefs((x) => ({ ...x, budget: e.target.value }))}
            options={["Under ₹50,000", "₹50,000 – ₹1,00,000", "₹1,00,000 – ₹2,50,000", "Above ₹2,50,000"]}
          />
        </Field>
      </Card>

      {/* Account Settings */}
      <Card id="settings" title="Account Settings" text="Notifications and account controls.">
        <div className="divide-y divide-line-soft">
          <Toggle label="Trip updates on WhatsApp" text="Driver details, reminders and on-trip alerts." defaultOn />
          <Toggle label="Email newsletter" text="Monthly travel inspiration and offers." defaultOn={customer.preferences.newsletter} />
          <Toggle label="SMS offers" text="Occasional limited-time deals." />
        </div>
        <div className="mt-6 rounded-xl border border-[#EAD2C9] bg-[#FBF4F1] p-4">
          <p className="text-[15px] font-semibold text-[#A8442C]">Delete account</p>
          <p className="mt-1 text-[13.5px] text-body">This permanently removes your profile, saved packages and enquiry history. Existing bookings are not affected.</p>
          {confirmDelete ? (
            <div className="mt-3 flex flex-wrap gap-2.5">
              <button type="button" onClick={() => setConfirmDelete(false)} className="inline-flex h-10 items-center rounded-lg border border-line bg-white px-4 text-[14px] font-medium text-ink">
                Cancel
              </button>
              <button type="button" onClick={() => setConfirmDelete(false)} className="inline-flex h-10 items-center rounded-lg bg-[#A8442C] px-4 text-[14px] font-medium text-white">
                Yes, request deletion
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => setConfirmDelete(true)} className="mt-3 inline-flex h-10 items-center rounded-lg border border-[#A8442C] px-4 text-[14px] font-medium text-[#A8442C] hover:bg-[#A8442C] hover:text-white">
              Delete my account
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}
