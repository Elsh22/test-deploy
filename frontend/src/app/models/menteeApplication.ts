import mongoose, { Schema } from "mongoose";
import { baseSubmissionSchema } from "./baseSubmission";

const menteeSchema = new Schema({
  ...baseSubmissionSchema.obj,
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
  university: {
    type: String,
    required: [true, "University is required."],
    trim: true,
  },
  major: {
    type: String,
    required: [true, "Major is required."],
    trim: true,
  },
  careerInterests: {
    type: String,
    required: [true, "Career interests are required."],
    minLength: [10, "Please provide more detail about your career interests"],
  },
  mentorshipGoals: {
    type: String,
    required: [true, "Mentorship goals are required."],
    minLength: [10, "Please provide more detail about your mentorship goals"],
  },
});

export const MenteeApplication = 
  mongoose.models.MenteeApplication || mongoose.model("MenteeApplication", menteeSchema);