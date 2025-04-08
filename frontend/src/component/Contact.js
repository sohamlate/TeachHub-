import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaCalendarAlt, FaUser } from "react-icons/fa";
import axios from "axios";

const ContactMe = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

        try {
            const response = await axios.post('https://teach-hub-eight.vercel.app/api/contact', formData);
            console.log(response);
        } catch (error) {
            console.error("There was an error submitting the form!", error);
        }

        setFormData({
            name: "",
            email: "",
            message: ""
        });
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Contact Me</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 border rounded-lg flex items-center gap-4">
            <FaUser className="text-blue-500 text-xl" />
            <span className="text-gray-700 font-medium">Priyanka Shahane</span>
          </div>
          <div className="p-4 border rounded-lg flex items-center gap-4">
            <FaPhone className="text-green-500 text-xl" />
            <span className="text-gray-700 font-medium">7796831759</span>
          </div>
          <div className="p-4 border rounded-lg flex items-center gap-4">
            <FaEnvelope className="text-red-500 text-xl" />
            <span className="text-gray-700 font-medium">priyankashahane04@gmail.com</span>
          </div>
          <div className="p-4 border rounded-lg flex items-center gap-4">
            <FaCalendarAlt className="text-purple-500 text-xl" />
            <span className="text-gray-700 font-medium">03/06/1996</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-4">Send me a message</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          ></textarea>
          <button
            type="submit"
            className="py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactMe;
