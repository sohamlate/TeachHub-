const DeliveredSession = require("../models/DeliveredSession");

exports.getDeliveredSessions = async (req, res) => {
  try {
    const sessions = await DeliveredSession.find();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sessions", error });
  }
};


exports.addDeliveredSession = async (req, res) => {
  try {
    const { name, document } = req.body;
    const newSession = new DeliveredSession({ name, document });
    await newSession.save();
    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ message: "Error adding session", error });
  }
};
