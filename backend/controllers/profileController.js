const Profile = require('../models/Profile');

exports.createProfile = async (req, res) => {
    try {
        const { userId, education, expertSessions, publications, awards, certifications } = req.body;
        const existingProfile = await Profile.findOne({ user: userId });
        if (existingProfile) return res.status(400).json({ error: "Profile already exists" });

        const newProfile = new Profile({ user: userId, education, expertSessions, publications, awards, certifications });
        await newProfile.save();
        res.status(201).json(newProfile);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const profile = await Profile.findOne({ user: userId }).populate('user', 'name email');

        if (!profile) {
            return res.status(200).json({ message: "Profile not found", profile: null });
        }

        res.json({ profile });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};


exports.updateProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedProfile = await Profile.findOneAndUpdate({ user: userId }, req.body, { new: true });
        if (!updatedProfile) return res.status(404).json({ error: "Profile not found" });

        res.json(updatedProfile);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedProfile = await Profile.findOneAndDelete({ user: userId });
        if (!deletedProfile) return res.status(404).json({ error: "Profile not found" });

        res.json({ message: "Profile deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
