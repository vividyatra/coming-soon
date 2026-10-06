/**
 * Lead / form submission layer.
 *
 * All public forms (quick enquiry, contact, trip planner, booking, newsletter,
 * auth) call `submitLead`. It is front-end only for now; when the backend and
 * admin exist, POST the payload to the matching API route here.
 */
export type LeadKind = "quick-enquiry" | "contact" | "trip-plan" | "booking" | "newsletter" | "login" | "register" | "profile";

export async function submitLead(kind: LeadKind, payload: Record<string, unknown>): Promise<{ ok: true; reference: string }> {
  void payload;
  await new Promise((resolve) => setTimeout(resolve, 450));
  const reference = `${kind === "booking" ? "VY" : "EQ"}-${new Date().getFullYear().toString().slice(2)}-${Math.floor(1000 + Math.random() * 9000)}`;
  return { ok: true, reference };
}
