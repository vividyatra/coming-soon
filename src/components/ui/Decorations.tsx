import { cn } from "@/lib/utils";

/* Decorative artwork lifted from the original HTML design. All aria-hidden. */

export function FlightPath({ className }: { className?: string }) {
  return (
    <svg className={cn("pointer-events-none", className)} viewBox="0 0 190 300" fill="none" aria-hidden="true">
      <path d="M96 16C60 40 38 78 30 122c-8 44-4 92 14 138" stroke="#8A8B6E" strokeWidth="1.4" strokeDasharray="5 7" strokeLinecap="round" />
      <path d="M84 6 118 18 88 30l-2-8 16-4-16-4 2-8Z" fill="#3F4A1E" />
    </svg>
  );
}

export function BotanicalBranch({ className }: { className?: string }) {
  return (
    <svg className={cn("pointer-events-none", className)} viewBox="0 0 150 300" fill="none" aria-hidden="true">
      <path d="M132 6C104 60 74 130 52 196 38 238 30 268 26 292" stroke="#8C8B5E" strokeWidth="2" />
      <path
        d="M118 34c-16-6-30-2-40 10 14 8 30 6 40-10ZM122 40c6 16 3 30-9 39-8-14-6-30 9-39ZM100 78c-16-6-30-2-40 10 14 8 30 6 40-10ZM104 84c6 16 3 30-9 39-8-14-6-30 9-39ZM82 124c-16-6-30-2-40 10 14 8 30 6 40-10ZM86 130c6 16 3 30-9 39-8-14-6-30 9-39ZM64 172c-16-6-30-2-40 10 14 8 30 6 40-10ZM68 178c6 16 3 30-9 39-8-14-6-30 9-39ZM50 222c-14-6-27-2-36 9 13 7 27 5 36-9Z"
        fill="#8C8B5E"
        fillOpacity=".85"
      />
    </svg>
  );
}

/** Looping dashed flight path ending in a paper plane (quiz / features bar art). */
export function PlaneLoop({ className, stroke = "#B3AE96", plane = "#6E7548" }: { className?: string; stroke?: string; plane?: string }) {
  return (
    <svg className={cn("pointer-events-none", className)} viewBox="0 0 200 120" fill="none" aria-hidden="true">
      <path d="M4 104c24 12 46 7 56-8 8-13 1-27-10-27-10 0-16 10-8 20 12 15 44 20 73 8 19-8 36-21 49-38" stroke={stroke} strokeWidth="1.4" strokeDasharray="4 7" strokeLinecap="round" />
      <g transform="translate(150 40) rotate(-32)" fill={plane}>
        <path d="M0 8 24 0l-8 21-4.2-7.8L0 8Z" />
      </g>
    </svg>
  );
}

const TORN =
  "L0 42 L19 34 L32 35 L44 34 L58 35 L71 36 L84 28 L100 31 L119 28 L132 29 L145 24 L162 26 L178 24 L190 30 L201 32 L216 37 L229 34 L247 34 L257 40 L275 35 L294 37 L305 54 L314 48 L334 48 L349 48 L361 48 L373 40 L384 48 L395 41 L406 42 L418 40 L432 37 L450 45 L463 48 L479 43 L493 48 L508 56 L520 48 L532 56 L547 48 L561 47 L570 45 L581 48 L597 42 L611 35 L625 38 L640 38 L659 31 L678 31 L694 33 L707 30 L726 27 L740 33 L755 29 L765 24 L783 33 L794 34 L812 30 L824 38 L833 44 L846 38 L856 42 L873 50 L889 44 L908 48 L919 48 L935 48 L953 48 L966 53 L977 48 L993 48 L1007 46 L1024 48 L1043 48 L1053 46 L1071 38 L1088 42 L1100 48 L1113 48 L1127 43 L1143 42 L1161 44 L1176 46 L1192 48 L1208 56 L1221 54 L1235 48 L1252 48 L1262 56 L1277 48 L1287 48 L1303 44 L1320 46 L1331 43 L1343 39 L1358 45 L1378 36 L1393 43 L1410 48 L1420 48 L1430 54 L1440 36";

/** Torn-paper edge from the Destinations/Blog heroes. `fill` = colour of the section below. */
export function TornEdge({ className, fill = "#F7F4ED", stroke = "#E7E2D3" }: { className?: string; fill?: string; stroke?: string }) {
  return (
    <svg className={cn("pointer-events-none block w-full", className)} viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
      <path d={`M0 90 ${TORN} L1440 90 Z`} fill={fill} />
      <path d={`M0 42 ${TORN.slice(6)}`} stroke={stroke} strokeWidth="1.5" fill="none" />
    </svg>
  );
}
