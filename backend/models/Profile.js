const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    education: String,
    expertSessions: [String],
    publications: {
        count: Number,
        journals: [String]
    },
    awards: [String],
    certifications: [String]
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
