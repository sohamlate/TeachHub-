import React from 'react';
import { motion } from 'framer-motion';

function App() {
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
                Priyanka Shahane
              </h1>
              {/* <h2 className="text-2xl font-semibold text-gray-600 mt-2">
                Computer Engineering Expert
              </h2> */}
            </div>

            <div className="prose prose-lg text-gray-600">
              <p className="leading-relaxed">
                Around 7 years of experience in different fields like Teaching, Machine Learning Research, HR 
                Management, Software Development & Student Counseling.
              </p>
            </div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-600"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-100">
                  <span className="text-purple-600 font-bold">🎓</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Education</h3>
              </div>
              <p className="text-gray-600">
                Master's & Bachelor's degree in Computer Engineering with Distinction grade from SPPU.
              </p>
            </motion.div>

            {/* Expert Sessions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-indigo-600"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-100">
                  <span className="text-indigo-600 font-bold">💼</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Expert Sessions</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• NIT (Dept. of Mining Engineering)</li>
                <li>• SIEM (Dept. of Computer Engineering)</li>
                <li>• AISSMS IOIT (Dept. of E&TC Engineering)</li>
                <li>• PICT (Dept. of Computer Engineering)</li>
                <li>• SND COE (Dept. of Computer Engineering)</li>
                <li>• DevIncept Pvt. Ltd.</li>
                <li>• 5th International Conference on Future of Preventive Medicine and Public Health, London, UK</li>
                <li>• 3rd Premier Global Conclave and Expo on Innovations in Drug Discovery, Development & Delivery, Canada</li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            {/* Publications */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-600"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-100">
                  <span className="text-blue-600 font-bold">📚</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Publications & Reviews</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Published 30+ research papers in national and international journals such as IEEE, Springer, Elsevier, 
                IJMTE, IRJET, JETIR, IJARESM & IJRDT.
              </p>
              <div className="space-y-2 text-gray-600">
                <p className="font-semibold">Invited as a reviewer for:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>14th IEEE Symposium on Computer Applications & Industrial Electronics, Malaysia</li>
                  <li>ACM Journal of Computing & Sustainable Society</li>
                  <li>Springer Cureus Journal</li>
                  <li>International Conference on Recent Trends & Advancements in Computing Technologies</li>
                  <li>IEEE International Conference on Blockchain and Distributed Systems Security</li>
                </ul>
              </div>
            </motion.div>

            {/* Awards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-yellow-600"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-yellow-100">
                  <span className="text-yellow-600 font-bold">🏆</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Awards & Recognition</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐</span>
                  'Best Paper Award' at AOTA conference
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐</span>
                  'Global Icon-Woman Researcher' by MTTV News Media
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐</span>
                  'Top 2% Researcher' by Academia
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐</span>
                  'Young Researcher' by INSC
                </li>
              </ul>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-600"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-100">
                  <span className="text-green-600 font-bold">📜</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Certifications</h3>
              </div>
              <p className="text-gray-600">
                Certified in Artificial Intelligence by IBM, Accenture, TCS, Harvard University, Microsoft, ATAL & Udemy.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;