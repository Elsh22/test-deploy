// models/dmcNonProfit.ts
import mongoose, { Schema } from "mongoose";
import { baseSubmissionSchema } from "./baseSubmission";

// Define the education sub-schema
const educationSchema = new Schema({
  degree: {
    type: String,
    required: [true, "Degree/Certification is required."],
    trim: true,
  },
  institution: {
    type: String,
    required: [true, "Institution is required."],
    trim: true,
  },
  graduationYear: {
    type: String,
    required: [true, "Graduation year is required."],
    validate: {
      validator: function(v: string) {
        return /^\d{4}$/.test(v) && parseInt(v) >= 1950 && parseInt(v) <= 2030;
      },
      message: "Graduation year must be between 1950 and 2030"
    }
  },
  fieldOfStudy: {
    type: String,
    required: [true, "Field of study is required."],
    trim: true,
  }
});

const resumeSchema = new Schema({
  fileId: {
    type: Schema.Types.ObjectId,
    required: [true, "Resume file ID is required."],
  },
  originalName: {
    type: String,
    required: [true, "Original file name is required."],
  },
  contentType: {
    type: String,
    required: [true, "File content type is required."],
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

const dmcNonProfitSchema = new Schema({
  ...baseSubmissionSchema.obj,
  // Personal Information
  firstName: {
    type: String,
    required: [true, "First name is required."],
    trim: true,
    minLength: [2, "First name must be larger than 2 characters"],
    maxLength: [50, "First name must be lesser than 50 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required."],
    trim: true,
    minLength: [2, "Last name must be larger than 2 characters"],
    maxLength: [50, "Last name must be lesser than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email address"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required."],
    match: [/^\+?[\d\s-]{10,}$/, "Invalid phone number"],
  },
  address: {
    type: String,
    required: [true, "Address is required."],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "City is required."],
    trim: true,
  },
  state: {
    type: String,
    required: [true, "State is required."],
    trim: true,
  },
  zipCode: {
    type: String,
    required: [true, "ZIP code is required."],
    match: [/^\d{5}(-\d{4})?$/, "Invalid ZIP code"],
  },

  // Professional Information
  company: {
    type: String,
    required: [true, "Company/Organization is required."],
    trim: true,
  },
  jobTitle: {
    type: String,
    required: [true, "Job title is required."],
    trim: true,
  },
  yearsOfExperience: {
    type: Number,
    required: [true, "Years of experience is required."],
    min: [0, "Years of experience cannot be negative"],
  },
  linkedIn: {
    type: String,
    match: [
      /^(https?:\/\/)?([\w\d-]+\.)*linkedin\.com\/\S*$/,
      "Invalid LinkedIn URL"
    ],
  },
  personalWebsite: {
    type: String,
    match: [
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
      "Invalid website URL"
    ],
  },

  // Educational Background
  education: [educationSchema],

  // Skills & Interests
  skills: {
    type: String,
    required: [true, "Professional skills are required."],
    minLength: [10, "Please provide more detail about your skills"],
  },
  interests: {
    type: String,
    required: [true, "Areas of interest are required."],
    minLength: [10, "Please provide more detail about your interests"],
  },
  availabilityPerWeek: {
    type: String,
    required: [true, "Weekly availability is required."],
    enum: {
      values: ['1-3', '4-6', '7-10', '10+'],
      message: "Invalid availability range selected"
    },
  },
  preferredCommittees: [{
    type: String,
    enum: {
      values: [
        'Academic Committee',
        'Professional Development',
        'Community Service',
        'Events & Programming',
        'Marketing & Communications',
        'Membership & Recruitment',
        'Technology & Innovation'
      ],
      message: "Invalid committee selection"
    }
  }],

  // Resume
  resume: resumeSchema,

  // Additional Information
  previousNonProfitExp: {
    type: String,
    trim: true,
  },
  reasonForJoining: {
    type: String,
    required: [true, "Please explain why you want to join DMC."],
    minLength: [20, "Please provide a more detailed explanation"],
  },

  // Interest Checkboxes
  interest: {
    mentoring: { type: Boolean, default: false },
    boardMembership: { type: Boolean, default: false },
    volunteering: { type: Boolean, default: false }
  }


});

export const DMCNonProfit = 
  mongoose.models.DMCNonProfit || mongoose.model("DMCNonProfit", dmcNonProfitSchema);