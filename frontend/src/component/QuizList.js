import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuizList = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (quizId) {
      console.log(`Fetching quiz data for Quiz ID: ${quizId}`);
      axios.get(`https://teach-hub-eight.vercel.app/api/quiz/${quizId}`)
        .then((response) => {
          console.log("API Response:", response.data);
          setQuizData(response.data);
          if (response.data && response.data.questions && Array.isArray(response.data.questions)) {
            setQuestions(response.data.questions);
          } else {
            setQuestions([]);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching quiz data:", error);
          setError("Failed to load quiz. Please try again.");
          setLoading(false);
        });
    }
  }, [quizId]);

  const handleAnswer = (answer) => {
    setUserAnswers((prev) => [
      ...prev,
      { questionId: currentQuestion._id, selectedOption: answer },
    ]);
    
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setAllQuestionsAnswered(true);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!userName || !userEmail) {
      alert("Please enter your name and email before submitting.");
      return;
    }

    const correctAnswers = userAnswers.filter(
      (ans, index) => ans.selectedOption === questions[index]?.correctAnswer
    ).length;
    const score = correctAnswers ;

    try {
      const response = await axios.post(`https://teach-hub-eight.vercel.app/api/quiz/attempt/${quizId}`, {
        userName,
        userEmail,
        responses: userAnswers,
        score
      });

      console.log("Quiz submitted successfully!", response.data);
      setQuizSubmitted(true);
    } catch (error) {
      console.error("Error submitting the quiz:", error);
      alert("Failed to submit quiz. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <svg className="mx-auto h-12 w-12 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-red-600">{error}</h2>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">No questions available for this quiz.</h2>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (quizSubmitted) {
    const correctAnswers = userAnswers.filter(
      (ans, index) => ans.selectedOption === questions[index]?.correctAnswer
    ).length;
    const score = (correctAnswers / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{quizData?.title}</h2>
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6">
                <span className="text-3xl font-bold text-green-600">{Math.round(score)}%</span>
              </div>
              <p className="text-lg text-gray-600">
                You got {correctAnswers} out of {questions.length} questions correct
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion || !currentQuestion.options) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Error loading question data. Please try again.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {!allQuestionsAnswered ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{quizData?.title}</h2>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-900 mb-6">{currentQuestion.questionText}</h3>
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option)}
                      className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span className="text-gray-800">{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Submission</h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                  <input
                    id="email"
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <button
                  onClick={handleSubmitQuiz}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Submit Quiz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizList;