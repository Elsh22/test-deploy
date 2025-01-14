import mongoose, { Schema } from "mongoose";

export const baseSubmissionSchema = new Schema({
  seen: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});