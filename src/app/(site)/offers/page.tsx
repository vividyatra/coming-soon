import type { Metadata } from "next";
import Link from "next/link";
import { getOffers, getPackages } from "@/lib/catalog";
import { routes } from "@/data/site";
import { india } from "@/data/catalog/media";
import { PageHero } from "@/components/templates/PageHero";
import { Section } from "@/components/templates/Section";
import { FaqAccordion } from "@/components/templates/FaqAccordion";
import { CtaBanner } from "@/components/templates/CtaBanner";
import { CheckList } from "@/components/templates/Blocks";
import { OffersGrid } from "@/components/offers/OffersGrid";
import { CouponTable, FeaturedDeal, PackageOfferRow } from "@/components/offers/OfferSections";
import { OfferCard } from "@/components/cards/OfferCard";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Special Offers & Deals | Vivid Yatra",
};

const generalTerms = [
  "Offers are valid only on new bookings made within the stated validity period.",
  "Only one offer or promo code can be applied per booking.",
  "Discounts apply to the land package unless stated otherwise; flights, visas and taxes are excluded.",
  "All offers are subject to availability of hotels, vehicles and experiences at the time of booking.",
  "Blackout dates may apply during festivals, long weekends and 20 Dec – 5 Jan.",
  "Vivid Yatra may modify or withdraw any offer without prior notice. Offers already confirmed with an advance payment will be honoured.",
];

const faqs = [
  { question: "How do I apply a promo code?", answer: "Mention the code in your enquiry or share it with your trip manager. The discount is applied to your quote before payment." },
  { question: "Can I combine two offers?", answer: "No — only one offer or promo code can be applied to a booking, but we will always apply the one that saves you the most." },
  { question: "Do offers apply to customised trips?", answer: "Yes, as long as your trip is built on an eligible package and meets the offer conditions." },
  { question: "What happens if an offer expires after I enquire?", answer: "The offer price is locked once your advance payment is received within the validity period." },
];

export default async function OffersPage() {
  const [offers, packages] = await Promise.all([getOffers(), getPackages()]);
  const featured = offers.filter((o) => o.featured);
  const limited = offers.filter((o) => o.kind === "Limited Time");
  const packageOffers = offers.filter((o) => o.kind === "Package Offer" || o.kind === "Seasonal");
  const pkgsFor = (o: (typeof offers)[number]) => packages.filter((p) => o.applicablePackages.includes(p.slug));

  return (
    <>
      {/* Hero */}
      <PageHero
        image={india("udaipur-city-palace", "City Palace, Udaipur")}
        breadcrumbs={[{ label: "Home", href: routes.home }, { label: "Offers" }]}
        script="Limited Time Deals"
        title="Special Offers"
        subtitle="Seasonal savings, honeymoon extras and early-bird prices on our most-loved journeys."
      >
        <Link href="#active" className="inline-flex h-12 items-center gap-2 rounded-lg bg-paper px-6 text-[15px] font-medium text-ink transition-colors hover:bg-white">
          See all {offers.length} active offers
          <Icon name="arrowRight" className="size-4" />
        </Link>
      </PageHero>

      {/* Featured Deals */}
      <Section id="featured" eyebrow="Featured Deals" title="This Season’s Best Deals">
        <div className="grid gap-5 lg:grid-cols-2 2xl:gap-6">
          {featured.slice(0, 2).map((o) => (
            <FeaturedDeal key={o.slug} offer={o} />
          ))}
        </div>
      </Section>

      {/* Active Offers */}
      <Section id="active" eyebrow="Active Offers" title="All Active Offers" subtitle="Filter by the kind of deal you’re looking for.">
        <OffersGrid offers={offers} />
      </Section>

      {/* Limited-Time Offers */}
      {limited.length ? (
        <Section id="limited" eyebrow="Hurry" title="Limited-Time Offers" subtitle="Early-bird prices with limited seats — book before they’re gone." tone="band">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {limited.map((o) => (
              <OfferCard key={o.slug} offer={o} />
            ))}
          </div>
        </Section>
      ) : null}

      {/* Package Offers */}
      <Section id="package-offers" eyebrow="Package Offers" title="Savings on Specific Packages" align="left">
        <div className="space-y-5">
          {packageOffers.map((o) => (
            <PackageOfferRow key={o.slug} offer={o} packages={pkgsFor(o)} />
          ))}
        </div>
      </Section>

      {/* Coupon / Promo information */}
      <Section id="codes" eyebrow="Coupon & Promo Codes" title="Your Promo Codes" subtitle="Copy a code and mention it in your enquiry — we’ll apply it to your quote." width="narrow">
        <CouponTable offers={offers} />
      </Section>

      {/* Terms & Conditions */}
      <Section id="terms" eyebrow="Terms & Conditions" title="Offer Terms" width="narrow">
        <div className="rounded-[14px] border border-line-soft bg-white p-6 shadow-tile md:p-8">
          <CheckList items={generalTerms} variant="dot" />
          <p className="mt-6 text-[13.5px] text-muted">
            Each offer also has its own specific terms on its detail page. See our{" "}
            <Link href={routes.terms} className="font-medium text-olive hover:underline">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link href={routes.cancellation} className="font-medium text-olive hover:underline">
              Cancellation Policy
            </Link>
            .
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" eyebrow="Good To Know" title="Offer FAQs" width="narrow">
        <FaqAccordion faqs={faqs} name="offers-faq" />
      </Section>

      {/* CTA */}
      <CtaBanner script="Found a deal you like?" titleLines={["Let’s lock it in", "before it’s gone"]} primary={{ label: "Claim an Offer", href: routes.planTrip }} />
    </>
  );
}
