const Quiz = require('../models/Quiz');
const Attempt = require('../models/Attempt');
const Question = require('../models/Question');


exports.getQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId).populate('questions');
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.submitQuiz = async (req, res) => {
    try {
        const { userName, userEmail, responses , score} = req.body;
        // let score = 0;

        const attempt = new Attempt({
            quiz: req.params.quizId,
            userName,
            userEmail,
            responses,
            score
        });

        await attempt.save();
        res.status(201).json({ message: 'Quiz submitted', score });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find({}, 'title description'); 
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.createQuiz = async (req, res) => {
    try {
        const { title, description, duration, questions } = req.body;
        const newQuiz = new Quiz({ title, description, duration, createdBy: req.user.userId, questions });
        await newQuiz.save();
        res.status(201).json(newQuiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        await Quiz.findByIdAndDelete(id);
        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addQuestionToQuiz = async (req, res) => {
    const { questionText, options, correctAnswer } = req.body;
    const { id } = req.params;
  
   
    const newQuestion = new Question({
      questionText,
      options,
      correctAnswer,
    });
  
    try {
      
      await newQuestion.save();
  
      const quiz = await Quiz.findById(id);
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      quiz.questions.push(newQuestion);
      await quiz.save();
  
      res.status(201).json(newQuestion);
    } catch (error) {
      console.error('Error adding question:', error);
      res.status(500).json({ message: 'Failed to add question' });
    }
};

exports.deleteQuestionFromQuiz = async (req, res) => {
    const { quizId, questionId } = req.params;

    try {
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

    
        quiz.questions = quiz.questions.filter((question) => question.toString() !== questionId);

        await quiz.save();


        await Question.findByIdAndDelete(questionId);

        res.json({ message: 'Question deleted successfully' });
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).json({ message: 'Failed to delete question' });
    }
};

// Get all attempts for a quiz
exports.getQuizAttempts = async (req, res) => {
    try {
      const { quizId } = req.params;
      
      // Make sure the user is authorized (typically admin or quiz creator)
      // You should add authentication middleware before calling this
      
      const attempts = await Attempt.find({ quiz: quizId })
        .sort({ createdAt: -1 }) // Most recent first
        .select('userName userEmail score responses createdAt');
      
      res.status(200).json(attempts);
    } catch (error) {
      console.error('Error getting quiz attempts:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Get a specific attempt
  exports.getAttemptDetails = async (req, res) => {
    try {
      const { attemptId } = req.params;
      
      const attempt = await Attempt.findById(attemptId)
        .populate('quiz', 'title questions')
        .select('userName userEmail score responses createdAt');
      
      if (!attempt) {
        return res.status(404).json({ message: 'Attempt not found' });
      }
      
      res.status(200).json(attempt);
    } catch (error) {
      console.error('Error getting attempt details:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };


