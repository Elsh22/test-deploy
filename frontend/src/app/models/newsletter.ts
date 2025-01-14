import mongoose, { Schema } from "mongoose";
import { baseSubmissionSchema } from "./baseSubmission";

const newsletterSchema = new Schema({
  ...baseSubmissionSchema.obj,
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email address"],
  },
});

export const Newsletter = mongoose.models.Newsletter || mongoose.model("Newsletter", newsletterSchema);