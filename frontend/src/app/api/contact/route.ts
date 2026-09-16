import { NextResponse } from "next/server";
import { Resend } from "resend";

const contactEmail = "vcu.dmc@gmail.com";

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  reason?: string;
  message?: string;
};

function clean(value?: string) {
  return value?.trim() ?? "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload;
  const firstName = clean(payload.firstName);
  const lastName = clean(payload.lastName);
  const email = clean(payload.email);
  const reason = clean(payload.reason);
  const message = clean(payload.message);

  if (!firstName || !lastName || !email || !reason || !message) {
    return NextResponse.json(
      { error: "Please fill out every field before sending." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service is not configured.", fallback: "mailto" },
      { status: 503 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const senderName = `${firstName} ${lastName}`;

  try {
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "DMC Website <onboarding@resend.dev>",
      to: contactEmail,
      reply_to: email,
      subject: `DMC Contact: ${reason}`,
      text: [
        `Name: ${senderName}`,
        `Email: ${email}`,
        `Reason: ${reason}`,
        "",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "The message could not be sent right now.", fallback: "mailto" },
      { status: 500 }
    );
  }
}
