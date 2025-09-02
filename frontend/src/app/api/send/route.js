import { NextResponse } from "next/server";
import { Resend } from "resend";
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(req) {
  if (!resend) {
    return NextResponse.json(
      { error: "Missing API key for Resend" },
      { status: 500 }
    );
  }

  const {
    firstName,
    lastName,
    dob,
    email,
    phone,
    address,
    city,
    state,
    zip,
    schoolEmail,
    classification,
    gradDate,
    major,
    gpa,
    involvementEssay,
    financialChallengesEssay,
    goalsEssay,
  } = await req.json();

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["aelshowaya@gmail.com", "elshowaya8899@gmail.com", "vcu.dmc@gmail.com"],
      subject: "Scholarship Application",
      react: (
        <>
          <h1>Scholarship Application Submission</h1>
          <p>First Name: {firstName}</p>
          <h2>Personal Information</h2>
          <p>Last Name: {lastName}</p>
          <p>Date of Birth: {dob}</p>
          <p>Email Address: {email}</p>
          <p>Phone Number: {phone}</p>
          <p>Address: {address}, {city}, {state}, {zip}</p>
          <h2>Academic Information</h2>
          <p>School Email: {schoolEmail}</p>
          <p>Classification: {classification}</p>
          <p>Expected Graduation Date: {gradDate}</p>
          <p>Major/Area of Study: {major}</p>
          <p>Cumulative GPA: {gpa}</p>
          <h2>Short Essay Questions</h2>
          <p>Involvement with DMC: {involvementEssay}</p>
          <p>Financial Challenges: {financialChallengesEssay}</p>
          <p>Academic and Professional Goals: {goalsEssay}</p>
        </>
      ),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

