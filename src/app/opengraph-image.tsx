import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SOCIAL_IMAGE } from "@/lib/seo";

/*
 * Default social preview (og:image) for every page - 1200x630 PNG generated at build time
 * from the existing hero photo and the light (footer) logo, in the brand olive palette.
 */
export const alt = SOCIAL_IMAGE.alt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asDataUri = async (file: string, mime: string) =>
  `data:${mime};base64,${(await readFile(join(process.cwd(), "public", file))).toString("base64")}`;

export default async function Image() {
  const [photo, logo] = await Promise.all([
    asDataUri("images/hero-banner.jpg", "image/jpeg"),
    asDataUri("images/footer-logo.svg", "image/svg+xml"),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", backgroundColor: "#3F4A1C" }}>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={photo} width={1200} height={800} style={{ position: "absolute", top: -60, left: 0, width: 1200, height: 800, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            backgroundImage: "linear-gradient(90deg, rgba(35,42,15,0.95) 0%, rgba(52,62,23,0.88) 50%, rgba(63,74,28,0.30) 100%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "56px 72px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={logo} width={132} height={126} />
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
            <div style={{ display: "flex", fontSize: 60, lineHeight: 1.15, color: "#FFFFFF" }}>Vivid Yatra — Travel Planning & Holiday Packages in India</div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 28, fontSize: 30, color: "#EDE9DA" }}>
              <div style={{ display: "flex", width: 44, height: 4, marginRight: 18, backgroundColor: "#C8C38E" }} />
              Solan, Himachal Pradesh
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 1, color: "rgba(247,244,237,0.82)" }}>www.vividyatra.com</div>
        </div>
      </div>
    ),
    size,
  );
}