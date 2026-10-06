import Image from "next/image";
import { getCustomer } from "@/lib/catalog";
import { AccountNav } from "@/components/account/AccountNav";
import { Icon } from "@/components/ui/Icon";

/**
 * Customer dashboard template — shared header + navigation for every
 * /account page. Renders the demo customer until authentication exists.
 */
export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const customer = await getCustomer();

  return (
    <div className="pb-4">
      {/* welcome strip */}
      <div className="border-b border-line-soft bg-sand">
        <div className="container-site flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between md:py-9">
          <div className="flex items-center gap-4">
            <span className="relative size-16 flex-none overflow-hidden rounded-full border-2 border-white bg-cream-2 shadow-tile md:size-[72px]">
              <Image src={customer.avatar.src} alt={customer.avatar.alt} fill sizes="72px" className="object-cover" />
            </span>
            <div>
              <p className="font-script text-[26px] leading-none text-olive md:text-[30px]">Namaste,</p>
              <p className="text-[22px] leading-tight font-semibold text-ink md:text-[26px]">{customer.name}</p>
              <p className="mt-0.5 text-[13px] text-muted">Member since {customer.memberSince}</p>
            </div>
          </div>
          <p className="inline-flex items-center gap-2 self-start rounded-full bg-white px-3.5 py-1.5 text-[12.5px] text-subtle shadow-tile sm:self-center">
            <Icon name="info" className="size-4 text-olive" />
            Demo account — connects to live data once login is enabled
          </p>
        </div>
      </div>

      <div className="container-site grid grid-cols-[minmax(0,1fr)] gap-6 pt-6 md:pt-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10">
        <aside className="lg:relative">
          <div className="lg:sticky lg:top-6 lg:rounded-2xl lg:border lg:border-line-soft lg:bg-white lg:p-3 lg:shadow-tile">
            <AccountNav />
          </div>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
