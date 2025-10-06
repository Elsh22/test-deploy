"use client";
import React, { useState, FormEvent, ChangeEvent } from 'react';

export default function ContactForm() {
  const [fullname, setFullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string[]>([]);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch('api/contact', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ fullname, email, message }),
    });

    const { msg, success } = await res.json();
    setError(msg);
    setSuccess(success);

    if (success) {
      setFullname('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col">
        <label htmlFor="fullname" className="mb-2 text-yellow-400 font-semibold">
          Full Name
        </label>
        <input
          id="fullname"
          type="text"
          placeholder="John Doe"
          value={fullname}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFullname(e.target.value)}
          className="p-3 rounded-lg bg-gray-800 text-white border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="mb-2 text-yellow-400 font-semibold">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="john@gmail.com"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          className="p-3 rounded-lg bg-gray-800 text-white border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="message" className="mb-2 text-yellow-400 font-semibold">
          Your Message
        </label>
        <textarea
          id="message"
          placeholder="Type your message here..."
          value={message}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
          className="p-3 rounded-lg bg-gray-800 text-white border border-yellow-400 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />
      </div>

      <button
        type="submit"
        className="bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-300 transition"
      >
        Send Message
      </button>

      {error.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          {error.map((e, idx) => (
            <div
              key={idx}
              className={`px-4 py-2 rounded ${
                success ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'
              }`}
            >
              {e}
            </div>
          ))}
        </div>
      )}
    </form>
  );
}
