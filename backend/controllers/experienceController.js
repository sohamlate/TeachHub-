const Experience = require('../models/Experience');

exports.addExperience = async (req, res) => {
    try {
        const experience = await Experience.create({ ...req.body, user: req.user.id });
        res.status(201).json(experience);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getExperience = async (req, res) => {
    try {
        const experiences = await Experience.find({});
        res.json(experiences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
