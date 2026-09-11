import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DMC Mobile App Support | Developing Men of Color",
  description:
    "Support and account assistance for users of the Developing Men of Color mobile application.",
};

const helpTopics = [
  "creating an account",
  "verifying your email",
  "signing in",
  "accessing your account",
  "using the DMC mobile application",
];

const deletionSteps = [
  "Sign into the DMC mobile app.",
  "Open Profile/Settings.",
  "Select Delete Account.",
  "Confirm deletion.",
];

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="px-6 pb-20 pt-36 md:pt-44">
        <div className="mx-auto max-w-5xl">
          <p className="font-['PolySans'] text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
            Mobile App Support
          </p>
          <h1 className="font-['PolySans'] mt-5 max-w-4xl text-5xl font-black uppercase leading-none md:text-7xl">
            DMC Mobile App Support
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-300 md:text-xl">
            Get help with your Developing Men of Color mobile app account,
            email verification, sign-in access, or account deletion.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-20 text-black">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="border-y border-zinc-200 py-8 lg:sticky lg:top-32 lg:self-start">
            <p className="font-['PolySans'] text-sm font-black uppercase tracking-[0.18em] text-yellow-700">
              Contact
            </p>
            <h2 className="font-['PolySans'] mt-3 text-3xl font-black uppercase leading-tight">
              Need direct help?
            </h2>
            <p className="mt-4 leading-7 text-zinc-700">
              Use the official DMC contact page or email DMC directly.
            </p>
            <div className="mt-6 grid gap-3">
              <Link
                href="/contact"
                className="font-['PolySans'] inline-flex justify-center bg-black px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-yellow-400 hover:text-black"
              >
                Contact DMC
              </Link>
              <a
                href="mailto:dmc.vcu@gmail.com"
                className="font-['PolySans'] inline-flex justify-center border border-zinc-300 px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:border-black"
              >
                dmc.vcu@gmail.com
              </a>
            </div>
          </aside>

          <div className="divide-y divide-zinc-200 border-y border-zinc-200">
            <section className="py-8">
              <h2 className="font-['PolySans'] text-3xl font-black uppercase leading-tight">
                Getting Help
              </h2>
              <p className="mt-4 leading-7 text-zinc-700">
                Contact DMC if you have trouble with:
              </p>
              <ul className="mt-5 grid gap-3">
                {helpTopics.map((topic) => (
                  <li
                    key={topic}
                    className="border-l-4 border-yellow-500 pl-4 font-semibold text-zinc-800"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </section>

            <section className="py-8">
              <h2 className="font-['PolySans'] text-3xl font-black uppercase leading-tight">
                VCU Account Requirement
              </h2>
              <p className="mt-4 leading-7 text-zinc-700">
                Registration currently requires a valid @vcu.edu email address.
              </p>
            </section>

            <section className="py-8">
              <h2 className="font-['PolySans'] text-3xl font-black uppercase leading-tight">
                Email Verification
              </h2>
              <p className="mt-4 leading-7 text-zinc-700">
                During registration, you will receive a verification code by
                email. If you do not see it right away, check your inbox and
                spam or junk folders.
              </p>
            </section>

            <section className="py-8">
              <h2 className="font-['PolySans'] text-3xl font-black uppercase leading-tight">
                Account Deletion
              </h2>
              <ol className="mt-5 grid gap-3">
                {deletionSteps.map((step, index) => (
                  <li
                    key={step}
                    className="grid grid-cols-[2rem_1fr] gap-3 leading-7 text-zinc-700"
                  >
                    <span className="font-['PolySans'] text-sm font-black text-yellow-700">
                      {index + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 leading-7 text-zinc-700">
                Confirming this action permanently deletes your DMC account.
              </p>
            </section>

            <section className="py-8">
              <h2 className="font-['PolySans'] text-3xl font-black uppercase leading-tight">
                Privacy
              </h2>
              <p className="mt-4 leading-7 text-zinc-700">
                Read the DMC mobile app Privacy Policy for information about
                account data and deletion.
              </p>
              <Link
                href="/privacy"
                className="font-['PolySans'] mt-6 inline-flex bg-black px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-yellow-400 hover:text-black"
              >
                Privacy Policy
              </Link>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
