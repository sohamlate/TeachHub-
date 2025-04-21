import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const StudyMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    documentUrl: "",
    videoUrl: "",
  });

  const API_URL = "https://teach-hub-eight.vercel.app/api/study-materials";
  const token = localStorage.getItem("token");

  
  const fetchMaterials = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: token,
        },
      });
      setMaterials(response.data);
    } catch (error) {
      console.error("Error fetching materials:", error.message);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(API_URL, formData, {
        headers: {
          Authorization: token,
        },
      });
      setFormData({ name: "", documentUrl: "", videoUrl: "" });
      fetchMaterials();
    } catch (error) {
      console.error("Error uploading material:", error.message);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 ">
          Study Material, E-Content & Blogs
        </h1>
        <p className="mt-2 text-gray-700 text-base md:text-lg max-w-2xl mx-auto">
           Access curated study materials and e-content, and read insightful blogs that support effective learning and academic growth.
        </p>
      </div>

      {/* Upload Form */}
      { token && 
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mb-8"
      >
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Document URL</label>
          <input
            type="url"
            name="documentUrl"
            value={formData.documentUrl}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Video URL</label>
          <input
            type="url"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-800 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Upload Material
        </button>
      </form>

}

      {/* Material List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md p-5"
          >
            <h2 className="text-xl font-bold text-blue-800  mb-2">
              {material.name}
            </h2>
            <div className="flex flex-col gap-2">
              <a
                href={material.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                📄 View Document
              </a>
              <a
                href={material.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                🎥 Watch Video
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StudyMaterials;
