"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { routes } from "@/data/site";
import { submitLead } from "@/lib/leads";
import { cn } from "@/lib/utils";
import { Checkbox, EMAIL_RE, Field, SubmitButton, TextInput, validPhone } from "@/components/forms/Fields";
import { Segmented } from "./AuthShell";

type Method = "password" | "otp";

const strength = (p: string) => {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
};
const LABELS = ["Too short", "Weak", "Fair", "Good", "Strong"];

/** Create-account form with password or mobile-OTP verification. Front-end only. */
export function RegisterForm() {
  const router = useRouter();
  const [method, setMethod] = useState<Method>("password");
  const [v, setV] = useState({ name: "", email: "", mobile: "", password: "", confirm: "", otp: "" });
  const [terms, setTerms] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => {
    setV((x) => ({ ...x, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: "" }));
  };
  const score = strength(v.password);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!v.name.trim()) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(v.email)) next.email = "Please enter a valid email address.";
    if (!validPhone(v.mobile)) next.mobile = "Please enter a valid 10-digit mobile number.";
    if (method === "password") {
      if (v.password.length < 8) next.password = "Use at least 8 characters.";
      else if (v.confirm !== v.password) next.confirm = "Passwords don’t match.";
    } else if (otpSent && !/^\d{6}$/.test(v.otp)) next.otp = "Please enter the 6-digit code.";
    if (!terms) next.terms = "Please accept the terms to create your account.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    if (method === "otp" && !otpSent) {
      await submitLead("register", { step: "send-otp", mobile: v.mobile });
      setLoading(false);
      setOtpSent(true);
      return;
    }
    await submitLead("register", { name: v.name, email: v.email, mobile: v.mobile, method });
    try {
      window.localStorage.setItem("vivid-yatra:session", JSON.stringify({ id: v.email, name: v.name, at: Date.now() }));
    } catch {}
    router.push(`${routes.account}?welcome=1`);
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <Field label="Full name" htmlFor="reg-name" required error={errors.name}>
        <TextInput id="reg-name" autoComplete="name" icon="user" value={v.name} onChange={set("name")} placeholder="Your full name" invalid={Boolean(errors.name)} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" htmlFor="reg-email" required error={errors.email}>
          <TextInput id="reg-email" type="email" autoComplete="email" icon="mail" value={v.email} onChange={set("email")} placeholder="you@example.com" invalid={Boolean(errors.email)} />
        </Field>
        <Field label="Mobile" htmlFor="reg-mobile" required error={errors.mobile}>
          <TextInput id="reg-mobile" type="tel" autoComplete="tel" icon="phone" value={v.mobile} onChange={set("mobile")} placeholder="+91 98765 43210" invalid={Boolean(errors.mobile)} />
        </Field>
      </div>

      <Segmented
        label="Secure your account with"
        value={method}
        onChange={(m) => {
          setMethod(m);
          setOtpSent(false);
        }}
        options={[
          { value: "password", label: "Password" },
          { value: "otp", label: "Mobile OTP" },
        ]}
      />

      {method === "password" ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Password" htmlFor="reg-password" required error={errors.password}>
            <TextInput id="reg-password" type="password" autoComplete="new-password" icon="lock" value={v.password} onChange={set("password")} placeholder="8+ characters" invalid={Boolean(errors.password)} />
            {v.password ? (
              <div className="mt-2">
                <div className="flex gap-1" aria-hidden="true">
                  {[1, 2, 3, 4].map((n) => (
                    <span key={n} className={cn("h-1.5 flex-1 rounded-full", n <= score ? (score >= 3 ? "bg-olive" : "bg-[#C9A24B]") : "bg-line-soft")} />
                  ))}
                </div>
                <p className="mt-1 text-[12.5px] text-muted">Strength: {LABELS[score]}</p>
              </div>
            ) : null}
          </Field>
          <Field label="Confirm password" htmlFor="reg-confirm" required error={errors.confirm}>
            <TextInput id="reg-confirm" type="password" autoComplete="new-password" icon="lock" value={v.confirm} onChange={set("confirm")} placeholder="Repeat password" invalid={Boolean(errors.confirm)} />
          </Field>
        </div>
      ) : otpSent ? (
        <Field label="Enter the 6-digit code" htmlFor="reg-otp" error={errors.otp} hint={`Sent to ${v.mobile}. Demo mode: any 6 digits work.`}>
          <TextInput id="reg-otp" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={v.otp} onChange={(e) => setV((x) => ({ ...x, otp: e.target.value.replace(/\D/g, "") }))} placeholder="••••••" className="text-center text-[20px] tracking-[.5em]" invalid={Boolean(errors.otp)} />
        </Field>
      ) : (
        <p className="rounded-xl bg-cream-2/70 px-4 py-3 text-[14px] text-body">We’ll send a one-time code to your mobile to verify your account.</p>
      )}

      <div>
        <Checkbox
          checked={terms}
          onChange={(e) => {
            setTerms(e.target.checked);
            setErrors((er) => ({ ...er, terms: "" }));
          }}
          label={
            <>
              I agree to the{" "}
              <Link href={routes.terms} className="font-medium text-olive underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href={routes.privacy} className="font-medium text-olive underline">
                Privacy Policy
              </Link>
              .
            </>
          }
        />
        {errors.terms ? (
          <p className="mt-1.5 text-[13px] text-[#A8442C]" role="alert">
            {errors.terms}
          </p>
        ) : null}
      </div>

      <SubmitButton loading={loading}>{method === "otp" && !otpSent ? "Send verification code" : "Create Account"}</SubmitButton>
    </form>
  );
}
