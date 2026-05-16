import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import ContactForm from './ContactForm';

interface ContactProps {
  id: string;
}

const Contact = ({ id }: ContactProps) => {
  return (
    <section className="dmc-dark-section px-6 py-24 sm:px-8 lg:px-12" id={id}>
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-yellow-400">
            Contact
          </p>
          <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            Reach out. We&apos;ll point you to the right person.
          </h2>
          <p className="dmc-muted mt-6 text-lg leading-8 md:text-xl">
            Questions about joining, mentoring, committees, events, partnerships, or
            donations can start here.
          </p>

          <div className="mt-8 grid gap-4">
            <a
              href="mailto:vcu.dmc@gmail.com"
              className="dmc-card flex items-center gap-4 border p-5 transition hover:border-yellow-400"
            >
              <Mail className="h-6 w-6 text-yellow-400" />
              <span className="font-black">vcu.dmc@gmail.com</span>
            </a>
            <div className="dmc-card flex items-center gap-4 border p-5">
              <MapPin className="h-6 w-6 text-yellow-400" />
              <span className="font-black">Virginia Commonwealth University</span>
            </div>
          </div>
        </div>

        <div className="dmc-card-solid border p-6 md:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
