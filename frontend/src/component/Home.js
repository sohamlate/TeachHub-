import React from 'react';
import { motion } from 'framer-motion';
import profileData from '../data1';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl p-8 shadow-lg"
        >
          {/* Profile Header with Photo and Name */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
            <img 
              src="https://res.cloudinary.com/dsy3ebkqc/image/upload/v1743144202/Huehub/mopt5jzudymmuncozwky.jpg"
              className="w-40 h-40  object-cover shadow-md"
              alt={profileData.name}
            />
            <div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-4">
                {profileData.name}
              </h1>
              <div className="prose prose-lg text-gray-600">
                <p className="leading-relaxed">{profileData.experience}</p>
              </div>
            </div>
          </div>
          
          {/* All content in a single section */}
          <div className="space-y-6">
            {/* Education */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Education</h3>
              <p className="text-gray-600">{profileData.education}</p>
            </div>
            
            {/* Expert Sessions */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Sessions</h3>
              <ul className="space-y-2 text-gray-600">
                {profileData.expertSessions.map((session, index) => (
                  <li key={index}>• {session}</li>
                ))}
              </ul>
            </div>
            
            {/* Publications */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Publications & Reviews</h3>
              <p className="text-gray-600 mb-4">{profileData.publications}</p>
              <ul className="list-disc pl-5 space-y-1">
                {profileData.reviewers.map((review, index) => (
                  <li key={index}>{review}</li>
                ))}
              </ul>
            </div>
            
            {/* Awards */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Awards & Recognition</h3>
              <ul className="space-y-2 text-gray-600">
                {profileData.awards.map((award, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-yellow-500">⭐</span>
                    {award}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Certifications */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Certifications</h3>
              <p className="text-gray-600">{profileData.certifications}</p>
            </div>
          </div>
          
          {/* Commented out Edit button */}
          {/* {token && (
            <button
              className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg"
              onClick={() => navigate("/editprofile")}
            >
              Edit Profile
            </button>
          )} */}
        </motion.div>
      </div>
    </div>
  );
}

export default Home;