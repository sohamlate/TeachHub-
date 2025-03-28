import React from 'react';
import { motion } from 'framer-motion';
import profileData from '../data1';
import { useNavigate } from "react-router-dom";

function Home() {

   const navigate = useNavigate();
   const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Profile Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                {profileData.name}
              </h1>
            </div>

            <div className="prose prose-lg text-gray-600">
              <p className="leading-relaxed">{profileData.experience}</p>
            </div>

            {/* Education */}
            <motion.div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-600">
              <h3 className="text-xl font-semibold text-gray-800">Education</h3>
              <p className="text-gray-600">{profileData.education}</p>
            </motion.div>

            {/* Expert Sessions */}
            <motion.div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-indigo-600">
              <h3 className="text-xl font-semibold text-gray-800">Expert Sessions</h3>
              <ul className="space-y-2 text-gray-600">
                {profileData.expertSessions.map((session, index) => (
                  <li key={index}>• {session}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="space-y-6">
            {/* Publications */}
            <motion.div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-600">
              <h3 className="text-xl font-semibold text-gray-800">Publications & Reviews</h3>
              <p className="text-gray-600 mb-4">{profileData.publications}</p>
              <ul className="list-disc pl-5 space-y-1">
                {profileData.reviewers.map((review, index) => (
                  <li key={index}>{review}</li>
                ))}
              </ul>
            </motion.div>

            {/* Awards */}
            <motion.div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-yellow-600">
              <h3 className="text-xl font-semibold text-gray-800">Awards & Recognition</h3>
              <ul className="space-y-2 text-gray-600">
                {profileData.awards.map((award, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-yellow-500">⭐</span>
                    {award}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Certifications */}
            <motion.div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-600">
              <h3 className="text-xl font-semibold text-gray-800">Certifications</h3>
              <p className="text-gray-600">{profileData.certifications}</p>
            </motion.div>


            {token && (
              <button
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
                onClick={() => navigate("/editprofile")}
              >
                Edit Profile
              </button>
            )}

          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
