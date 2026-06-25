"use client";

import { useState } from "react";
import AuthField from "./AuthField";
import AuthStatus from "./AuthStatus";
import { createSupabaseBrowserClient } from "../../lib/supabase/client";
import { getSiteUrl } from "../../lib/supabase/config";

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage({
        type: "error",
        text: "Supabase environment variables are missing. Add them to .env.local before testing password reset.",
      });
      setIsLoading(false);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");

    // Supabase sends the password reset email. The actual email template lives
    // in your Supabase dashboard, not in this codebase.
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${getSiteUrl()}/login`,
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
      setIsLoading(false);
      return;
    }

    setMessage({
      type: "success",
      text: "Password reset email sent. Check your inbox for the secure reset link.",
    });
    setIsLoading(false);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {message ? <AuthStatus type={message.type} message={message.text} /> : null}
      <AuthField id="email" name="email" type="email" label="Account email" required />
      <button
        className="font-['PolySans'] w-full bg-yellow-400 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? "Sending reset link..." : "Send reset link"}
      </button>
    </form>
  );
}
