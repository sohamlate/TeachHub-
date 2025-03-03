const Contact = require('../models/contactModel');
const mailsender = require("../config/mailSender");

exports.submitContactForm = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success:false,  message: 'All fields are required.' });
    }

    try {
        // Create a new contact entry
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        const emailResponse = await mailsender(
            email,
            'We Got Your Message', 
            `Hi ${name},\n\nWe have received your message and will reach out to you as soon as possible.\n\nBest regards,\nYour Team`
          );


        
        return res.status(200).json({
            success:true ,
            message: 'Form submitted successfully.' 
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success:false , 
            message: 'There was an error processing your request.' 
        });
    }
};
