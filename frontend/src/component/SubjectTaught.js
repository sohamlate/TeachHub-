import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const SubjectTaught = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({
    srNo: '',
    subjectName: '',
    type: '',
    branch: '',
    students: '',
    year: '',
    level: 'Under Graduate',
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('https://teach-hub-eight.vercel.app/api/subjects');
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    fetchSubjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const maxSrNo = Math.max(...subjects.map((subject) => subject.srNo), 0);

    const subjectWithSrNo = {
      ...newSubject,
      srNo: maxSrNo + 1, 
    };
    try {
      const response = await axios.post('https://teach-hub-eight.vercel.app/api/subjects', subjectWithSrNo);
      setSubjects([...subjects, response.data]);
      setNewSubject({
        srNo: '',
        subjectName: '',
        type: '',
        branch: '',
        students: '',
        year: '',
        level: 'Under Graduate',
      });
    } catch (error) {
      console.error('Error adding subject:', error);
    }
  };

  const renderTable = (data) => (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-blue-200">
            <th className="px-4 py-2 text-left">Sr.No</th>
            <th className="px-4 py-2 text-left">Subject Name</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Branch</th>
            <th className="px-4 py-2 text-left">Students</th>
            <th className="px-4 py-2 text-left">Year</th>
            <th className="px-4 py-2 text-left">Level</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{item.srNo}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{item.subjectName}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{item.type}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{item.branch}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{item.students}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{item.year}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{item.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const underGraduateSubjects = subjects.filter(subject => subject.level === 'Under Graduate');
  const postGraduateSubjects = subjects.filter(subject => subject.level === 'Post Graduate');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-bold text-center text-blue-700 mb-8">Subjects Taught</h1>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Add New Subject</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700">Subject Name</label>
                <input
                  type="text"
                  name="subjectName"
                  value={newSubject.subjectName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Type</label>
                <input
                  type="text"
                  name="type"
                  value={newSubject.type}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Branch</label>
                <input
                  type="text"
                  name="branch"
                  value={newSubject.branch}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Students</label>
                <input
                  type="text"
                  name="students"
                  value={newSubject.students}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Year</label>
                <input
                  type="text"
                  name="year"
                  value={newSubject.year}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Level</label>
                <select
                  name="level"
                  value={newSubject.level}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Under Graduate">Under Graduate</option>
                  <option value="Post Graduate">Post Graduate</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800"
              >
                Add Subject
              </button>
            </div>
          </form>
        </motion.div>

        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Under Graduate Subjects</h2>
        {renderTable(underGraduateSubjects)}

        <h2 className="text-2xl mt-6 font-semibold text-blue-700 mb-4">Post Graduate Subjects</h2>
        {renderTable(postGraduateSubjects)}
      </div>
    </div>
  );
};

export default SubjectTaught;
