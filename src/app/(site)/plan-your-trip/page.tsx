import type { Metadata } from "next";
import { getPlannerPage } from "@/lib/content";
import { getDestination, getDestinations, getOffer, getPackage } from "@/lib/catalog";
import { ContactHero, WhyPlan } from "@/components/contact/ContactSections";
import { TripPlanner } from "@/components/contact/TripPlanner";
import { Testimonials } from "@/components/shared/Testimonials";

export const metadata: Metadata = {
  title: "Plan Your Trip | Vivid Yatra",
};

type SearchParams = Promise<{ package?: string; destination?: string; offer?: string }>;

export default async function PlanYourTripPage({ searchParams }: { searchParams: SearchParams }) {
  const [params, planner, destinations] = await Promise.all([searchParams, getPlannerPage(), getDestinations()]);

  // pre-fill when arriving from a package, destination or offer page
  const [pkg, destination, offer] = await Promise.all([
    params.package ? getPackage(params.package) : undefined,
    params.destination ? getDestination(params.destination) : undefined,
    params.offer ? getOffer(params.offer) : undefined,
  ]);
  const prefill = {
    destination: pkg ? `${pkg.title} (${pkg.placesCovered.slice(0, 3).join(", ")})` : destination ? destination.name : undefined,
    note: [pkg ? `I’d like to customise the “${pkg.title}” package.` : "", offer ? `Please apply the offer “${offer.title}”${offer.code ? ` (code ${offer.code})` : ""}.` : ""].filter(Boolean).join(" ") || undefined,
  };

  return (
    <>
      <ContactHero hero={planner.hero} />
      <TripPlanner
        key={JSON.stringify(params)}
        steps={planner.steps}
        options={planner.options}
        success={planner.success}
        suggestions={destinations.map((d) => (d.region === "India" ? `${d.name}, ${d.state}` : d.name))}
        prefill={prefill}
      />
      <WhyPlan items={planner.why} />
      <Testimonials items={planner.testimonials} showHeading={false} className="pt-[30px] pb-[46px] md:pt-[38px] md:pb-[54px] lg:pt-9 lg:pb-[52px]" />
    </>
  );
}
