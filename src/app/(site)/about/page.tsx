import type { Metadata } from "next";
import { getAboutPage } from "@/lib/content";
import { routes } from "@/data/site";
import { breadcrumbSchema, jsonLdGraph, organizationSchema, pageMetadata, webPageSchema } from "@/lib/seo";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStats, AboutStory, AboutTeam, AboutValues } from "@/components/about/AboutSections";
import { AboutIntro, ApproachSteps, CustomerPromise, DifferenceTable, ExpertiseGrid, VisionMission } from "@/components/about/AboutMoreSections";
import { Section } from "@/components/templates/Section";
import { IconGrid } from "@/components/templates/Blocks";
import { CtaBanner } from "@/components/templates/CtaBanner";
import { Testimonials } from "@/components/shared/Testimonials";
import { JsonLd } from "@/components/seo/JsonLd";

const page = {
  title: "About Us – Travel Planners in Solan, Himachal",
  description:
    "Vivid Yatra is a travel company in Solan, Himachal Pradesh, planning customised tours, family holidays, honeymoons, group tours and corporate travel in India.",
  path: routes.about,
};

export const metadata: Metadata = pageMetadata(page);

export default async function AboutPage() {
  const about = await getAboutPage();

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageSchema("AboutPage", { path: page.path, name: `${page.title} | Vivid Yatra`, description: page.description }),
          breadcrumbSchema([
            { name: "Home", path: routes.home },
            { name: "About", path: routes.about },
          ]),
          organizationSchema(),
        )}
      />

      {/* 01 Hero */}
      <AboutHero hero={about.hero} />

      {/* 02 What is Vivid Yatra */}
      <Section id="about-vivid-yatra" eyebrow={about.intro.eyebrow} title="What Is Vivid Yatra?" align="left">
        <AboutIntro intro={about.intro} image={about.intro.image} />
      </Section>
      <div className="pt-12 md:pt-14">
        <AboutStats stats={about.stats} />
      </div>

      {/* 03 Our Story */}
      <div className="pt-6 md:pt-10">
        <AboutStory story={about.story} />
      </div>

      {/* 04 Our Vision + 05 Our Mission */}
      <Section id="vision-mission" eyebrow="Vision & Mission" title="Where Are We Headed?" className="!pt-6 md:!pt-8">
        <VisionMission items={about.visionMission} />
      </Section>

      {/* 06 What We Believe */}
      <AboutValues values={about.values} title="What We Believe" />

      {/* 07 Why Travel With Us */}
      <Section id="why-us" eyebrow="Why Travel With Us" title="Why Plan Your Trip With Vivid Yatra?" tone="band">
        <IconGrid items={about.whyUs} columns={3} />
      </Section>

      {/* 08 Our Approach to Travel Planning */}
      <Section id="approach" eyebrow="Our Approach" title="How Do We Plan Your Trip?" subtitle="A simple, personal process — from the first travel consultation to the last day of your journey.">
        <ApproachSteps steps={about.approach} />
      </Section>

      {/* 09 What Makes Vivid Yatra Different */}
      <Section id="different" eyebrow="What Makes Us Different" title="Not Just Another Booking Website" width="narrow">
        <DifferenceTable data={about.difference} />
      </Section>

      {/* 10 Our Travel Services */}
      <Section
        id="expertise"
        eyebrow="Our Travel Services"
        title="What Kinds of Trips Do We Plan?"
        subtitle="Travel planning, holiday packages and customized tours for every kind of traveller — here are the journeys we plan most."
      >
        <ExpertiseGrid items={about.expertise} />
      </Section>
      {/* hidden until real team profiles are added in src/data/about.ts */}
      {about.team.members.length > 0 ? <AboutTeam team={about.team} /> : null}

      {/* 11 Customer-first philosophy */}
      <Section id="customer-first" eyebrow="Customer-First Philosophy" title="Our Promise to Every Traveller" className={about.team.members.length > 0 ? "!pt-0" : undefined}>
        <CustomerPromise promise={about.promise} />
      </Section>

      {/* 12 Testimonials — hidden until real, consented reviews are added */}
      {about.testimonials.length > 0 ? <Testimonials items={about.testimonials} /> : null}

      {/* 13 Final CTA */}
      <CtaBanner primary={{ label: "Plan Your Trip", href: routes.contact }} />
    </>
  );
}
