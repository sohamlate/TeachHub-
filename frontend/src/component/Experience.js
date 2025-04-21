import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [formData, setFormData] = useState({
    organization: "",
    designation: "",
    from: "",
    to: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://teach-hub-eight.vercel.app/api/experience", {
          headers: { Authorization: `${token}` }
        });
        setExperiences(response.data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    fetchExperiences();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("https://teach-hub-eight.vercel.app/api/experience", formData, {
        headers: { Authorization: `${token}` }
      });
      setExperiences([...experiences, response.data]);
      setFormData({
        organization: "",
        designation: "",
        from: "",
        to: "",
      });
    } catch (error) {
      console.error("Error adding experience:", error);
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
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-blue-800  mb-4">
            Professional Experience
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your professional journey and achievements
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
                  <span className="text-indigo-600 text-xl">✏️</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Add New Experience</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Organization</label>
                  <input
                    type="text"
                    name="organization"
                    placeholder="Enter organization name"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Designation</label>
                  <input
                    type="text"
                    name="designation"
                    placeholder="Enter your role"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      name="from"
                      value={formData.from}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">End Date</label>
                    <input
                      type="date"
                      name="to"
                      value={formData.to}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-800  text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Add Experience
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
          {experiences.length > 0 ? (
            experiences.map((exp, index) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-600 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-100">
                    <span className="text-purple-600">💼</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{exp.organization}</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-medium text-indigo-600">{exp.designation}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(exp.from).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric"
                    })} -{" "}
                    {exp.to
                      ? new Date(exp.to).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric"
                        })
                      : "Present"}
                  </p>
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
                <span className="text-2xl">📝</span>
              </div>
              <p className="text-xl text-gray-600">
                No experiences found. Start adding your professional journey above.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;