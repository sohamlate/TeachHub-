const Award = require('../models/Award');

exports.addAward = async (req, res) => {
    try {
        const award = await Award.create(req.body);
        res.status(201).json(award);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAwards = async (req, res) => {
    try {
        const awards = await Award.find({});
        res.json(awards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
