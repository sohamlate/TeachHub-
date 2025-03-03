const Publication = require('../models/Publication');

exports.addPublication = async (req, res) => {
    try {
        const publication = await Publication.create({ ...req.body, user: req.user.id });
        res.status(201).json(publication);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPublications = async (req, res) => {
    try {
        const publications = await Publication.find({ user: req.user.id });
        res.json(publications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
