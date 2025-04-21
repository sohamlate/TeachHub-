const mongoose = require("mongoose");

const ExpertSessionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["Expert", "Conference", "SPPU", "Reviewer"],
      required: true
    },
    event: { type: String, required: true },
    role: { type: String, required: true },
    date: { type: String, required: true },
    year: { type: String },
    certificateLink: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExpertSession", ExpertSessionSchema);