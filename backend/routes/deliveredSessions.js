const express = require("express");
const router = express.Router();
const {
  getDeliveredSessions,
  addDeliveredSession,
} = require("../controllers/deliveredSessionController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getDeliveredSessions);

router.post("/add", authMiddleware,addDeliveredSession);

module.exports = router;
