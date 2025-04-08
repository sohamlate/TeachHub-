const express = require('express');
const { getQuiz, submitQuiz,getAllQuizzes,deleteQuiz, createQuiz, addQuestionToQuiz, deleteQuestionFromQuiz,getQuizAttempts ,getAttemptDetails} = require('../controllers/quizController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:quizId', getQuiz); 
router.post('/attempt/:quizId', submitQuiz); 
router.get('/', getAllQuizzes);
router.delete('/:id',authMiddleware, deleteQuiz); 
router.post('/create-quiz', authMiddleware, createQuiz);
router.post('/:id/questions',authMiddleware, addQuestionToQuiz);
router.delete('/:id/questions',authMiddleware, deleteQuestionFromQuiz);


router.get('/:quizId/attempts', authMiddleware, getQuizAttempts);
router.get('/attempts/:attemptId', authMiddleware, getAttemptDetails);

module.exports = router;
