import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DMC Mobile App Privacy Policy | Developing Men of Color",
  description:
    "Privacy information for users of the Developing Men of Color mobile application.",
};

const policySections = [
  {
    title: "Information We Collect",
    body: [
      "When you register for and use the DMC mobile app, we collect information needed to create, verify, authenticate, and manage your account.",
      "This may include your VCU email address, account and authentication information, and information necessary to verify and manage your DMC mobile app account.",
    ],
  },
  {
    title: "How We Use Information",
    body: [
      "DMC uses account information to support account creation, email verification, authentication, application security, and operation of the DMC mobile app.",
      "We may also use information you provide to respond to support requests and help resolve account access or app-related issues.",
    ],
  },
  {
    title: "Email Communications",
    body: [
      "The DMC mobile app sends verification emails and other necessary account-related communications.",
      "These communications may include registration verification codes, account notices, and messages needed to help keep your account working properly.",
    ],
  },
  {
    title: "Data Security",
    body: [
      "DMC uses reasonable technical and organizational safeguards designed to protect account information.",
      "Passwords are not stored in plain text. The app uses access and refresh tokens for authentication, and users can log out of the app.",
      "DMC may use cloud infrastructure to operate the mobile app and related account services.",
    ],
  },
  {
    title: "Third-Party Service Providers",
    body: [
      "DMC may use third-party service providers to operate the mobile app, including cloud infrastructure providers such as Amazon Web Services and email delivery providers such as Amazon SES.",
      "These providers may process limited information necessary to provide their services, such as account verification and account-related email delivery.",
    ],
  },
  {
    title: "Account Deletion",
    body: [
      "You can initiate permanent account deletion directly inside the DMC mobile app by navigating to Profile/Settings and selecting Delete Account.",
      "When you confirm deletion, associated account and authentication information is deleted, subject to any legitimate legal or security retention requirements.",
    ],
  },
  {
    title: "Children's Privacy",
    body: [
      "The DMC mobile app is not intended for children under 13.",
      "DMC does not knowingly collect personal information from children under 13.",
    ],
  },
  {
    title: "Data Selling",
    body: ["DMC does not sell users' personal information."],
  },
  {
    title: "Policy Changes",
    body: [
      "DMC may update this Privacy Policy from time to time.",
      "When the policy is updated, the updated effective date will appear on this page.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="px-6 pb-20 pt-36 md:pt-44">
        <div className="mx-auto max-w-5xl">
          <p className="font-['PolySans'] text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
            Developing Men of Color
          </p>
          <h1 className="font-['PolySans'] mt-5 max-w-4xl text-5xl font-black uppercase leading-none md:text-7xl">
            DMC Mobile App Privacy Policy
          </h1>
          <p className="mt-6 text-lg font-semibold uppercase tracking-[0.12em] text-zinc-400">
            Effective Date: September 10, 2026
          </p>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-300 md:text-xl">
            This Privacy Policy explains how Developing Men of Color at Virginia
            Commonwealth University collects, uses, and protects information
            connected to the DMC mobile app.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-20 text-black">
        <div className="mx-auto max-w-5xl">
          <div className="divide-y divide-zinc-200 border-y border-zinc-200">
            {policySections.map((section) => (
              <article
                key={section.title}
                className="grid gap-5 py-8 lg:grid-cols-[0.42fr_1fr]"
              >
                <h2 className="font-['PolySans'] text-2xl font-black uppercase leading-tight text-black md:text-3xl">
                  {section.title}
                </h2>
                <div className="grid gap-4 text-base leading-7 text-zinc-700 md:text-lg md:leading-8">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 border border-zinc-200 bg-zinc-50 p-6 md:p-8">
            <p className="font-['PolySans'] text-sm font-black uppercase tracking-[0.18em] text-yellow-700">
              Contact
            </p>
            <h2 className="font-['PolySans'] mt-3 text-3xl font-black uppercase leading-tight">
              Questions about privacy?
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-zinc-700">
              For privacy questions or mobile app support, please visit the DMC
              support page.
            </p>
            <Link
              href="/support"
              className="font-['PolySans'] mt-6 inline-flex bg-black px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-yellow-400 hover:text-black"
            >
              Visit Support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
