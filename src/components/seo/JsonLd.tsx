/** Renders schema.org structured data. Server component — no client JS. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // escape "<" so the JSON can never close the script tag early
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
