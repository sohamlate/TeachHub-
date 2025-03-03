const express = require('express');
const { addExperience, getExperience } = require('../controllers/experienceController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addExperience);
router.get('/', authMiddleware, getExperience);

module.exports = router;
