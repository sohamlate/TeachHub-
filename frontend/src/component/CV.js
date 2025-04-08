import React from "react";
import { useNavigate } from "react-router-dom";

const CV = () => {
  const navigate = useNavigate();

  const sections = [
    { name: "Experience", path: "/experience" },
    { name: "Education", path: "/education" },
    { name: "Publication", path: "/publication" },
  ];

  return (
    <div className="max-w-4xl h-screen mx-auto p-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">Curriculum Vitae</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {sections.map((section) => (
          <button
            key={section.name}
            onClick={() => navigate(section.path)}
            className="bg-white border border-blue-500 text-blue-700 text-lg font-semibold py-6 px-4 rounded-xl shadow hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            {section.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CV;
