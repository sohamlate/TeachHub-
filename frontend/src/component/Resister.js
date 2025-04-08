import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://teach-hub-eight.vercel.app/api/auth/register", formData);
      
      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      
      setMessage("Registration successful! Token stored.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        password: ""
      });
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Register
        </h2>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded transition-colors cursor-pointer"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
