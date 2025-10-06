import React from 'react';
import ContactForm from './ContactForm';

interface ContactProps {
  id: string;
}

const Contact = ({ id }: ContactProps) => {
  return (
    <section className="py-16 bg-black text-white border-t-8 border-b-8 border-yellow-400" id={id}>
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-yellow-400 mb-4">
          Contact Us
        </h1>
        <p className="text-center text-lg md:text-xl text-gray-300 mb-10">
          Fill in the form below and we’ll get back to you as soon as possible.
        </p>

        <div className="bg-gray-900/80 p-8 rounded-2xl shadow-lg">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export default Contact;
