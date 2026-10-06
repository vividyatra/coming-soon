import type { Metadata } from "next";
import Link from "next/link";
import { routes } from "@/data/site";
import { india } from "@/data/catalog/media";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log In | Vivid Yatra",
};

export default function LoginPage() {
  return (
    <AuthShell
      image={india("udaipur-city-palace", "City Palace above Lake Pichola, Udaipur")}
      script="Welcome back"
      quote="Every detail was taken care of — we just had to show up and enjoy."
      cite="Ananya & Rohan, Udaipur"
      title="Log in to your account"
      subtitle="Track your enquiries, bookings and upcoming trips in one place."
      footer={
        <>
          New to Vivid Yatra?{" "}
          <Link href={routes.register} className="font-semibold text-olive hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
