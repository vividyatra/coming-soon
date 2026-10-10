import type { Metadata } from "next";
import { getFaqGroups } from "@/lib/catalog";
import { routes, site } from "@/data/site";
import { india } from "@/data/catalog/media";
import { breadcrumbSchema, faqEntities, jsonLdGraph, pageMetadata, webPageSchema } from "@/lib/seo";
import { PageHero } from "@/components/templates/PageHero";
import { CtaBanner } from "@/components/templates/CtaBanner";
import { FaqExplorer, type FaqGroupIcons } from "@/components/faq/FaqExplorer";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";

const page = {
  title: "Travel Planning FAQs – Packages, Payments & Permits",
  description:
    "Answers to common questions about Vivid Yatra’s holiday packages, trip planning, payments, cancellations, permits and the best time to visit Himachal Pradesh.",
  path: routes.faq,
};

export const metadata: Metadata = pageMetadata(page);

/* Statically prerendered - the search (?q=) is handled in the browser by FaqExplorer. */
export default async function FaqPage() {
  const groups = await getFaqGroups();
  const icons: FaqGroupIcons = Object.fromEntries(
    groups.map((g) => [
      g.slug,
      { nav: <Icon name={g.icon} className="size-[18px] shrink-0 text-olive" />, heading: <Icon name={g.icon} className="size-5 shrink-0" /> },
    ]),
  );

  return (
    <>
      {/* FAQPage structured data — only on this page; always lists every question, whatever the search */}
      <JsonLd
        data={jsonLdGraph(
          webPageSchema(
            "FAQPage",
            { path: page.path, name: `${page.title} | Vivid Yatra`, description: page.description },
            faqEntities(groups.flatMap((g) => g.items)),
          ),
          breadcrumbSchema([
            { name: "Home", path: routes.home },
            { name: "FAQ", path: routes.faq },
          ]),
        )}
      />

      {/* Hero */}
      <PageHero
        image={india("kashmir-dal-lake", "Houseboats on Dal Lake with snowy mountains behind")}
        breadcrumbs={[{ label: "Home", href: routes.home }, { label: "FAQ" }]}
        script="Good to know"
        title="Travel Planning FAQs"
        subtitle="Straight answers about our travel services, enquiries, trip planning, payments, cancellations and destinations across India."
        align="center"
        size="sm"
      />

      {/* Search + categories (General, Travel Services, Enquiries & Booking, Trip Planning, Payments, Cancellations, Destinations, Contact & Support) */}
      <FaqExplorer groups={groups} icons={icons} />

      {/* CTA */}
      <CtaBanner
        script="Still have questions?"
        titleLines={["Talk to a travel", "planner today"]}
        text={`Call ${site.contact.phone} or send us your question — we aim to reply within 24 hours.`}
        primary={{ label: "Contact Us", href: routes.contact }}
      />
    </>
  );
}
