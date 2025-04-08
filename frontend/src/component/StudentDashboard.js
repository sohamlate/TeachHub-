import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAdmin(true);
  }, []);

  const handleQuizRedirect = () => {
    if (isAdmin) {
      navigate("/admin-quiz");
    } else {
      navigate("/quiz");
    }
  };

  const handleEssayRedirect = () => {
    window.open("https://essay-grading-python.onrender.com", "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Student Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl w-full">
        <button
          onClick={handleQuizRedirect}
          className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105 text-center border border-blue-500"
        >
          <h2 className="text-xl font-semibold text-blue-600">Quiz</h2>
          <p className="text-gray-600 mt-2">Take your quiz</p>
        </button>

        <button
          onClick={handleEssayRedirect}
          className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105 text-center border border-green-500"
        >
          <h2 className="text-xl font-semibold text-green-600">Essay Grade</h2>
          <p className="text-gray-600 mt-2">Open Essay Grading Tool</p>
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
