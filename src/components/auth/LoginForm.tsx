"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { routes } from "@/data/site";
import { submitLead } from "@/lib/leads";
import { EMAIL_RE, Field, FormSuccess, SubmitButton, TextInput, validPhone } from "@/components/forms/Fields";
import { Segmented } from "./AuthShell";

type Via = "email" | "mobile";
type Method = "password" | "otp";

/**
 * Login with email or mobile, by password or OTP, plus forgot-password.
 * Front-end only: on success it opens the demo account area.
 */
export function LoginForm() {
  const router = useRouter();
  const [via, setVia] = useState<Via>("email");
  const [method, setMethod] = useState<Method>("password");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [forgot, setForgot] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validId = via === "email" ? EMAIL_RE.test(id) : validPhone(id);
  const idError = via === "email" ? "Please enter a valid email address." : "Please enter a valid 10-digit mobile number.";

  const signIn = async () => {
    setLoading(true);
    await submitLead("login", { via, id, method });
    try {
      window.localStorage.setItem("vivid-yatra:session", JSON.stringify({ id, at: Date.now() }));
    } catch {}
    router.push(routes.account);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validId) return setError(idError);
    if (method === "password") {
      if (password.length < 6) return setError("Please enter your password (at least 6 characters).");
      return signIn();
    }
    if (!otpSent) {
      setLoading(true);
      await submitLead("login", { via, id, step: "send-otp" });
      setLoading(false);
      setOtpSent(true);
      return;
    }
    if (!/^\d{6}$/.test(otp)) return setError("Please enter the 6-digit code.");
    return signIn();
  };

  if (forgot) {
    return resetSent ? (
      <FormSuccess title="Check your inbox" text={`If an account exists for ${id}, we’ve sent a link to reset your password.`}>
        <button type="button" onClick={() => { setForgot(false); setResetSent(false); }} className="mt-5 text-[14px] font-medium text-olive hover:underline">
          Back to login
        </button>
      </FormSuccess>
    ) : (
      <form
        noValidate
        onSubmit={async (e) => {
          e.preventDefault();
          if (!EMAIL_RE.test(id)) return setError("Please enter the email linked to your account.");
          setError("");
          setLoading(true);
          await submitLead("login", { step: "reset", id });
          setLoading(false);
          setResetSent(true);
        }}
        className="space-y-5"
      >
        <p className="text-[15px] leading-[1.6] text-body">Enter your email and we’ll send you a link to reset your password.</p>
        <Field label="Email" htmlFor="reset-email" error={error}>
          <TextInput id="reset-email" type="email" autoComplete="email" icon="mail" value={id} onChange={(e) => setId(e.target.value)} placeholder="you@example.com" invalid={Boolean(error)} />
        </Field>
        <SubmitButton loading={loading}>Send reset link</SubmitButton>
        <button type="button" onClick={() => { setForgot(false); setError(""); }} className="block w-full text-center text-[14px] font-medium text-olive hover:underline">
          Back to login
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <Segmented
        label="Sign in with"
        value={via}
        onChange={(v) => {
          setVia(v);
          setId("");
          setError("");
          setOtpSent(false);
        }}
        options={[
          { value: "email", label: "Email" },
          { value: "mobile", label: "Mobile" },
        ]}
      />

      <Field label={via === "email" ? "Email address" : "Mobile number"} htmlFor="login-id" error={error && !validId ? error : undefined}>
        <TextInput
          id="login-id"
          type={via === "email" ? "email" : "tel"}
          autoComplete={via === "email" ? "email" : "tel"}
          icon={via === "email" ? "mail" : "phone"}
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder={via === "email" ? "you@example.com" : "+91 98765 43210"}
          invalid={Boolean(error) && !validId}
        />
      </Field>

      <Segmented
        label="Sign in using"
        value={method}
        onChange={(m) => {
          setMethod(m);
          setError("");
          setOtpSent(false);
        }}
        options={[
          { value: "password", label: "Password" },
          { value: "otp", label: "One-time code (OTP)" },
        ]}
      />

      {method === "password" ? (
        <Field label="Password" htmlFor="login-password" error={error && validId ? error : undefined}>
          <div className="relative">
            <TextInput id="login-password" type={showPassword ? "text" : "password"} autoComplete="current-password" icon="lock" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" className="pr-20" invalid={Boolean(error) && validId} />
            <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute top-1/2 right-4 -translate-y-1/2 text-[13px] font-medium text-olive">
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </Field>
      ) : otpSent ? (
        <Field label="Enter the 6-digit code" htmlFor="login-otp" error={error && validId ? error : undefined} hint={`Sent to ${id}. Demo mode: any 6 digits work.`}>
          <TextInput id="login-otp" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} placeholder="••••••" className="text-center text-[20px] tracking-[.5em]" invalid={Boolean(error) && validId} />
        </Field>
      ) : null}

      <div className="flex items-center justify-between gap-3 text-[14px]">
        <label className="inline-flex cursor-pointer items-center gap-2 text-body">
          <input type="checkbox" defaultChecked className="size-4 accent-[#67662A]" />
          Remember me
        </label>
        <button type="button" onClick={() => { setForgot(true); setError(""); setId(via === "email" ? id : ""); }} className="font-medium text-olive hover:underline">
          Forgot password?
        </button>
      </div>

      <SubmitButton loading={loading}>{method === "otp" && !otpSent ? "Send code" : "Log in"}</SubmitButton>
      {method === "otp" && otpSent ? (
        <button type="button" onClick={() => setOtp("")} className="block w-full text-center text-[13.5px] text-muted hover:text-olive">
          Didn’t get it? Resend code
        </button>
      ) : null}
    </form>
  );
}
