import React from 'react';
import { motion } from 'framer-motion';
import profileData from '../data1';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-blue-100 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-10 shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10">
            <img 
              src="https://res.cloudinary.com/dsy3ebkqc/image/upload/v1743144202/Huehub/mopt5jzudymmuncozwky.jpg"
              className="w-40 h-44 rounded-xl border-4  shadow-md"
              alt={profileData.name}
            />
            <div className="text-center lg:pl-6 lg:ml-16 sm:mt-16 sm:text-left">
              <h2 className="text-5xl font-extrabold text-blue-700">
                {profileData.name || "Dr. Jane Doe"}
              </h2>
              {/* <p className="text-lg mt-2 text-blue-600">
                AI Researcher | Educator | Speaker
              </p> */}
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-2xl shadow-inner border border-blue-100">
            <h1 className="text-3xl font-bold text-blue-800 mb-6 underline underline-offset-4">About</h1>
            <ul className="list-disc pl-6 space-y-4 text-blue-900 text-base leading-relaxed">
              <li>
                Around 7 years of experience in Teaching, Machine Learning Research, HR Management, Software Development & Student Counseling.
              </li>
              <li>
                Master's & Bachelor's degree in Computer Engineering with Distinction grade from SPPU.
              </li>
              <li>
                Invited to deliver sessions at:
                <ul className="list-disc pl-6 mt-2 space-y-1 text-sm text-blue-800">
                  <li>NIT (Dept. of Mining Engineering)</li>
                  <li>SIEM (Dept. of Computer Engineering)</li>
                  <li>AISSMS IOIT (Dept. of E&TC Engineering)</li>
                  <li>PICT (Dept. of Computer Engineering)</li>
                  <li>SND COE (Dept. of Computer Engineering)</li>
                  <li>DevIncept Pvt. Ltd.</li>
                  <li>International conferences in UK & Canada</li>
                  <li>Science and Engineering Research Board (SERB)</li>
                </ul>
              </li>
              <li>
                Published 30+ research papers in journals such as IEEE, Springer, Elsevier, IJMTE, and more.
              </li>
              <li>
                Reviewer for:
                <ul className="list-disc pl-6 mt-2 space-y-1 text-sm text-blue-800">
                  <li>14th IEEE Symposium, Malaysia</li>
                  <li>ACM Journal of Computing</li>
                  <li>Springer Cureus Journal</li>
                  <li>Various tech conferences</li>
                </ul>
              </li>
              <li>Received 'Best Paper Award' at AOTA conference.</li>
              <li>Awarded as a 'Global Icon-Woman Researcher', 'Top 2% Researcher', and 'Young Researcher'.</li>
              <li>Invited as a Paper Setter & Examiner by SPPU and autonomous institutes.</li>
              <li>
                Certified in AI by IBM, Accenture, TCS, Harvard University, Microsoft, ATAL & Udemy.
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
