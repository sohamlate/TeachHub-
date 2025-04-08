const express = require('express');
const { addAward, getAwards } = require('../controllers/awardController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add',authMiddleware ,addAward);
router.get('/', getAwards);

module.exports = router;
