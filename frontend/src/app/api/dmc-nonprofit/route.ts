import { NextResponse } from "next/server";
import connectDB from "../../models/lib/mongodb";
import { DMCNonProfit } from "../../models/dmcNonProfit";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    const {
      // Personal Information
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zipCode,

      // Professional Information
      company,
      jobTitle,
      yearsOfExperience,
      linkedIn,
      personalWebsite,

      // Educational Background
      education,

      // Skills & Interests
      skills,
      interests,
      availabilityPerWeek,
      preferredCommittees,

      // Resume URL (from previous upload)
      resumeUrl,

      // Additional Information
      previousNonProfitExp,
      reasonForJoining,
      
      // Interest Checkboxes
      mentorshipInterest,
      boardInterest,
      volunteerInterest,

    } = await req.json();

    await connectDB();
    
    await DMCNonProfit.create({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      company,
      jobTitle,
      yearsOfExperience: Number(yearsOfExperience),
      linkedIn,
      personalWebsite,
      education,
      skills,
      interests,
      availabilityPerWeek,
      preferredCommittees,
      resume: resumeUrl,
      previousNonProfitExp,
      reasonForJoining,
      interest: {
        mentoring: mentorshipInterest,
        boardMembership: boardInterest,
        volunteering: volunteerInterest,
      },
    });

    return NextResponse.json({
      msg: ["Application submitted successfully"],
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
    return NextResponse.json({ 
      msg: ["Unable to submit application."],
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Example of handling DMC form submission with file upload in the frontend component:
const handleDMCSubmit = async (formData: any) => {
  try {
    // First handle file upload
    const fileData = new FormData();
    fileData.append('file', formData.resume);
    
    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      body: fileData,
    });
    
    const uploadResult = await uploadResponse.json();
    if (!uploadResult.success) {
      throw new Error(uploadResult.error || 'File upload failed');
    }

    // Then submit the full form with the resume URL
    const response = await fetch('/api/dmc-nonprofit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        resumeUrl: uploadResult.url,
      }),
    });

    const data = await response.json();
    if (data.success) {
      // Handle success
      console.log('Form submitted successfully');
    } else {
      // Handle errors
      console.error('Form submission failed:', data.msg);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};