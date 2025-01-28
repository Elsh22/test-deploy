import connectDB from "../../models/lib/mongodb";
import { ChapterApplication } from "../../models/chapterApplication";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: Request) {
    const { chapterName, institution, primaryContact } = await req.json();

try {
  await connectDB();
  await ChapterApplication.create({
    chapterName,
    institution,
    primaryContact,
  });

  return NextResponse.json({
    msg: ["Chapter application submitted successfully"],
    success: true,
  });
} catch (error) {
  if (error instanceof mongoose.Error.ValidationError) {
    let errorList = [];
    for (let e in error.errors) {
      errorList.push(error.errors[e].message);
    }
    return NextResponse.json({ msg: errorList });
  }
  return NextResponse.json({ msg: ["Unable to submit chapter application."] });
}
}
