"use client";

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [fullname, setFullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ fullname, email, message }),
      });

      const { msg, success } = await res.json();
      setError(msg || []);
      setSuccess(Boolean(success));

      if (success) {
        setFullname('');
        setEmail('');
        setMessage('');
      }
    } catch {
      setSuccess(false);
      setError(['Unable to send message right now.']);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full border border-[var(--dmc-border)] bg-transparent px-4 py-4 text-[var(--dmc-text)] outline-none transition placeholder:text-neutral-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="fullname" className="mb-2 block text-sm font-black uppercase tracking-[0.18em] text-yellow-400">
          Full Name
        </label>
        <input
          id="fullname"
          type="text"
          placeholder="Your name"
          value={fullname}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFullname(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-black uppercase tracking-[0.18em] text-yellow-400">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-black uppercase tracking-[0.18em] text-yellow-400">
          Message
        </label>
        <textarea
          id="message"
          placeholder="What would you like to know?"
          value={message}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
          className={`${inputClass} min-h-36 resize-y`}
          required
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-3 bg-yellow-400 px-6 py-4 font-black text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? 'Sending...' : 'Send Message'}
        <Send className="h-5 w-5" />
      </button>

      {error.length > 0 && (
        <div className="flex flex-col gap-2">
          {error.map((item, idx) => (
            <div
              key={idx}
              className={`border px-4 py-3 text-sm font-bold ${
                success
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                  : 'border-red-500/40 bg-red-500/10 text-red-400'
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </form>
  );
}
