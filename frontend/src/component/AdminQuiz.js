import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://teach-hub-eight.vercel.app/api/quiz');
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuiz = async () => {
    if (!title || !description) {
      alert('Please enter title and description');
      return;
    }
    
    try {
      await axios.post('https://teach-hub-eight.vercel.app/api/quiz/create-quiz', 
        { title, description }, 
        { headers: { Authorization: `${token}` } }
      );
      fetchQuizzes();
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  const handleDeleteQuiz = async (id) => {
    try {
      await axios.delete(`https://teach-hub-eight.vercel.app/api/quiz/${id}`, 
        { headers: { Authorization: `${token}` } }
      );
      fetchQuizzes();
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Quiz Management</h1>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Quiz title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Quiz description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleCreateQuiz}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Create New Quiz
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Existing Quizzes</h2>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <svg className="w-8 h-8 animate-spin text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {quizzes.map((quiz) => (
                <div key={quiz._id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 
                        onClick={() => navigate(`/quiz/${quiz._id}`)}
                        className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer flex items-center"
                      >
                        {quiz.title}
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">{quiz.description}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteQuiz(quiz._id)}
                      className="ml-4 p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              {quizzes.length === 0 && (
                <div className="px-6 py-12 text-center text-gray-500">
                  No quizzes available. Create your first quiz to get started.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminQuiz;