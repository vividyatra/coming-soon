import type { Metadata } from "next";
import { getFaqGroups } from "@/lib/catalog";
import { routes, site } from "@/data/site";
import { india } from "@/data/catalog/media";
import { PageHero } from "@/components/templates/PageHero";
import { CtaBanner } from "@/components/templates/CtaBanner";
import { FaqExplorer } from "@/components/faq/FaqExplorer";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Vivid Yatra",
};

type SearchParams = Promise<{ q?: string }>;

export default async function FaqPage({ searchParams }: { searchParams: SearchParams }) {
  const [params, groups] = await Promise.all([searchParams, getFaqGroups()]);

  return (
    <>
      {/* Hero */}
      <PageHero
        image={india("kashmir-dal-lake", "Houseboats on Dal Lake")}
        breadcrumbs={[{ label: "Home", href: routes.home }, { label: "FAQ" }]}
        script="Good to know"
        title="How can we help?"
        subtitle="Answers to the questions travellers ask us most — about booking, payments, cancellations, destinations and your account."
        align="center"
        size="sm"
      />

      {/* Search + categories (General, Booking, Package, Payment, Cancellation, Destination, Customer Account) */}
      <FaqExplorer groups={groups} initialQuery={params.q} />

      {/* CTA */}
      <CtaBanner
        script="Still have questions?"
        titleLines={["Talk to a travel", "specialist today"]}
        text={`Call ${site.contact.phone} or send us your question — we reply within 24 hours.`}
        primary={{ label: "Contact Us", href: routes.contact }}
      />
    </>
  );
}
