import React, { useState, useEffect } from "react";
import PublicationCard from "./PublicationCard";
import axios from "axios";
import { motion } from "framer-motion";

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    publisher: "",
    link: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://teach-hub-eight.vercel.app/api/publication", {
          headers: {
            Authorization: `${token}`
          }
        });
        setPublications(response.data);
      } catch (error) {
        console.error("Error fetching publications:", error);
      }
    };

    fetchPublications();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("https://teach-hub-eight.vercel.app/api/publication", formData, {
        headers: {
          Authorization: `${token}`
        }
      });
      
      setPublications([...publications, response.data]);
      setFormData({
        title: "",
        publisher: "",
        link: ""
      });
    } catch (error) {
      console.error("Error adding publication:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-blue-700 mb-4">
            Research Publications
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of academic papers, articles, and research publications
          </p>
        </motion.div>

        {token && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-16"
          >
            <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg border-l-4 border-indigo-600">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-100">
                  <span className="text-indigo-600 text-xl">📚</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Add New Publication</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Publication Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter publication title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Publisher</label>
                  <input
                    type="text"
                    name="publisher"
                    placeholder="Enter publisher name"
                    value={formData.publisher}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Publication Link</label>
                  <input
                    type="text"
                    name="link"
                    placeholder="Enter publication URL"
                    value={formData.link}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Add Publication
                </button>
              </form>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {publications.length > 0 ? (
            publications.map((pub, index) => (
              <motion.div
                key={pub._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-600 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-100">
                    <span className="text-purple-600">📄</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">{pub.title}</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-medium text-indigo-600">{pub.publisher}</p>
                  {pub.link && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      <span className="mr-1">🔗</span>
                      View Publication
                    </a>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="col-span-full text-center py-12"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
                <span className="text-2xl">📚</span>
              </div>
              <p className="text-xl text-gray-600">
                No publications found. Start adding your research publications above.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Publications;