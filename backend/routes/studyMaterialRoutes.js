const express = require('express');
const router = express.Router();
const studyMaterialController = require('../controllers/studyMaterialController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.post('/',authMiddleware ,studyMaterialController.addStudyMaterial);
router.get('/', studyMaterialController.getAllStudyMaterials);
router.delete('/:id', studyMaterialController.deleteStudyMaterial);

module.exports = router;
