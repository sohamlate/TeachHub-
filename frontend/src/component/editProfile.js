import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile({ user }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    education: "",
    expertSessions: [],
    publications: "",
    reviewers: [],
    awards: [],
    certifications: "",
  });

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/api/profile/${user.id}`)
        .then(response => {
          if (response.data.profile) {
            setFormData(response.data.profile);
          }
        })
        .catch(error => console.error("Error fetching profile:", error));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/profile", formData, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      navigate(`/profile/${user.id}`);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-2 mb-3 border rounded" />
        <textarea name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience" className="w-full p-2 mb-3 border rounded"></textarea>
        <input type="text" name="education" value={formData.education} onChange={handleChange} placeholder="Education" className="w-full p-2 mb-3 border rounded" />
        <input type="text" name="publications" value={formData.publications} onChange={handleChange} placeholder="Publications" className="w-full p-2 mb-3 border rounded" />
        <input type="text" name="certifications" value={formData.certifications} onChange={handleChange} placeholder="Certifications" className="w-full p-2 mb-3 border rounded" />

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Save</button>
      </form>
    </div>
  );
}

export default EditProfile;
