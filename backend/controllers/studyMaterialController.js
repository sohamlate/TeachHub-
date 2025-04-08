const StudyMaterial = require('../models/StudyMaterial');

exports.addStudyMaterial = async (req, res) => {
    try {
        const { name, documentUrl, videoUrl } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const newMaterial = new StudyMaterial({
            name,
            documentUrl: documentUrl || '',
            videoUrl: videoUrl || ''
        });

        await newMaterial.save();
        res.status(201).json(newMaterial);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding study material' });
    }
};

exports.getAllStudyMaterials = async (req, res) => {
    try {
        const materials = await StudyMaterial.find();
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching study materials' });
    }
};

exports.deleteStudyMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        await StudyMaterial.findByIdAndDelete(id);
        res.status(200).json({ message: 'Study material deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting study material' });
    }
};
