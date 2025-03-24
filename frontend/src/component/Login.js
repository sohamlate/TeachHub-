import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  // Handle input changes
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
      const response = await axios.post("https://teach-hub-eight.vercel.app/api/auth/login", formData);
      
      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      
      setMessage("Login successful! Token stored.");

      navigate('/')
      
      // Reset form
      setFormData({
        email: "",
        password: ""
      });
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || "Invalid credentials"));
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center ">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Login
        </h2>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
