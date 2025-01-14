import { NextResponse } from "next/server";
import connectDB from "../../models/lib/mongodb";
import { EventSuggestion } from "../../models/eventSuggestion";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const { eventTitle, description, yourRole } = await req.json();

  try {
    await connectDB();
    await EventSuggestion.create({
      eventTitle,
      description,
      yourRole,
    });

    return NextResponse.json({
      msg: ["Event suggestion submitted successfully"],
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
    return NextResponse.json({ msg: ["Unable to submit event suggestion."] });
  }
}