const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  srNo: Number,
  subjectName: String,
  type: String,
  branch: String,
  students: String,
  year: String,
  level: {
    type: String,
    enum: ["Post Graduate", "Under Graduate"]
  }
});

module.exports = mongoose.model("Subject", subjectSchema);
