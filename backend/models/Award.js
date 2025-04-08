const mongoose = require('mongoose');

const AwardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    document: { type: String, required: true } 
}, { timestamps: true });

module.exports = mongoose.model('Award', AwardSchema);
