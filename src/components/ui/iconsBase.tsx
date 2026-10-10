import type { ReactNode, SVGProps } from "react";

/**
 * The small set of UI icons that client components need (header, sliders, forms, FAQ search, map).
 * Kept apart from the full set in Icon.tsx so the browser bundle doesn't carry every icon;
 * Icon.tsx spreads these into its map, so each icon is still defined only once.
 */
export type IconDef = { viewBox: string; body: ReactNode };

export const s = { stroke: "currentColor", fill: "none" } as const;

export const BASE_ICONS = {
  arrowRight: {
    viewBox: "0 0 24 24",
    body: <path d="M5 12h13m0 0-5-5m5 5-5 5" {...s} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  arrowLeft: {
    viewBox: "0 0 24 24",
    body: <path d="M19 12H6m0 0 5-5m-5 5 5 5" {...s} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  calendar: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" {...s} strokeWidth="1.5" />
        <path d="M3.5 9.5h17M8 3v4M16 3v4" {...s} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  pin: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.3" {...s} strokeWidth="1.5" />
      </>
    ),
  },
  check: {
    viewBox: "0 0 24 24",
    body: <path d="m5 12.5 4.5 4.5L19 7.5" {...s} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  },
  chevronDown: {
    viewBox: "0 0 24 24",
    body: <path d="m6 9.5 6 6 6-6" {...s} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  plus: {
    viewBox: "0 0 24 24",
    body: <path d="M12 5v14M5 12h14" {...s} strokeWidth="1.6" strokeLinecap="round" />,
  },
  search: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <circle cx="11" cy="11" r="6.6" {...s} strokeWidth="1.8" />
        <path d="m16 16 4.5 4.5" {...s} strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
  menu: {
    viewBox: "0 0 24 24",
    body: <path d="M4 6h16M4 12h16M4 18h16" {...s} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  },
  close: {
    viewBox: "0 0 24 24",
    body: <path d="M6 6l12 12M18 6 6 18" {...s} strokeWidth="2" strokeLinecap="round" />,
  },
  phone: {
    viewBox: "0 0 24 24",
    body: <path d="M8.6 3.5 10.8 8l-2.2 2.2a13.5 13.5 0 0 0 5.2 5.2L16 13.2l4.5 2.2v3.4c0 1.1-.9 2-2 2C10.2 20.5 3.5 13.8 3.3 5.5c0-1.1.9-2 2-2h3.3Z" {...s} strokeWidth="1.6" strokeLinejoin="round" />,
  },
  whatsapp: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <path d="M4.5 19.5 5.6 16A8 8 0 1 1 8.4 18.6l-3.9.9Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9.3 8.6c.2-.4.5-.4.8-.4h.4c.2 0 .3.1.4.4l.6 1.4c0 .2 0 .3-.1.5l-.5.6c.6 1.1 1.4 1.9 2.5 2.5l.6-.5c.2-.1.3-.1.5-.1l1.4.6c.3.1.4.2.4.4v.4c0 .3 0 .6-.4.8-.5.3-1.2.5-1.8.3-2.3-.7-4.1-2.5-4.8-4.8-.2-.6 0-1.3.3-1.8Z" fill="currentColor" />
      </>
    ),
  },
  star: {
    viewBox: "0 0 24 24",
    body: <path d="m12 3.2 2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.8-5.4 2.8 1-6L3.3 9.6l6-.9L12 3.2Z" fill="currentColor" />,
  },

} satisfies Record<string, IconDef>;

export type BaseIconName = keyof typeof BASE_ICONS;

type SvgProps = Omit<SVGProps<SVGSVGElement>, "name"> & { title?: string };

export function IconSvg({ icon, title, ...rest }: SvgProps & { icon: IconDef }) {
  return (
    <svg viewBox={icon.viewBox} aria-hidden={title ? undefined : true} role={title ? "img" : undefined} focusable="false" {...rest}>
      {title ? <title>{title}</title> : null}
      {icon.body}
    </svg>
  );
}

/** Client-safe icon - same markup as <Icon>, limited to BASE_ICONS. */
export function BaseIcon({ name, ...rest }: SvgProps & { name: BaseIconName }) {
  return <IconSvg icon={BASE_ICONS[name]} {...rest} />;
}
