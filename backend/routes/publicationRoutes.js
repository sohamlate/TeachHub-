const express = require('express');
const { addPublication, getPublications } = require('../controllers/publicationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addPublication);
router.get('/', authMiddleware, getPublications);

module.exports = router;
