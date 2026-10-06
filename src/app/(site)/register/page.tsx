import type { Metadata } from "next";
import Link from "next/link";
import { routes } from "@/data/site";
import { india } from "@/data/catalog/media";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account | Vivid Yatra",
};

export default function RegisterPage() {
  return (
    <AuthShell
      image={india("kerala-backwaters", "Houseboat on the Kerala backwaters")}
      script="Start your journey"
      quote="Planning with Vivid Yatra felt like having a friend in every city."
      cite="Neha & Karan, Kerala"
      title="Create your account"
      subtitle="Save favourite packages, track enquiries and manage every booking."
      footer={
        <>
          Already have an account?{" "}
          <Link href={routes.login} className="font-semibold text-olive hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
