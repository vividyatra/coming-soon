import {
  getActiveOffers,
  getFaqs,
  getFeaturedPackages,
  getFeaturedSightseeing,
  getGallery,
  getHeroContent,
  getLatestBlogs,
  getPopularDestinations,
  getProcessSteps,
  getTestimonials,
  getTravelStyles,
  getWhyChoose,
} from "@/lib/content";
import { HeroSection } from "@/components/home/HeroSection";
import { PopularDestinations } from "@/components/home/PopularDestinations";
import { FeaturedPackages } from "@/components/home/FeaturedPackages";
import { WhyChoose } from "@/components/home/WhyChoose";
import { TravelStyles } from "@/components/home/TravelStyles";
import { FeaturedSightseeing } from "@/components/home/FeaturedSightseeing";
import { SpecialOffers } from "@/components/home/SpecialOffers";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LatestBlogs } from "@/components/home/LatestBlogs";
import { Testimonials } from "@/components/shared/Testimonials";
import { TravelGallery } from "@/components/home/TravelGallery";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";

export default async function HomePage() {
  const [hero, destinations, packages, whyChoose, styles, sightseeing, offers, steps, blogs, testimonials, gallery, faqs] =
    await Promise.all([
      getHeroContent(),
      getPopularDestinations(),
      getFeaturedPackages(),
      getWhyChoose(),
      getTravelStyles(),
      getFeaturedSightseeing(),
      getActiveOffers(),
      getProcessSteps(),
      getLatestBlogs(),
      getTestimonials(),
      getGallery(),
      getFaqs(),
    ]);

  return (
    <>
      <HeroSection hero={hero.hero} stats={hero.stats} categories={hero.categories} />
      <PopularDestinations destinations={destinations} />
      <FeaturedPackages packages={packages} />
      <WhyChoose features={whyChoose} />
      <TravelStyles styles={styles} />
      <FeaturedSightseeing places={sightseeing} />
      <SpecialOffers offers={offers} />
      <HowItWorks steps={steps} />
      <LatestBlogs posts={blogs} />
      <Testimonials items={testimonials} />
      <TravelGallery categories={gallery.categories} items={gallery.items} />
      <FaqSection faqs={faqs} />
      <FinalCta />
    </>
  );
}
