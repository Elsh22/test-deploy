import mongoose, { Schema } from "mongoose";
import { baseSubmissionSchema } from "./baseSubmission";

const chapterSchema = new Schema({
  ...baseSubmissionSchema.obj,
  chapterName: {
    type: String,
    required: [true, "Chapter name is required."],
    trim: true,
    minLength: [2, "Chapter name must be larger than 2 characters"],
    maxLength: [100, "Chapter name must be lesser than 100 characters"],
  },
  institution: {
    type: String,
    required: [true, "Institution name is required."],
    trim: true,
  },
  primaryContact: {
    type: String,
    required: [true, "Primary contact is required."],
    trim: true,
  },
});

export const ChapterApplication = 
  mongoose.models.ChapterApplication || mongoose.model("ChapterApplication", chapterSchema);
