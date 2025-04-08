import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const QuizDetail = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [attempts, setAttempts] = useState([]);
  const [showAttempts, setShowAttempts] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchQuizDetails();
  }, [quizId]);

  const fetchQuizDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://teach-hub-eight.vercel.app/api/quiz/${quizId}`);
      setQuiz(response.data);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttempts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://teach-hub-eight.vercel.app/api/quiz/${quizId}/attempts`,
        { headers: { Authorization: `${token}` } }
      );
      setAttempts(response.data);
      setShowAttempts(true);
    } catch (error) {
      console.error('Error fetching attempts:', error);
      alert('Failed to load quiz attempts');
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = async () => {
    if (!questionText || options.some(opt => opt === '') || correctAnswer === '') {
      return alert("Please fill in all fields and select a correct answer.");
    }

    try {
      await axios.post(`https://teach-hub-eight.vercel.app/api/quiz/${quizId}/questions`, 
        { questionText, options, correctAnswer }, 
        { headers: { Authorization: `${token}` } }
      );
      setQuestionText('');
      setOptions(['', '', '', '']); 
      setCorrectAnswer('');
      fetchQuizDetails(); 
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.delete(`https://teach-hub-eight.vercel.app/api/quiz/${quizId}/questions`, 
        { data: { questionId }, headers: { Authorization: `${token}` } }
      );
      fetchQuizDetails(); 
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const toggleView = () => {
    if (!showAttempts) {
      fetchAttempts();
    } else {
      setShowAttempts(false);
    }
  };

  if (loading && !quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-gray-600">Quiz not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <button
              onClick={() => navigate('/admin-quiz')}
              className="mb-4 inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Admin
            </button>
            <h1 className="text-3xl font-bold text-gray-900">{quiz.title}</h1>
            <p className="mt-2 text-gray-600">{quiz.description}</p>
          </div>
          <button 
            onClick={toggleView}
            className={`px-6 py-2 rounded-md text-white transition-colors ${showAttempts ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {showAttempts ? 'Manage Questions' : 'View Results'}
          </button>
        </div>

        {!showAttempts ? (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Questions</h2>
              <div className="space-y-4">
                {quiz.questions?.length > 0 ? (
                  quiz.questions.map((q) => (
                    <div key={q._id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium text-gray-900">{q.questionText}</h3>
                        <button 
                          onClick={() => handleDeleteQuestion(q._id)}
                          className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      <div className="mt-4 space-y-2">
                        {q.options.map((option, index) => (
                          <div 
                            key={index}
                            className={`p-3 rounded-md ${option === q.correctAnswer ? 'bg-green-50 text-green-700' : 'bg-white text-gray-700'}`}
                          >
                            {option}
                            {option === q.correctAnswer && (
                              <span className="ml-2 text-green-600">✓</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No questions added yet.</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Add New Question</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question Text</label>
                  <input
                    type="text"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your question"
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">Options</label>
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...options];
                          newOptions[index] = e.target.value;
                          setOptions(newOptions);
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Option ${index + 1}`}
                      />
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={correctAnswer === option}
                          onChange={() => setCorrectAnswer(option)}
                          disabled={!option}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600">Correct</span>
                      </label>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleAddQuestion}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Add Question
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Quiz Results</h2>
            </div>
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : attempts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attempts.map((attempt) => (
                      <tr key={attempt._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{attempt.userName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attempt.userEmail}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {attempt.score ?? 'N/A'}/{quiz.questions?.length ?? 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                          {new Date(attempt.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                          <button
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={() => {
                              alert(`Detailed view for ${attempt.userName}'s attempt will be shown here`);
                            }}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No attempts have been made for this quiz yet.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizDetail;