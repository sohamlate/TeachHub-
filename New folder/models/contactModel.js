const mongoose = require('mongoose');

// Define the schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

// Create the model
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
