import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLegalPage, getLegalPages } from "@/lib/catalog";
import { routes, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumbs } from "@/components/templates/Breadcrumbs";
import { FlightPath } from "@/components/ui/Decorations";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, jsonLdGraph, pageMetadata, webPageSchema } from "@/lib/seo";

/*
 * Legal template — serves /privacy-policy and /terms-and-conditions.
 * Any other top-level slug 404s (dynamicParams = false).
 */

export const dynamicParams = false;

type Params = Promise<{ legal: string }>;

export async function generateStaticParams() {
  return (await getLegalPages()).map((p) => ({ legal: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const page = await getLegalPage((await params).legal);
  if (!page) return {};
  return pageMetadata({ title: page.title, description: page.description, path: `/${page.slug}` });
}

export default async function LegalPage({ params }: { params: Params }) {
  const { legal } = await params;
  const [page, all] = await Promise.all([getLegalPage(legal), getLegalPages()]);
  if (!page) notFound();

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageSchema("WebPage", { path: `/${page.slug}`, name: `${page.title} | Vivid Yatra`, description: page.description }, { dateModified: "2026-10-09" }),
          breadcrumbSchema([
            { name: "Home", path: routes.home },
            { name: page.title, path: `/${page.slug}` },
          ]),
        )}
      />

      {/* Header */}
      <header className="relative overflow-hidden border-b border-line-soft bg-sand pt-10 pb-10 md:pt-14 md:pb-14">
        <FlightPath className="absolute top-6 right-6 hidden h-[190px] w-[120px] -scale-x-100 opacity-60 md:block" />
        <div className="container-site relative">
          <Breadcrumbs tone="dark" items={[{ label: "Home", href: routes.home }, { label: page.title }]} />
          <p className="mt-6 font-script text-[30px] leading-none text-olive md:text-[36px]">Legal</p>
          <h1 className="mt-1 text-[32px] font-semibold text-ink md:text-[46px]">{page.title}</h1>
          <p className="mt-3 max-w-[640px] text-[16px] leading-[1.7] text-body">{page.summary}</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] text-subtle shadow-tile">
            <Icon name="calendar" className="size-4 text-olive" />
            Last updated: <strong className="font-semibold text-ink">{page.updated}</strong>
          </p>
        </div>
      </header>

      <div className="container-site grid gap-8 pt-10 md:pt-12 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-12">
        {/* Table of contents + other policies */}
        <aside className="lg:relative">
          <div className="space-y-5 lg:sticky lg:top-6">
            <nav aria-label="On this page" className="rounded-[14px] border border-line-soft bg-white p-4 shadow-tile">
              <p className="mb-2 px-2 text-[12.5px] font-semibold tracking-[.8px] text-muted uppercase">On this page</p>
              <ol className="space-y-0.5">
                {page.sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="flex gap-2 rounded-lg px-2 py-1.5 text-[14px] text-ink-soft transition-colors hover:bg-cream-2 hover:text-olive">
                      <span className="font-serif font-semibold text-olive">{i + 1}.</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <nav aria-label="Policies" className="hidden rounded-[14px] border border-line-soft bg-white p-4 shadow-tile lg:block">
              <p className="mb-2 px-2 text-[12.5px] font-semibold tracking-[.8px] text-muted uppercase">Policies</p>
              <ul className="space-y-0.5">
                {all.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/${p.slug}`}
                      aria-current={p.slug === page.slug ? "page" : undefined}
                      className={cn("block rounded-lg px-2 py-1.5 text-[14px] transition-colors", p.slug === page.slug ? "bg-olive text-white" : "text-ink-soft hover:bg-cream-2 hover:text-olive")}
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <article className="min-w-0 rounded-2xl border border-line-soft bg-white p-6 shadow-tile md:p-10">
          {page.sections.map((s, i) => (
            <section key={s.id} id={s.id} className={cn("scroll-mt-6", i > 0 && "mt-9 border-t border-line-soft pt-9")}>
              <h2 className="text-[21px] font-semibold text-ink md:text-[24px]">
                <span className="mr-2 font-serif text-olive">{i + 1}.</span>
                {s.title}
              </h2>
              {s.body.map((p, j) => (
                <p key={`-p`} className="mt-3 text-[15.5px] leading-[1.8] text-body">
                  {p}
                </p>
              ))}
              {s.list ? (
                <ul className="mt-4 space-y-2.5">
                  {s.list.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15.5px] leading-[1.6] text-body">
                      <span className="mt-[9px] size-2 flex-none rounded-full bg-olive" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <div className="mt-10 flex flex-col gap-4 rounded-[14px] bg-cream-2/70 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
            <div>
              <p className="text-[16px] font-semibold text-ink">Questions about this policy?</p>
              <p className="text-[14px] text-subtle">
                Write to{" "}
                <a href={`mailto:${site.contact.email}`} className="font-medium text-olive hover:underline">
                  {site.contact.email}
                </a>{" "}
                or call {site.contact.phone}.
              </p>
            </div>
            <Link href={routes.contact} className="inline-flex h-11 flex-none items-center justify-center gap-2 rounded-lg bg-olive px-5 text-[14.5px] font-medium text-white hover:bg-olive-dark">
              Contact us
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </div>
        </article>
      </div>

      {/* other policies on mobile */}
      <nav aria-label="Policies" className="container-site pt-8 lg:hidden">
        <ul className="flex flex-wrap gap-2">
          {all
            .filter((p) => p.slug !== page.slug)
            .map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`} className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-[13.5px] text-ink-soft hover:border-olive hover:text-olive">
                  {p.title}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
}
