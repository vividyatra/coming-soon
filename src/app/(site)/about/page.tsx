import type { Metadata } from "next";
import { getAboutPage } from "@/lib/content";
import { routes } from "@/data/site";
import { india } from "@/data/catalog/media";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStats, AboutStory, AboutTeam, AboutValues } from "@/components/about/AboutSections";
import { AboutIntro, ApproachSteps, CustomerPromise, DifferenceTable, ExpertiseGrid, VisionMission } from "@/components/about/AboutMoreSections";
import { Section } from "@/components/templates/Section";
import { IconGrid } from "@/components/templates/Blocks";
import { CtaBanner } from "@/components/templates/CtaBanner";
import { Testimonials } from "@/components/shared/Testimonials";

export const metadata: Metadata = {
  title: "About Us | Vivid Yatra",
};

export default async function AboutPage() {
  const about = await getAboutPage();

  return (
    <>
      {/* 01 Hero */}
      <AboutHero hero={about.hero} />

      {/* 02 About Vivid Yatra */}
      <Section id="about-vivid-yatra" eyebrow={about.intro.eyebrow} title="Who We Are" align="left">
        <AboutIntro intro={about.intro} image={india("kerala-houseboat", "Houseboat on the Kerala backwaters")} />
      </Section>
      <div className="pt-12 md:pt-14">
        <AboutStats stats={about.stats} />
      </div>

      {/* 03 Our Story */}
      <div className="pt-6 md:pt-10">
        <AboutStory story={about.story} />
      </div>

      {/* 04 Our Vision + 05 Our Mission */}
      <Section id="vision-mission" eyebrow="Vision & Mission" title="Where We’re Headed" className="!pt-6 md:!pt-8">
        <VisionMission items={about.visionMission} />
      </Section>

      {/* 06 What We Believe */}
      <AboutValues values={about.values} title="What We Believe" />

      {/* 07 Why Travel With Us */}
      <Section id="why-us" eyebrow="Why Travel With Us" title="Six Reasons Travellers Choose Us" tone="band">
        <IconGrid items={about.whyUs} columns={3} />
      </Section>

      {/* 08 Our Approach to Travel Planning */}
      <Section id="approach" eyebrow="Our Approach" title="How We Plan Your Trip" subtitle="A simple, personal process — from the first conversation to the last day of your journey.">
        <ApproachSteps steps={about.approach} />
      </Section>

      {/* 09 What Makes Vivid Yatra Different */}
      <Section id="different" eyebrow="What Makes Us Different" title="Not Just Another Booking Website" width="narrow">
        <DifferenceTable data={about.difference} />
      </Section>

      {/* 10 Our Travel Expertise (+ the team behind it) */}
      <Section id="expertise" eyebrow="Our Travel Expertise" title="Journeys We Know Best" subtitle="Specialist knowledge built over a decade of planning trips on the ground.">
        <ExpertiseGrid items={about.expertise} />
      </Section>
      <AboutTeam team={about.team} />

      {/* 11 Customer-first philosophy */}
      <Section id="customer-first" eyebrow="Customer-First Philosophy" title="Our Promise to Every Traveller" className="!pt-0">
        <CustomerPromise promise={about.promise} />
      </Section>

      {/* 12 Testimonials */}
      <Testimonials items={about.testimonials} />

      {/* 13 Final CTA */}
      <CtaBanner primary={{ label: "Plan Your Trip", href: routes.planTrip }} />
    </>
  );
}
