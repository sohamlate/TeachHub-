const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    university: String,
    course: String,
    grade: String,
    certificate:String,
}, { timestamps: true });

module.exports = mongoose.model('Education', EducationSchema);
