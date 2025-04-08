// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const auth = require('../middleware/auth'); // Your authentication middleware

// Add these to your existing quiz routes

// Submit a quiz attempt (no auth required - users take quizzes)
router.post('/attempt/:quizId', quizController.submitQuizAttempt);

// Get all attempts for a quiz (auth required - admin only)
router.get('/:quizId/attempts', auth, quizController.getQuizAttempts);

// Get details of a specific attempt (auth required - admin only)
router.get('/attempts/:attemptId', auth, quizController.getAttemptDetails);

module.exports = router;