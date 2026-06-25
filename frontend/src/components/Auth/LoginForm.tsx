"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import AuthField from "./AuthField";
import AuthStatus from "./AuthStatus";
import { createSupabaseBrowserClient } from "../../lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setErrorMessage("Supabase environment variables are missing. Add them to .env.local before testing login.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    // Supabase verifies the email/password and stores a session for the app.
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
      return;
    }

    router.push(searchParams.get("redirectedFrom") || "/dashboard");
    router.refresh();
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {errorMessage ? <AuthStatus type="error" message={errorMessage} /> : null}
      <AuthField id="email" name="email" type="email" label="Email" required />
      <AuthField id="password" name="password" type="password" label="Password" required />
      <div className="flex justify-end">
        <Link className="text-sm font-bold text-yellow-400 hover:text-white" href="/forgot-password">
          Forgot password?
        </Link>
      </div>
      <button
        className="font-['PolySans'] w-full bg-yellow-400 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? "Signing in..." : "Log in"}
      </button>
    </form>
  );
}
