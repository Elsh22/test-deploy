"use client";
import React, { useState, FormEvent, ChangeEvent } from 'react';

export default function ContactForm() {
  // Typing the state with TypeScript
  const [fullname, setFullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string[]>([]);
  const [success, setSuccess] = useState<boolean>(false);

  // Typing the event in the handleSubmit function
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log('Full name: ', fullname);
    console.log('Email: ', email);
    console.log('Message: ', message);

    // Fetch request remains the same
    const res = await fetch('api/contact', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        fullname,
        email,
        message,
      }),
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
    <>
      <form
        onSubmit={handleSubmit}
        className="py-4 mt-4 border-t flex flex-col gap-5"
      >
        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFullname(e.target.value)}
            value={fullname}
            type="text"
            id="fullname"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            value={email}
            type="text"
            id="email"
            placeholder="john@gmail.com"
          />
        </div>

        <div>
          <label htmlFor="message">Your Message</label>
          <textarea
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
            value={message}
            className="h-32"
            id="message"
            placeholder="Type your message here..."
          ></textarea>
        </div>

        <button className="bg-green-700 p-3 text-white font-bold" type="submit">
          Send
        </button>
      </form>

      <div className="bg-slate-100 flex flex-col">
        {error && error.map((e, index) => (
          <div key={index}
            className={`${success ? "text-green-800" : "text-red-600"} px-5 py-2`}
          >
            {e}
          </div>
        ))}
      </div>
    </>
  );
}
