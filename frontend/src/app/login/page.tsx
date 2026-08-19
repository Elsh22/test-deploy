"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "../../lib/supabase/client";
import { getSiteUrl } from "../../lib/supabase/config";
import { vcuMajorOptions } from "../../lib/vcuMajors";
import { vcuMinorOptions } from "../../lib/vcuMinors";

const classificationOptions = ["Freshman", "Sophomore", "Junior", "Senior"];
const graduationYearOptions = Array.from({ length: 9 }, (_, index) => String(2026 + index));

export default function LoginPage() {
  return null;
}

function LoginPageContents() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const passwordsMismatch = mode === "signup" && confirmPassword.length > 0 && password !== confirmPassword;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (mode === "signup" && password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage({
        type: "error",
        text: "Supabase is not configured. Add your environment variables to .env.local before testing accounts.",
      });
      return;
    }

    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${getSiteUrl()}/auth/callback?next=/dashboard`,
          data: {
            first_name: String(formData.get("first_name") || ""),
            last_name: String(formData.get("last_name") || ""),
            major: String(formData.get("major") || ""),
            second_major: String(formData.get("second_major") || ""),
            minor: String(formData.get("minor") || ""),
            classification: String(formData.get("classification") || ""),
            graduation_year: String(formData.get("graduation_year") || ""),
            role: "member",
          },
        },
      });

      setIsLoading(false);

      if (error) {
        setMessage({ type: "error", text: error.message });
        return;
      }

      if (data.session) {
        router.push("/dashboard");
        router.refresh();
        return;
      }

      setMessage({ type: "success", text: "Account created. Check your email to confirm your account." });
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsLoading(false);

    if (error) {
      setMessage({ type: "error", text: error.message });
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-black px-6 pb-16 pt-32 text-white md:px-10 md:pt-36">
      <div
        className={`mx-auto grid min-h-[calc(100vh-12rem)] w-full items-center gap-12 transition-all lg:grid-cols-[0.75fr_1.25fr] ${
          mode === "signup" ? "max-w-7xl" : "max-w-5xl"
        }`}
      >
        <div className="flex justify-center lg:justify-start">
          <div className="h-28 w-28 md:h-40 md:w-40 lg:h-56 lg:w-56">
            <img src="/favicon.ico" alt="Developing Men of Color logo" className="h-full w-full object-contain" />
          </div>
        </div>

        <form className="grid w-full gap-6" onSubmit={handleSubmit}>
          {message ? (
            <p
              className={`border-l-2 px-4 py-3 text-sm leading-6 ${
                message.type === "error"
                  ? "border-yellow-400 bg-yellow-400/10 text-yellow-100"
                  : "border-emerald-400 bg-emerald-500/10 text-emerald-100"
              }`}
            >
              {message.text}
            </p>
          ) : null}

          {mode === "signup" ? (
            <div className="grid gap-6">
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
                <LoginField id="first_name" label="First name" name="first_name" required />
                <LoginField id="last_name" label="Last name" name="last_name" required />
                <LoginField id="email" label="Email" name="email" required type="email" />
              </div>

              <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
                <MajorSelect id="major" label="Major" name="major" />
                <MajorSelect id="second_major" label="Second major" name="second_major" />
                <MinorSelect id="minor" label="Minor" name="minor" />
              </div>

              <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                <SimpleSelect
                  id="classification"
                  label="Classification"
                  name="classification"
                  options={classificationOptions}
                />
                <SimpleSelect
                  id="graduation-year"
                  label="Graduation year"
                  name="graduation_year"
                  options={graduationYearOptions}
                />
              </div>

              <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                <PasswordField
                  id="password"
                  label="Password"
                  name="password"
                  onChange={setPassword}
                  value={password}
                />
                <PasswordField
                  error={passwordsMismatch}
                  id="confirm-password"
                  label="Confirm password"
                  name="confirm-password"
                  onChange={setConfirmPassword}
                  value={confirmPassword}
                />
              </div>

              <div className="flex flex-col items-center justify-between gap-4 pt-2 sm:flex-row">
                <ModeSwitch mode={mode} setMode={setMode} />
                <button
                  className="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.14em] text-yellow-400 transition hover:text-yellow-300 disabled:cursor-not-allowed disabled:text-zinc-600"
                  disabled={isLoading || passwordsMismatch}
                  type="submit"
                >
                  <span>{isLoading ? "Creating account" : "Create account"}</span>
                  <span className="text-3xl font-light leading-none transition group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              <LoginField id="email" label="Email" name="email" required type="email" />
              <PasswordField
                id="password"
                label="Password"
                name="password"
                onChange={setPassword}
                value={password}
              />
              <div className="flex flex-col items-center justify-between gap-4 pt-2 sm:flex-row">
                <ModeSwitch mode={mode} setMode={setMode} />
                <button
                  aria-label="Log in"
                  className="text-4xl font-light leading-none text-yellow-400 transition hover:translate-x-1 hover:text-yellow-300 disabled:cursor-not-allowed disabled:text-zinc-600"
                  disabled={isLoading}
                  type="submit"
                >
                  →
                </button>
              </div>
            </div>
          )}

          {passwordsMismatch ? (
            <p className="-mt-2 text-sm text-yellow-200">Passwords do not match.</p>
          ) : null}

        </form>
      </div>
    </main>
  );
}

function ModeSwitch({
  mode,
  setMode,
}: {
  mode: "login" | "signup";
  setMode: (mode: "login" | "signup") => void;
}) {
  return (
    <div className="flex items-center justify-center gap-3 text-sm lg:justify-start">
      <button
        className={`transition ${mode === "login" ? "text-yellow-400" : "text-zinc-500 hover:text-white"}`}
        onClick={() => setMode("login")}
        type="button"
      >
        login
      </button>
      <span className="text-zinc-700">|</span>
      <button
        className={`transition ${mode === "signup" ? "text-yellow-400" : "text-zinc-500 hover:text-white"}`}
        onClick={() => setMode("signup")}
        type="button"
      >
        signup
      </button>
    </div>
  );
}

function MajorSelect({ id, label, name }: { id: string; label: string; name: string }) {
  return <StyledSelect id={id} label={label} name={name} options={vcuMajorOptions} />;
}

function MinorSelect({ id, label, name }: { id: string; label: string; name: string }) {
  return <StyledSelect id={id} label={label} name={name} options={vcuMinorOptions} />;
}

function SimpleSelect({
  id,
  label,
  name,
  options,
}: {
  id: string;
  label: string;
  name: string;
  options: string[];
}) {
  return <StyledSelect id={id} label={label} name={name} options={options} />;
}

function StyledSelect({
  id,
  label,
  name,
  options,
}: {
  id: string;
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="block" htmlFor={id}>
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">{label}</span>
      <select
        className="mt-2 w-full border-0 border-b border-white/20 bg-black px-0 py-4 text-base text-white outline-none transition focus:border-yellow-400"
        defaultValue=""
        id={id}
        name={name}
      >
        <option value="" />
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function LoginField({
  id,
  label,
  name,
  required = false,
  type = "text",
}: {
  id: string;
  label: string;
  name: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block" htmlFor={id}>
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">{label}</span>
      <input
        className="mt-2 w-full border-0 border-b border-white/20 bg-transparent px-0 py-4 text-base text-white outline-none transition placeholder:text-zinc-700 focus:border-yellow-400"
        id={id}
        name={name}
        required={required}
        type={type}
      />
    </label>
  );
}

function PasswordField({
  error = false,
  id,
  label,
  name,
  onChange,
  value,
}: {
  error?: boolean;
  id: string;
  label: string;
  name: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="block" htmlFor={id}>
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">{label}</span>
      <input
        aria-invalid={error}
        className={`mt-2 w-full border-0 border-b bg-transparent px-0 py-4 text-base text-white outline-none transition ${
          error ? "border-yellow-300 focus:border-yellow-200" : "border-white/20 focus:border-yellow-400"
        }`}
        id={id}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        required
        type="password"
        value={value}
      />
    </label>
  );
}
