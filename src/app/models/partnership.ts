import mongoose, { Schema } from "mongoose";
import { baseSubmissionSchema } from "./baseSubmission";

const partnershipSchema = new Schema({
  ...baseSubmissionSchema.obj,
  organizationName: {
    type: String,
    required: [true, "Organization name is required."],
    trim: true,
    minLength: [2, "Organization name must be larger than 2 characters"],
  },
  contactPerson: {
    type: String,
    required: [true, "Contact person name is required."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email address"],
  },
  partnershipInterest: {
    type: String,
    required: [true, "Partnership interest is required."],
    enum: {
      values: ['community', 'financial'],
      message: "Invalid partnership type"
    },
  },
  message: {
    type: String,
    required: [true, "Message is required."],
    minLength: [20, "Please provide a more detailed message"],
  },
});

export const Partnership = 
  mongoose.models.Partnership || mongoose.model("Partnership", partnershipSchema);