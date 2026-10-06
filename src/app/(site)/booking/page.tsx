import type { Metadata } from "next";
import { getPackages } from "@/lib/catalog";
import { routes } from "@/data/site";
import { Breadcrumbs } from "@/components/templates/Breadcrumbs";
import { BookingForm } from "@/components/booking/BookingForm";

export const metadata: Metadata = {
  title: "Book Your Trip | Vivid Yatra",
};

type SearchParams = Promise<{ package?: string; tier?: string }>;

export default async function BookingPage({ searchParams }: { searchParams: SearchParams }) {
  const [params, packages] = await Promise.all([searchParams, getPackages()]);

  return (
    <div className="pb-4">
      <div className="container-site pt-8 md:pt-10">
        <Breadcrumbs tone="dark" items={[{ label: "Home", href: routes.home }, { label: "Tour Packages", href: routes.packages }, { label: "Booking" }]} />
        <p className="mt-5 font-script text-[30px] leading-none text-olive md:text-[36px]">Almost there</p>
        <h1 className="mt-1 text-[30px] font-semibold text-ink md:text-[42px]">Book Your Trip</h1>
        <p className="mt-2 max-w-[620px] text-[15.5px] leading-[1.7] text-body">Confirm your details below. No payment is taken now — your trip manager confirms availability first.</p>
      </div>
      <BookingForm key={JSON.stringify(params)} packages={packages} initialSlug={params.package} initialTier={Number(params.tier) || 0} />
    </div>
  );
}
