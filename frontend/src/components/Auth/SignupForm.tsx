"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthField from "./AuthField";
import AuthStatus from "./AuthStatus";
import { createSupabaseBrowserClient } from "../../lib/supabase/client";
import { getSiteUrl } from "../../lib/supabase/config";

const careerOptions = [
  "Business",
  "Technology",
  "Engineering",
  "Health",
  "Public Service",
  "Undecided",
];

export default function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success" | "info"; text: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage({
        type: "error",
        text: "Supabase environment variables are missing. Add them to .env.local before testing signup.",
      });
      setIsLoading(false);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    // Supabase Auth creates the login account. The profile fields below are
    // stored as user metadata, then copied into public.profiles by schema.sql.
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${getSiteUrl()}/auth/callback?next=/dashboard`,
        data: {
          first_name: String(formData.get("first_name") || ""),
          last_name: String(formData.get("last_name") || ""),
          major: String(formData.get("major") || ""),
          graduation_year: String(formData.get("graduation_year") || ""),
          career_interest: String(formData.get("career_interest") || ""),
          linkedin_url: String(formData.get("linkedin_url") || ""),
          role: "member",
        },
      },
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
      setIsLoading(false);
      return;
    }

    setMessage({
      type: "success",
      text: "Account created. Check your email to confirm your account, then log in.",
    });
    setIsLoading(false);
    router.refresh();
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {message ? <AuthStatus type={message.type} message={message.text} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField id="first_name" name="first_name" label="First name" required />
        <AuthField id="last_name" name="last_name" label="Last name" required />
      </div>

      <AuthField id="email" name="email" type="email" label="VCU email" required />
      <AuthField id="password" name="password" type="password" label="Password" minLength={8} required />

      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField id="major" name="major" label="Major" placeholder="Information Systems" />
        <AuthField id="graduation_year" name="graduation_year" type="number" label="Graduation year" min={2024} max={2100} />
      </div>

      <label className="block" htmlFor="career_interest">
        <span className="font-['PolySans'] text-xs font-black uppercase tracking-[0.16em] text-zinc-300">
          Career interest
        </span>
        <select
          id="career_interest"
          name="career_interest"
          className="mt-2 w-full border-0 border-b border-white/20 bg-zinc-950 px-0 py-3 text-base text-white transition focus:border-yellow-400"
          defaultValue=""
        >
          <option value="" disabled>
            Select a track
          </option>
          {careerOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <AuthField id="linkedin_url" name="linkedin_url" type="url" label="LinkedIn URL" placeholder="https://linkedin.com/in/..." />

      <button
        className="font-['PolySans'] w-full bg-yellow-400 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? "Creating account..." : "Create member account"}
      </button>
    </form>
  );
}
