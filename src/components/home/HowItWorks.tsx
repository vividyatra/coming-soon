import type { ProcessStep } from "@/types/content";
import { routes } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { FlightPath, TornEdge } from "@/components/ui/Decorations";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Five-step process, styled after the original Trip Planner step markers. */
export function HowItWorks({ steps }: { steps: ProcessStep[] }) {
  return (
    <section aria-labelledby="process-title" className="relative mt-14 md:mt-[72px] lg:mt-[84px]">
      <TornEdge fill="#F2EFE6" stroke="#E7E2D3" className="-mb-px h-[42px] md:h-[62px]" />
      <div className="relative overflow-hidden bg-sand pt-8 pb-14 md:pb-[72px] lg:pb-20">
        <FlightPath className="absolute top-2 right-6 hidden h-[190px] w-[120px] -scale-x-100 opacity-70 lg:block" />

        <div className="container-site relative">
          <SectionHeading
            eyebrow="Simple & Stress-Free"
            title="How Vivid Yatra Works"
            subtitle="From the first idea to the final day of your trip — five easy steps."
            titleId="process-title"
          />

          <ol className="mx-auto mt-4 grid max-w-[520px] gap-8 lg:mt-8 lg:max-w-none lg:grid-cols-5 lg:gap-4">
            {steps.map((step, i) => {
              const last = i === steps.length - 1;
              return (
                <li
                  key={step.title}
                  className={`relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center ${
                    last
                      ? ""
                      : "before:absolute before:top-[72px] before:-bottom-6 before:left-8 before:border-l before:border-dashed before:border-[#CFC9B8] lg:before:hidden lg:after:absolute lg:after:top-8 lg:after:right-[calc(-50%+46px)] lg:after:left-[calc(50%+46px)] lg:after:border-t lg:after:border-dashed lg:after:border-[#CFC9B8]"
                  }`}
                >
                  <span className="relative flex size-16 flex-none items-center justify-center rounded-full border border-[#DCD7C8] bg-card text-olive shadow-tile">
                    <Icon name={step.icon} className="size-[30px]" />
                    <span className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full bg-olive text-[11.5px] font-semibold text-white">
                      {i + 1}
                    </span>
                  </span>
                  <span className="block pt-1 lg:pt-5">
                    <span className="block font-serif text-[19px] leading-[1.25] font-semibold text-ink md:text-xl">{step.title}</span>
                    <span className="mt-1.5 block text-[14px] leading-[1.6] text-subtle lg:mx-auto lg:max-w-[200px]">{step.description}</span>
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <ButtonLink href={routes.planTrip} icon="arrowRight" size="lg">
              Start Planning Your Trip
            </ButtonLink>
            <p className="text-[13.5px] text-muted">Free consultation · Reply within 24 hours</p>
          </div>
        </div>
      </div>
      <TornEdge fill="#F2EFE6" stroke="#E7E2D3" className="-mt-px h-[34px] rotate-180 md:h-[48px]" />
    </section>
  );
}
