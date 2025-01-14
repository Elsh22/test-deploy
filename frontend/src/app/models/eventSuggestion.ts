import mongoose, { Schema } from "mongoose";
import { baseSubmissionSchema } from "./baseSubmission";

const eventSuggestionSchema = new Schema({
  ...baseSubmissionSchema.obj,
  eventTitle: {
    type: String,
    required: [true, "Event title is required."],
    trim: true,
    minLength: [5, "Event title must be larger than 5 characters"],
    maxLength: [100, "Event title must be lesser than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Event description is required."],
    minLength: [20, "Please provide a more detailed description"],
  },
  yourRole: {
    type: String,
    required: [true, "Your role is required."],
    trim: true,
  },
});

export const EventSuggestion = 
  mongoose.models.EventSuggestion || mongoose.model("EventSuggestion", eventSuggestionSchema);