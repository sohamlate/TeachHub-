import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const DeliveredSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [formData, setFormData] = useState({ name: "", document: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get("https://teach-hub-eight.vercel.app/api/sessions", {
          headers: { Authorization: `${token}` },
        });
        setSessions(response.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://teach-hub-eight.vercel.app/api/sessions/add",
        formData,
        { headers: { Authorization: `${token}` } }
      );
      setSessions([...sessions, response.data]);
      setFormData({ name: "", document: "" });
    } catch (error) {
      console.error("Error adding session:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 mb-4">
            Invited as Expert, Reviewer & Paper Setter
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Honored to contribute to academic excellence through paper setting, scholarly reviews, and certificate verification as a recognized subject matter expert.
          </p>
        </motion.div>

        {token && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-12"
          >
            <div className="max-w-xl mx-auto bg-white rounded-xl p-6 sm:p-8 shadow-lg border-l-4 border-indigo-600">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-100">
                  <span className="text-indigo-600 text-xl">📚</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Add New Session
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Session Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter session name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Document URL
                  </label>
                  <input
                    type="text"
                    name="document"
                    placeholder="Enter document URL"
                    value={formData.document}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-blue-700 focus:ring-2 focus:ring-indigo-500"
                >
                  Add Session
                </button>
              </form>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sessions.length > 0 ? (
            sessions.map((session, index) => (
              <motion.div
                key={session._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border-l-4 border-indigo-600"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{session.name}</h3>
                <p className="text-gray-600 mt-2">
                  <a
                    href={session.document}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline break-all"
                  >
                    View Document
                  </a>
                </p>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No sessions found.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DeliveredSessions;
