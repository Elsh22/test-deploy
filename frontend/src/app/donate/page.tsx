import { BookOpen, BriefcaseBusiness, Shirt, UsersRound } from "lucide-react";
import StripeDonationForm from "@/components/Donate/StripeDonationForm";

const cashAppHandle = "$developingmenofcolor";
const cashAppUrl = "https://cash.app/$developingmenofcolor";

const impactAreas = [
  {
    title: "Professional Attire",
    text: "Suits, ties, dress shirts, shoes, headshots, and events that help members show up with confidence.",
    icon: Shirt,
  },
  {
    title: "Academic Resources",
    text: "Study support, resource fairs, workshops, and tools that help members succeed in the classroom.",
    icon: BookOpen,
  },
  {
    title: "Mentorship & Service",
    text: "Programs that connect members with guidance, school-based mentorship, and community impact.",
    icon: UsersRound,
  },
  {
    title: "Professional Development",
    text: "Career readiness experiences, employer connections, mock interviews, and Professional Academy support.",
    icon: BriefcaseBusiness,
  },
];

const faqs = [
  {
    question: "What does my donation support?",
    answer:
      "Your gift supports professional development, academic resources, mentorship, service opportunities, attire support, events, and the experiences that help members grow.",
  },
  {
    question: "Can I support a specific program?",
    answer:
      "Yes. Sponsors can support Professional Academy, mentorship, sports and wellness, committees, events, or specific student resources.",
  },
  {
    question: "Can organizations partner with DMC?",
    answer:
      "Yes. DMC welcomes employers, alumni, campus partners, nonprofits, and community organizations that want to support student development.",
  },
];

export default function DonatePage() {
  return (
    <main className="bg-black text-white">
      <section className="relative min-h-screen overflow-hidden bg-black px-6 pb-10 pt-32 md:pt-40">
        <img
          src="/images/donate/dmc-mixer-donor.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.5)_42%,rgba(0,0,0,0.9)_100%)]" />

        <div className="relative mx-auto flex min-h-[calc(100vh-10.5rem)] max-w-7xl flex-col justify-between gap-16">
          <div className="max-w-4xl">
            <p className="font-['PolySans'] text-xs font-black uppercase tracking-[0.32em] text-yellow-400">
              DMC Donation Portal
            </p>
            <h1 className="font-['PolySans'] mt-6 max-w-5xl text-5xl font-black uppercase leading-[0.92] md:text-7xl">
              Invest in the future of Developing Men of Color.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-200">
              DMC develops men of color at VCU through academic excellence,
              professional development, mentorship, leadership, service, and a
              brotherhood built to help students thrive.
            </p>
          </div>

          <div className="grid gap-10 border-t border-white/15 pt-8 lg:grid-cols-2 lg:items-start">
            <section className="flex min-h-[260px] items-center justify-center pt-16 lg:justify-start lg:pl-40">
              <a
                href={cashAppUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Donate with Cash App at ${cashAppHandle}`}
                className="inline-flex transition hover:scale-105"
              >
                <img
                  src="/images/donate/cash-app-logo.png"
                  alt="Cash App"
                  className="h-52 w-52 object-contain md:h-72 md:w-72"
                />
              </a>
            </section>

            <section id="stripe-donation">
              <a
                href="#stripe-donation"
                aria-label="Donate with Stripe"
                className="mb-6 inline-flex transition hover:scale-105"
              >
                <img
                  src="/images/donate/stripe-logo.png"
                  alt="Stripe"
                  className="h-12 w-auto object-contain md:h-14"
                />
              </a>

              <StripeDonationForm />
            </section>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 text-black">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 border-b border-zinc-200 pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="font-['PolySans'] text-sm font-black uppercase tracking-[0.24em] text-yellow-700">
                Where Your Gift Goes
              </p>
              <h2 className="font-['PolySans'] mt-4 text-4xl font-black uppercase leading-none md:text-6xl">
                Practical support members can feel.
              </h2>
            </div>
            <p className="text-lg leading-8 text-zinc-700">
              DMC donations help remove barriers, create access, and fund the
              experiences that help members build momentum.
            </p>
          </div>

          <div className="mt-2 divide-y divide-zinc-200">
            {impactAreas.map(({ title, text, icon: Icon }) => (
              <div
                key={title}
                className="grid gap-5 py-7 md:grid-cols-[4rem_1fr] md:items-start"
              >
                <Icon className="h-8 w-8 text-yellow-700" />
                <div>
                  <h3 className="font-['PolySans'] text-2xl font-black uppercase leading-tight">
                    {title}
                  </h3>
                  <p className="mt-3 max-w-3xl leading-7 text-zinc-600">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 text-black">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="font-['PolySans'] text-sm font-black uppercase tracking-[0.24em] text-yellow-700">
                Donor FAQ
              </p>
              <h2 className="font-['PolySans'] mt-4 text-4xl font-black uppercase leading-none md:text-6xl">
                Before you give.
              </h2>
            </div>

            <div className="divide-y divide-zinc-200 border-y border-zinc-200">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-6">
                  <summary className="font-['PolySans'] cursor-pointer list-none text-2xl font-black uppercase leading-tight transition group-open:text-yellow-700">
                    {faq.question}
                  </summary>
                  <p className="mt-4 max-w-3xl leading-7 text-zinc-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
