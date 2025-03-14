const Education = require('../models/Education');

exports.addEducation = async (req, res) => {
    try {
        const education = await Education.create({ ...req.body, user: req.user.id });
        res.status(201).json(education);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEducation = async (req, res) => {
    try {
        const education = await Education.find({ });
        res.json(education);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
