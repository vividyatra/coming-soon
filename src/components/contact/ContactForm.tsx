"use client";

import { useState, type FormEvent } from "react";
import { submitLead } from "@/lib/leads";
import { Checkbox, EMAIL_RE, Field, FormSuccess, SelectInput, SubmitButton, TextArea, TextInput, validPhone } from "@/components/forms/Fields";

const SUBJECTS = ["Plan a new trip", "Question about a package", "Existing booking", "Group / corporate travel", "Partnership", "Feedback", "Something else"];
const CONTACT_METHODS = ["Phone call", "WhatsApp", "Email"];

type Values = { name: string; email: string; phone: string; subject: string; method: string; message: string; consent: boolean };

/** General contact form — sends a "contact" lead. */
export function ContactForm() {
  const [values, setValues] = useState<Values>({ name: "", email: "", phone: "", subject: "", method: CONTACT_METHODS[0], message: "", consent: true });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState("");

  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(values.email)) next.email = "Please enter a valid email address.";
    if (!validPhone(values.phone)) next.phone = "Please enter a valid 10-digit phone number.";
    if (!values.subject) next.subject = "Please choose a subject.";
    if (values.message.trim().length < 10) next.message = "Please tell us a little more (at least 10 characters).";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`contact-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    setLoading(true);
    const res = await submitLead("contact", values);
    setLoading(false);
    setReference(res.reference);
  };

  if (reference) {
    return (
      <FormSuccess title="Message sent!" text="Thank you for reaching out. A member of our team will get back to you within one working day." reference={reference}>
        <button
          type="button"
          onClick={() => {
            setReference("");
            setValues({ name: "", email: "", phone: "", subject: "", method: CONTACT_METHODS[0], message: "", consent: true });
          }}
          className="mt-6 text-[14px] font-medium text-olive hover:underline"
        >
          Send another message
        </button>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="contact-name" required error={errors.name}>
          <TextInput id="contact-name" autoComplete="name" value={values.name} onChange={set("name")} placeholder="Your full name" invalid={Boolean(errors.name)} />
        </Field>
        <Field label="Email" htmlFor="contact-email" required error={errors.email}>
          <TextInput id="contact-email" type="email" autoComplete="email" value={values.email} onChange={set("email")} placeholder="you@example.com" invalid={Boolean(errors.email)} />
        </Field>
        <Field label="Phone" htmlFor="contact-phone" required error={errors.phone}>
          <TextInput id="contact-phone" type="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} placeholder="+91 98765 43210" invalid={Boolean(errors.phone)} />
        </Field>
        <Field label="Subject" htmlFor="contact-subject" required error={errors.subject}>
          <SelectInput id="contact-subject" value={values.subject} onChange={set("subject")} options={SUBJECTS} placeholder="Choose a subject" invalid={Boolean(errors.subject)} />
        </Field>
      </div>
      <Field label="Message" htmlFor="contact-message" required error={errors.message}>
        <TextArea id="contact-message" value={values.message} onChange={set("message")} placeholder="How can we help?" rows={5} className="h-36 md:h-36" invalid={Boolean(errors.message)} />
      </Field>
      <fieldset>
        <legend className="mb-2.5 text-[14.5px] font-semibold text-ink md:text-[15px]">Preferred way to reach you</legend>
        <div className="flex flex-wrap gap-2.5">
          {CONTACT_METHODS.map((m) => (
            <label
              key={m}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[14px] transition-colors ${
                values.method === m ? "border-olive bg-olive text-white" : "border-[#E4DFD0] bg-[#FFFDF9] text-ink-soft hover:border-olive"
              }`}
            >
              <input type="radio" name="method" value={m} checked={values.method === m} onChange={set("method")} className="sr-only" />
              {m}
            </label>
          ))}
        </div>
      </fieldset>
      <Checkbox
        checked={values.consent}
        onChange={(e) => setValues((v) => ({ ...v, consent: e.target.checked }))}
        label="Send me occasional travel inspiration and offers. You can unsubscribe anytime."
      />
      <SubmitButton loading={loading}>Send Message</SubmitButton>
    </form>
  );
}
