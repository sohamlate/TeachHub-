import React, { useState, useEffect } from "react";
import axios from "axios";

const Education = () => {
  const [education, setEducation] = useState([]);
  const [formData, setFormData] = useState({
    collegename: "",
    coursename: "",
    percent: "",
    certificate: "",
  });

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/education", {
          headers: { Authorization: `${token}` },
        });
        setEducation(response.data); // Fixed this line
      } catch (error) {
        console.error("Error fetching education:", error);
      }
    };

    fetchEducation();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/education",
        formData,
        {
          headers: { Authorization: `${token}` },
        }
      );

      setEducation([...education, response.data]);

      setFormData({
        collegename: "",
        coursename: "",
        percent: "", // Fixed spelling issue
        certificate: "",
      });
    } catch (error) {
      console.error("Error adding education:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto pt-8 px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Education</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Manage your Education
          </p>
        </div>

        {/* Add Education Form */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Education</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="collegename"
                placeholder="College Name"
                value={formData.collegename}
                onChange={handleChange}
                required
                className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="coursename"
                placeholder="Course Name"
                value={formData.coursename}
                onChange={handleChange}
                required
                className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="percent"
                placeholder="Percentage"
                value={formData.percent}
                onChange={handleChange}
                required
                className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="certificate"
                placeholder="Certificate Link (Optional)"
                value={formData.certificate}
                onChange={handleChange}
                className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded transition-colors cursor-pointer"
              >
                Add Education
              </button>
            </form>
          </div>
        </div>

        {/* Education List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {education.length > 0 ? (
            education.map((edu) => (
              <div key={edu._id} className="p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-xl font-bold">{edu.collegename}</h3>
                <p className="text-gray-600">{edu.coursename}</p>
                <p className="text-gray-500">Percentage: {edu.percent}%</p>
                {edu.certificate && (
                  <a
                    href={edu.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Certificate
                  </a>
                )}
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600 py-8">
              No education records found. Add your first education above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Education;
