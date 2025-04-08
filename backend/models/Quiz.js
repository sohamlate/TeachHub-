const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    duration: Number, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
}, { timestamps: true });

module.exports = mongoose.model('Quiz', QuizSchema);
