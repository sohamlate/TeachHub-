const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    questionText: { type: String, required: true },
    options: [{ type: String }], 
    correctAnswer: String
}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);
