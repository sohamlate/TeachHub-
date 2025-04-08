const mongoose = require('mongoose');

const StudyMaterialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    documentUrl: { type: String, default: '' },
    videoUrl: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('StudyMaterial', StudyMaterialSchema);
