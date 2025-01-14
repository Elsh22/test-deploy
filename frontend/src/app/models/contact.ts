import mongoose, { Schema } from "mongoose";
import { baseSubmissionSchema } from "./baseSubmission";

const contactSchema = new Schema({
  ...baseSubmissionSchema.obj,
  fullname: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
    minLength: [2, "Name must be larger than 2 characters"],
    maxLength: [50, "Name must be lesser than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email address"],
  },
  subject: {
    type: String,
    required: [true, "Subject is required."],
    trim: true,
  },
  message: {
    type: String,
    required: [true, "Message is required."],
  },
});

export const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);