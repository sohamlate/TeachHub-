import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Awards = () => {
  const [awards, setAwards] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    document: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await axios.get("https://teach-hub-eight.vercel.app/api/awards", {
          headers: {
            Authorization: `${token}`,
          },
        });
        setAwards(response.data);
      } catch (error) {
        console.error("Error fetching awards:", error);
      }
    };

    fetchAwards();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://teach-hub-eight.vercel.app/api/awards/add",
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setAwards([...awards, response.data]);
      setFormData({
        name: "",
        document: "",
      });
    } catch (error) {
      console.error("Error adding award:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-yellow-600 mb-4">
            Achievements & Awards
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcase of honors and recognitions received over time.
          </p>
        </motion.div>

        {token && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-16"
          >
            <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg border-l-4 border-orange-600">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-orange-100">
                  <span className="text-orange-600 text-xl">🏆</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Add New Award
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Award Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter award name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
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
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-orange-600 to-yellow-600 text-white font-semibold rounded-lg shadow-md hover:from-orange-700 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Add Award
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
          {awards.length > 0 ? (
            awards.map((award, index) => (
              <motion.div
                key={award._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-600 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-100">
                    <span className="text-orange-600">🏅</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
                    {award.name}
                  </h3>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <a
                      href={award.document}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:underline"
                    >
                      View Document
                    </a>
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
                <span className="text-2xl">🏆</span>
              </div>
              <p className="text-xl text-gray-600">
                No awards found. Start adding your achievements above.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Awards;
