import React, { useState, useEffect } from "react";
import PublicationCard from "./PublicationCard";
import axios from "axios";

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    publisher: "",
    link: ""
  });

  // Fetch publications from backend
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/publication", {
          headers: {
            Authorization: `${token}`
          }
        });
        setPublications(response.data);
      } catch (error) {
        console.error("Error fetching publications:", error);
      }
    };

    fetchPublications();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/api/publication", formData, {
        headers: {
           Authorization: `${token}`
        }
      });
      
      // Add new publication to state
      setPublications([...publications, response.data]);

      // Reset form
      setFormData({
        title: "",
        publisher: "",
        link: ""
      });
    } catch (error) {
      console.error("Error adding publication:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto pt-8 px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Publications
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A collection of academic papers, articles, and research publications
          </p>
        </div>

        {/* Publication Form */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Publication</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                placeholder="Publication Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="publisher"
                placeholder="Publisher"
                value={formData.publisher}
                onChange={handleChange}
                required
                className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="link"
                placeholder="Publication Link"
                value={formData.link}
                onChange={handleChange}
                required
                className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded transition-colors cursor-pointer"
              >
                Add Publication
              </button>
            </form>
          </div>
        </div>

        {/* Publications List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {publications.length > 0 ? (
            publications.map((pub) => (
              <PublicationCard key={pub._id} pub={pub} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600 py-8">
              No publications found. Add your first publication above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Publications;
