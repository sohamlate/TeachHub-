const express = require('express');
const { addEducation, getEducation } = require('../controllers/educationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addEducation);
router.get('/', getEducation);

module.exports = router;
