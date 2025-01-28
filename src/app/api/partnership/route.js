import { NextResponse } from "next/server";
import connectDB from "../..//models/lib/mongodb";
import { Partnership } from "../../models/partnership";
import mongoose from "mongoose";

export async function POST(req) {
  const {
    organizationName,
    contactPerson,
    email,
    partnershipInterest,
    message
  } = await req.json();

  try {
    await connectDB();
    await Partnership.create({
      organizationName,
      contactPerson,
      email,
      partnershipInterest,
      message,
    });

    return NextResponse.json({
      msg: ["Partnership request submitted successfully"],
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
    return NextResponse.json({ msg: ["Unable to submit partnership request."] });
  }
}