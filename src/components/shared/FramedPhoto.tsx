import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  /** position / size / rotation of the frame */
  className?: string;
  preload?: boolean;
};

/** White-bordered, tilted photo used in the About and Blog collages. */
export function FramedPhoto({ src, alt, sizes, className, preload }: Props) {
  return (
    <figure className={cn("absolute m-0 overflow-hidden rounded-xl bg-white p-[7px] shadow-photo", className)}>
      <div className="relative size-full overflow-hidden rounded-[7px]">
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} fetchPriority={preload ? "high" : undefined} className="object-cover" />
      </div>
    </figure>
  );
}
