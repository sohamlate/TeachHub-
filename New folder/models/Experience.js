const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    organization: String,
    designation: String,
    from: Date,
    to: Date,
    years: Number
}, { timestamps: true });

module.exports = mongoose.model('Experience', ExperienceSchema);
