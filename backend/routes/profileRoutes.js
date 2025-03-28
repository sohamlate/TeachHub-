const express = require('express');
const { createProfile, getProfile, updateProfile, deleteProfile } = require('../controllers/profileController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/profiles', verifyToken, createProfile);
router.get('/profiles/:userId', getProfile);
router.put('/profiles/:userId', verifyToken, updateProfile);
router.delete('/profiles/:userId', verifyToken, deleteProfile);

module.exports = router;
