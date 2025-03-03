const mongoose = require('mongoose');

const PublicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    publisher: String,
    link: String
}, { timestamps: true });

module.exports = mongoose.model('Publication', PublicationSchema);
