const express = require("express");
const router = express.Router();
const expertSessionController = require("../controllers/deliveredSessionController");
const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.get("/", expertSessionController.getExpertSessions);
router.get("/category/:category", expertSessionController.getSessionsByCategory);

// Protected routes (require authentication)
router.post("/add", authMiddleware, expertSessionController.addExpertSession);
router.post("/bulk-add",authMiddleware ,  expertSessionController.bulkAddExpertSessions);

module.exports = router;