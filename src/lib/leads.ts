/**
 * Lead / form submission layer.
 *
 * All public forms call `submitLead`. Until the real backend exists, each
 * submission is POSTed from the browser to Web3Forms
 * (https://api.web3forms.com/submit), which emails it to the inbox linked to
 * the access key in `NEXT_PUBLIC_WEB3FORMS_KEY` (.env.local locally, Vercel
 * Environment Variables in production). The free plan only accepts
 * client-side submissions, so this must stay a browser-side call.
 *
 * Contract: resolves `{ ok: true, reference }` only when Web3Forms confirms the
 * email was accepted; otherwise it throws a `LeadSubmitError` whose `message`
 * is safe to show to visitors.
 */
export type LeadKind = "quick-enquiry" | "contact" | "trip-plan" | "booking" | "newsletter" | "login" | "register" | "profile";

export type LeadResult = { ok: true; reference: string };

/** Thrown when a submission could not be delivered. `message` is user-facing. */
export class LeadSubmitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LeadSubmitError";
  }
}

/** Name of the hidden honeypot field (Web3Forms' reserved `botcheck`). */
export const HONEYPOT_FIELD = "botcheck";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const REQUEST_TIMEOUT_MS = 15000;
const GENERIC_ERROR = "Sorry, we couldn't send your message right now. Please try again in a moment.";

const FORM_NAMES: Record<LeadKind, string> = {
  "quick-enquiry": "Quick enquiry form",
  contact: "Contact form",
  "trip-plan": "Trip planner form",
  booking: "Booking form",
  newsletter: "Newsletter signup",
  login: "Login form",
  register: "Registration form",
  profile: "Profile form",
};

/* Readable labels for the email. Keys are deliberately different from
   Web3Forms' reserved names (email, subject, replyto...) so they are
   forwarded as-is. Unknown keys fall back to a humanised version. */
const FIELD_LABELS: Record<string, string> = {
  name: "Full name",
  email: "Email address",
  phone: "Phone number",
  subject: "Enquiry topic",
  method: "Preferred contact method",
  message: "Message",
  consent: "Opted in to travel offers",
};

const humanise = (key: string) =>
  key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/^./, (c) => c.toUpperCase());

const formatValue = (value: unknown): string => {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.map(formatValue).join(", ");
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value).trim();
};

const makeReference = (kind: LeadKind) =>
  `${kind === "booking" ? "VY" : "EQ"}-${new Date().getFullYear().toString().slice(2)}-${Math.floor(1000 + Math.random() * 9000)}`;

export async function submitLead(kind: LeadKind, payload: Record<string, unknown>): Promise<LeadResult> {
  const reference = makeReference(kind);
  const { [HONEYPOT_FIELD]: honeypot, ...fields } = payload;

  // Honeypot filled in: almost certainly a bot. Pretend it worked, send nothing.
  if (honeypot) return { ok: true, reference };

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!accessKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[leads] NEXT_PUBLIC_WEB3FORMS_KEY is not set, so form submissions cannot be emailed. Add it to .env.local (and to Vercel Environment Variables) and restart the server.");
    }
    throw new LeadSubmitError(GENERIC_ERROR);
  }

  const formName = FORM_NAMES[kind];
  const visitorName = formatValue(fields.name);
  const visitorEmail = formatValue(fields.email);

  const body: Record<string, string> = {
    access_key: accessKey,
    subject: `New enquiry from vividyatra.com (${formName})${visitorName ? ` \u2014 ${visitorName}` : ""}`,
    from_name: "Vivid Yatra Website",
    Form: formName,
    Reference: reference,
  };
  if (visitorEmail) body.replyto = visitorEmail;

  for (const [key, value] of Object.entries(fields)) {
    const label = FIELD_LABELS[key] ?? humanise(key);
    body[label] = formatValue(value) || "-";
  }

  if (typeof window !== "undefined") body.Page = window.location.href;
  body["Submitted at"] = `${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })} IST`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const data = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;
    if (res.ok && data?.success === true) return { ok: true, reference };
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[leads] Web3Forms rejected the submission (HTTP ${res.status}): ${data?.message ?? "no message"}`);
    }
    throw new LeadSubmitError(res.status === 429 ? "Too many attempts. Please wait a minute and try again." : GENERIC_ERROR);
  } catch (err) {
    if (err instanceof LeadSubmitError) throw err;
    if (process.env.NODE_ENV !== "production") console.warn("[leads] Network error while sending the form", err);
    throw new LeadSubmitError(GENERIC_ERROR);
  } finally {
    clearTimeout(timer);
  }
}