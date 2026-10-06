"use client";

import { useState, type FormEvent } from "react";
import { submitLead } from "@/lib/leads";
import { Icon } from "@/components/ui/Icon";
import { EMAIL_RE } from "@/components/forms/Fields";

/** Newsletter / travel updates sign-up band. */
export function Newsletter({
  title = "Get travel inspiration in your inbox",
  text = "Seasonal guides, new itineraries and member-only offers — once a month, never spam.",
}: {
  title?: string;
  text?: string;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) return setState("error");
    setState("loading");
    await submitLead("newsletter", { email });
    setState("done");
  };

  return (
    <section aria-labelledby="newsletter-title" className="pt-14 md:pt-[72px] lg:pt-[84px]">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-2xl border border-line-soft bg-sand px-6 py-9 md:rounded-[20px] md:px-12 md:py-12">
          <Icon name="mail" className="absolute -right-8 -bottom-10 size-[200px] text-white/60" />
          <div className="relative grid items-center gap-6 lg:grid-cols-[1fr_minmax(0,460px)] lg:gap-12">
            <div>
              <p className="font-script text-[30px] leading-none text-olive md:text-[36px]">Travel Updates</p>
              <h2 id="newsletter-title" className="mt-2 text-[24px] leading-[1.25] font-semibold text-ink md:text-[30px]">
                {title}
              </h2>
              <p className="mt-2 max-w-[520px] text-[15px] leading-[1.7] text-body">{text}</p>
            </div>
            {state === "done" ? (
              <p className="inline-flex items-center gap-3 rounded-xl bg-white px-5 py-4 text-[15px] font-medium text-ink shadow-tile" role="status">
                <span className="flex size-8 items-center justify-center rounded-full bg-olive text-white">
                  <Icon name="check" className="size-4" />
                </span>
                You’re subscribed — welcome aboard!
              </p>
            ) : (
              <form onSubmit={onSubmit} noValidate className="w-full">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (state === "error") setState("idle");
                    }}
                    placeholder="Your email address"
                    aria-invalid={state === "error" || undefined}
                    className="h-[52px] min-w-0 flex-1 rounded-[10px] border border-[#E4DFD0] bg-white px-[18px] text-[15px] text-ink outline-none placeholder:text-[#9A9C8F] focus:border-olive"
                  />
                  <button type="submit" disabled={state === "loading"} className="h-[52px] rounded-[10px] bg-olive px-7 text-[15px] font-medium text-white transition-colors hover:bg-olive-dark disabled:opacity-70">
                    {state === "loading" ? "Subscribing…" : "Subscribe"}
                  </button>
                </div>
                {state === "error" ? (
                  <p className="mt-2 text-[13px] text-[#A8442C]" role="alert">
                    Please enter a valid email address.
                  </p>
                ) : (
                  <p className="mt-2 text-[12.5px] text-muted">Unsubscribe anytime. We respect your privacy.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
