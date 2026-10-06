import type { Metadata } from "next";
import { getCustomer, getTravelStyles } from "@/lib/catalog";
import { ProfileForms } from "@/components/account/ProfileForms";

export const metadata: Metadata = {
  title: "Profile & Settings | Vivid Yatra",
};

export default async function ProfilePage() {
  const [customer, styles] = await Promise.all([getCustomer(), getTravelStyles()]);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-semibold text-ink md:text-[34px]">Profile & Settings</h1>
        <p className="mt-1 text-[15px] text-subtle">Manage your personal information, contact details, password and preferences.</p>
      </div>
      <ProfileForms customer={customer} styles={styles} />
    </div>
  );
}
