export default function ContactPage() {
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
          <form className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="font-['PolySans'] block">
                <span className="text-sm font-black uppercase tracking-[0.16em] text-zinc-400">
                  First Name
                </span>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Your first name"
                  className="mt-3 w-full border border-white/10 bg-black px-4 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-400"
                />
              </label>

              <label className="font-['PolySans'] block">
                <span className="text-sm font-black uppercase tracking-[0.16em] text-zinc-400">
                  Last Name
                </span>
                <input
                  type="text"
                  name="lastName"
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
                type="email"
                name="email"
                placeholder="your.email@example.com"
                className="mt-3 w-full border border-white/10 bg-black px-4 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-400"
              />
            </label>

            <label className="font-['PolySans'] block">
              <span className="text-sm font-black uppercase tracking-[0.16em] text-zinc-400">
                Reason for Contact
              </span>
              <select
                name="reason"
                defaultValue=""
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
                name="message"
                rows={6}
                placeholder="Tell us how we can help."
                className="mt-3 w-full resize-none border border-white/10 bg-black px-4 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-400"
              />
            </label>

            <button
              type="submit"
              className="font-['PolySans'] mt-2 inline-flex w-full items-center justify-center bg-yellow-400 px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-white"
            >
              Send Message
            </button>
          </form>

          <div className="mt-8 grid gap-4 border-t border-white/10 pt-8 text-center md:grid-cols-2">
            <a
              href="mailto:dmc.vcu@gmail.com"
              className="font-['PolySans'] text-sm font-black uppercase tracking-[0.14em] text-zinc-400 transition hover:text-yellow-400"
            >
              dmc.vcu@gmail.com
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
