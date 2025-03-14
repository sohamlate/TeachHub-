import React, { useState, useEffect } from "react";
import axios from "axios";

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
        const response = await axios.get("http://localhost:5000/api/experience", {
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
      const response = await axios.post("http://localhost:5000/api/experience", formData, {
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
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto pt-8 px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Experience</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Manage your professional experiences
          </p>
        </div>

     
        <div className="mb-12">
        { token && <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Experience</h2>
             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="organization"
                placeholder="Organization Name"
                value={formData.organization}
                onChange={handleChange}
                required
                className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="designation"
                placeholder="Designation"
                value={formData.designation}
                onChange={handleChange}
                required
                className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                name="from"
                value={formData.from}
                onChange={handleChange}
                required
                className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                name="to"
                value={formData.to}
                onChange={handleChange}
                className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded transition-colors cursor-pointer"
              >
                Add Experience
              </button>
            </form>
        
          </div>
          }
        </div>

        {/* Experience List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {experiences.length > 0 ? (
            experiences.map((exp) => (
              <div key={exp._id} className="p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-xl font-bold">{exp.organization}</h3>
                <p className="text-gray-600">{exp.designation}</p>
                <p className="text-gray-500">
                  {new Date(exp.from).toLocaleDateString()} -{" "}
                  {exp.to ? new Date(exp.to).toLocaleDateString() : "Present"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600 py-8">
              No experiences found. Add your first experience above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experience;
