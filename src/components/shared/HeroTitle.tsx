/** "Every Destination. / Every Experience. / A New You." — shared by the Home and Destinations heroes. */
export function HeroTitle({ lines, script, id }: { lines: string[]; script: string; id?: string }) {
  return (
    <h1
      id={id}
      className="text-[29px] leading-[1.09] font-medium tracking-[-.2px] text-ink-deep xs:text-[33px] sm:text-[38px] sm:tracking-[-.5px] md:text-[44px] lg:text-[46px] xl:text-[50px] 2xl:text-[56px] 4xl:text-[57px]"
    >
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
      <span className="mt-[25px] block font-script text-[38px] leading-[1.1] font-normal tracking-normal text-olive xs:text-[42px] sm:text-[48px] md:text-[56px] lg:text-[58px] xl:text-[62px] 2xl:text-[70px] 4xl:text-[68px]">
        {script}
      </span>
    </h1>
  );
}
