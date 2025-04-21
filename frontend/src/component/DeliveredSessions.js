import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ExpertSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [formData, setFormData] = useState({
    category: "Expert",
    event: "",
    role: "",
    date: "",
    year: "",
    certificateLink: ""
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  const token = localStorage.getItem("token");
  const categories = ["All", "Expert", "Conference", "SPPU", "Reviewer"];

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get("https://teach-hub-eight.vercel.app/api/sessions");
        setSessions(response.data);
        setFilteredSessions(response.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredSessions(sessions);
    } else {
      setFilteredSessions(sessions.filter(session => session.category === activeCategory));
    }
  }, [activeCategory, sessions]);

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
      setFormData({
        category: "Expert",
        event: "",
        role: "",
        date: "",
        year: "",
        certificateLink: ""
      });
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error adding session:", error);
    }
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-blue-800 mb-4">
            Invited as Expert, Reviewer & Paper Setter
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Honored to contribute to academic excellence through paper setting, scholarly reviews, and certificate verification as a recognized subject matter expert.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-blue-800 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {token && (
          <div className="mb-8 text-center">
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              onClick={toggleForm}
              className="px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
            >
              {isFormVisible ? "Hide Form" : "Add New Session"}
            </motion.button>
          </div>
        )}

        {token && isFormVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
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
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Expert">Expert</option>
                    <option value="Conference">Conference</option>
                    <option value="SPPU">SPPU</option>
                    <option value="Reviewer">Reviewer</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Event/Conference</label>
                  <input
                    type="text"
                    name="event"
                    placeholder="Enter event name"
                    value={formData.event}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <input
                    type="text"
                    name="role"
                    placeholder="Enter your role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="text"
                      name="date"
                      placeholder="e.g., March 2025"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Year</label>
                    <input
                      type="text"
                      name="year"
                      placeholder="e.g., 2025"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Certificate Link</label>
                  <input
                    type="text"
                    name="certificateLink"
                    placeholder="Enter certificate URL"
                    value={formData.certificateLink}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  Add Session
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {filteredSessions.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          >
            {filteredSessions.map((session, index) => (
              <motion.div
                key={session._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-600 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100">
                    <span className="text-blue-600 text-xl">
                      {session.category === "Expert" && "👨‍🏫"}
                      {session.category === "Conference" && "🎯"}
                      {session.category === "SPPU" && "🎓"}
                      {session.category === "Reviewer" && "📝"}
                      {!["Expert", "Conference", "SPPU", "Reviewer"].includes(session.category) && "🏆"}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
                    {session.event}
                  </h3>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-start">
                    <div className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0 text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.352-.035-.696-.1-1.028A5 5 0 0010 11z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-medium">Role:</span> {session.role}
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0 text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-medium">Date:</span> {session.date || session.year}
                    </p>
                  </div>
                  
                  {session.category && (
                    <div className="flex items-start">
                      <div className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0 text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-700">
                        <span className="font-medium">Category:</span> {session.category}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end mt-5">
                  <a
                    href={session.certificateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium hover:underline"
                  >
                    <span>View Certificate</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center p-10 bg-white rounded-xl shadow-md"
          >
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-100">
              <span className="text-2xl">🔍</span>
            </div>
            <p className="text-xl text-gray-600">No sessions found in this category.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExpertSessions;