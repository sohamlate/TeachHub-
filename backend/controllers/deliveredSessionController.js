const ExpertSession = require("../models/DeliveredSession");

exports.getExpertSessions = async (req, res) => {
  try {
    const sessions = await ExpertSession.find();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sessions", error });
  }
};

exports.getSessionsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const sessions = await ExpertSession.find({ category });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sessions", error });
  }
};

exports.addExpertSession = async (req, res) => {
  try {
    const { category, event, role, date, year, certificateLink } = req.body;
    const newSession = new ExpertSession({ 
      category, 
      event, 
      role, 
      date, 
      year, 
      certificateLink 
    });
    await newSession.save();
    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ message: "Error adding session", error });
  }
};

exports.bulkAddExpertSessions = async (req, res) => {
  try {
    const sessions = req.body;
    const result = await ExpertSession.insertMany(sessions);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error adding sessions in bulk", error });
  }
};