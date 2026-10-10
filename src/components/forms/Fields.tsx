import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { BaseIcon as Icon, type BaseIconName as IconName } from "@/components/ui/iconsBase";

/* Form primitives in the original Trip Planner style (cream inputs, olive focus). */

export const inputClass =
  "h-[50px] w-full rounded-[10px] border border-[#E4DFD0] bg-[#FFFDF9] px-[18px] text-[15px] text-ink outline-none transition-colors duration-200 placeholder:text-[#9A9C8F] focus:border-olive disabled:opacity-60 md:h-[52px] md:text-[15.5px]";

export const errorInputClass = "border-[#C0715C]";

export function Label({ htmlFor, children, required, className }: { htmlFor?: string; children: ReactNode; required?: boolean; className?: string }) {
  const cls = cn("mb-2.5 block text-[14.5px] font-semibold text-ink md:text-[15px]", className);
  const content = (
    <>
      {children}
      {required ? <span className="ml-0.5 text-[#A8442C]" aria-hidden="true">*</span> : null}
    </>
  );
  return htmlFor ? (
    <label htmlFor={htmlFor} className={cls}>
      {content}
    </label>
  ) : (
    <span className={cls}>{content}</span>
  );
}

type FieldWrapProps = { label?: ReactNode; htmlFor?: string; required?: boolean; error?: string; hint?: string; className?: string; children: ReactNode };

export function Field({ label, htmlFor, required, error, hint, className, children }: FieldWrapProps) {
  return (
    <div className={className}>
      {label ? (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      ) : null}
      {children}
      {error ? (
        <p id={htmlFor ? `${htmlFor}-error` : undefined} className="mt-1.5 text-[13px] text-[#A8442C]" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-[12.5px] text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export function TextInput({ icon, invalid, className, ...rest }: InputHTMLAttributes<HTMLInputElement> & { icon?: IconName; invalid?: boolean }) {
  return (
    <div className="relative flex items-center">
      {icon ? <Icon name={icon} className="pointer-events-none absolute left-[18px] size-5 text-stone" /> : null}
      <input aria-invalid={invalid || undefined} className={cn(inputClass, icon && "pl-12", invalid && errorInputClass, className)} {...rest} />
    </div>
  );
}

export function SelectInput({ options, placeholder, invalid, className, ...rest }: SelectHTMLAttributes<HTMLSelectElement> & { options: (string | { label: string; value: string })[]; placeholder?: string; invalid?: boolean }) {
  return (
    <div className="relative flex items-center">
      <select aria-invalid={invalid || undefined} className={cn(inputClass, "cursor-pointer appearance-none pr-[46px]", invalid && errorInputClass, className)} {...rest}>
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((o) => {
          const opt = typeof o === "string" ? { label: o, value: o } : o;
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
      <Icon name="chevronDown" className="pointer-events-none absolute right-[18px] size-5 text-stone" />
    </div>
  );
}

export function TextArea({ invalid, className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return <textarea aria-invalid={invalid || undefined} className={cn(inputClass, "h-28 resize-y py-3.5 leading-[1.6] md:h-28", invalid && errorInputClass, className)} {...rest} />;
}

export function Checkbox({ label, className, ...rest }: InputHTMLAttributes<HTMLInputElement> & { label: ReactNode }) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-3 text-[14px] leading-[1.55] text-body", className)}>
      <input type="checkbox" className="mt-0.5 size-[18px] flex-none cursor-pointer rounded border-line accent-[#67662A]" {...rest} />
      <span>{label}</span>
    </label>
  );
}

/** Pill toggles for multi-select choices (experiences, travel styles…). */
export function ChipGroup({ options, value, onChange, label }: { options: string[]; value: string[]; onChange: (next: string[]) => void; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2.5">
      {options.map((option) => {
        const on = value.includes(option);
        return (
          <button
            key={option}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(on ? value.filter((v) => v !== option) : [...value, option])}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[14px] transition-colors",
              on ? "border-olive bg-olive text-white" : "border-[#E4DFD0] bg-[#FFFDF9] text-ink-soft hover:border-olive hover:text-olive",
            )}
          >
            {on ? <Icon name="check" className="size-3.5" /> : null}
            {option}
          </button>
        );
      })}
    </div>
  );
}

export function SubmitButton({ children, loading, className }: { children: ReactNode; loading?: boolean; className?: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={cn(
        "inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-[10px] bg-olive px-6 text-[15px] font-medium text-white transition-colors duration-[250ms] hover:bg-olive-dark disabled:opacity-70 md:h-[52px] md:text-base",
        className,
      )}
    >
      {loading ? "Please wait…" : children}
    </button>
  );
}

export function FormSuccess({ title, text, reference, children }: { title: string; text: string; reference?: string; children?: ReactNode }) {
  return (
    <div className="py-6 text-center" role="status">
      <span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-olive text-white">
        <Icon name="check" className="size-[26px]" />
      </span>
      <h3 className="text-2xl font-semibold text-ink md:text-[26px]">{title}</h3>
      <p className="mx-auto mt-2 max-w-[420px] text-[15px] leading-[1.7] text-body">{text}</p>
      {reference ? (
        <p className="mt-3 text-[13.5px] text-muted">
          Reference: <strong className="font-semibold text-ink">{reference}</strong>
        </p>
      ) : null}
      {children}
    </div>
  );
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
export const validPhone = (v: string) => v.replace(/[^0-9]/g, "").length >= 10;
