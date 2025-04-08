const mongoose = require('mongoose');

const AttemptSchema = new mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    userName: String,
    userEmail: String,
    responses: [{
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        selectedOption: String
    }],
    score: Number 
}, { timestamps: true });

module.exports = mongoose.model('Attempt', AttemptSchema);
