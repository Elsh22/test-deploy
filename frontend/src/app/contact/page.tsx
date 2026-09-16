"use client";

import { type FormEvent, useState } from "react";

const contactEmail = "vcu.dmc@gmail.com";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  reason: "",
  message: "",
};

function createMailtoUrl(form: typeof initialForm) {
  const subject = encodeURIComponent(`DMC Contact: ${form.reason || "General Question"}`);
  const body = encodeURIComponent(
    [
      `Name: ${form.firstName} ${form.lastName}`,
      `Email: ${form.email}`,
      `Reason: ${form.reason}`,
      "",
      form.message,
    ].join("\n")
  );

  return `mailto:${contactEmail}?subject=${subject}&body=${body}`;
}

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "fallback" | "error">("idle");
  const [error, setError] = useState("");

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as {
        error?: string;
        fallback?: "mailto";
      };

      if (response.ok) {
        setStatus("sent");
        setForm(initialForm);
        return;
      }

      if (result.fallback === "mailto") {
        window.location.href = createMailtoUrl(form);
        setStatus("fallback");
        return;
      }

      setError(result.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      window.location.href = createMailtoUrl(form);
      setStatus("fallback");
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-24 text-white">
      <section className="mx-auto max-w-5xl text-center">
        <div className="mx-auto">
          <p className="font-['PolySans'] text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
            Contact
          </p>
          <h1 className="font-['PolySans'] mx-auto mt-4 max-w-5xl text-6xl font-black uppercase leading-none md:text-8xl">
            Stay connected with DMC.
          </h1>
          <p className="font-['PolySans'] mx-auto mt-8 max-w-2xl text-xl leading-8 text-zinc-300">
            Reach out for membership questions, partnership opportunities,
            donations, event collaboration, or general information about
            Developing Men of Color at VCU.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl border border-white/10 bg-white/[0.04] p-6 text-left md:p-10">
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="font-['PolySans'] block">
                <span className="text-sm font-black uppercase tracking-[0.16em] text-zinc-400">
                  First Name
                </span>
                <input
                  required
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={(event) => updateField("firstName", event.target.value)}
                  placeholder="Your first name"
                  className="mt-3 w-full border border-white/10 bg-black px-4 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-400"
                />
              </label>

              <label className="font-['PolySans'] block">
                <span className="text-sm font-black uppercase tracking-[0.16em] text-zinc-400">
                  Last Name
                </span>
                <input
                  required
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={(event) => updateField("lastName", event.target.value)}
                  placeholder="Your last name"
                  className="mt-3 w-full border border-white/10 bg-black px-4 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-400"
                />
              </label>
            </div>

            <label className="font-['PolySans'] block">
              <span className="text-sm font-black uppercase tracking-[0.16em] text-zinc-400">
                Email
              </span>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="your.email@example.com"
                className="mt-3 w-full border border-white/10 bg-black px-4 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-400"
              />
            </label>

            <label className="font-['PolySans'] block">
              <span className="text-sm font-black uppercase tracking-[0.16em] text-zinc-400">
                Reason for Contact
              </span>
              <select
                required
                name="reason"
                value={form.reason}
                onChange={(event) => updateField("reason", event.target.value)}
                className="mt-3 w-full border border-white/10 bg-black px-4 py-4 text-white outline-none transition focus:border-yellow-400"
              >
                <option value="" disabled>
                  Select one
                </option>
                <option>Membership</option>
                <option>Partnership</option>
                <option>Donation</option>
                <option>Event Collaboration</option>
                <option>General Question</option>
              </select>
            </label>

            <label className="font-['PolySans'] block">
              <span className="text-sm font-black uppercase tracking-[0.16em] text-zinc-400">
                Message
              </span>
              <textarea
                required
                name="message"
                rows={6}
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                placeholder="Tell us how we can help."
                className="mt-3 w-full resize-none border border-white/10 bg-black px-4 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-400"
              />
            </label>

            {status === "sent" ? (
              <p className="font-['PolySans'] border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm font-semibold text-emerald-200">
                Message sent to {contactEmail}.
              </p>
            ) : null}

            {status === "fallback" ? (
              <p className="font-['PolySans'] border border-yellow-400/30 bg-yellow-400/10 p-4 text-sm font-semibold text-yellow-100">
                Your email app should open with the message addressed to {contactEmail}.
              </p>
            ) : null}

            {status === "error" ? (
              <p className="font-['PolySans'] border border-red-400/30 bg-red-400/10 p-4 text-sm font-semibold text-red-100">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "sending"}
              className="font-['PolySans'] mt-2 inline-flex w-full items-center justify-center bg-yellow-400 px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className="mt-8 grid gap-4 border-t border-white/10 pt-8 text-center md:grid-cols-2">
            <a
              href={`mailto:${contactEmail}`}
              className="font-['PolySans'] text-sm font-black uppercase tracking-[0.14em] text-zinc-400 transition hover:text-yellow-400"
            >
              {contactEmail}
            </a>
            <a
              href="https://www.instagram.com/dmcvcu/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-['PolySans'] text-sm font-black uppercase tracking-[0.14em] text-zinc-400 transition hover:text-yellow-400"
            >
              @dmcvcu
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
