const express = require("express");
const router = express.Router();
const { getJobs, createJob } = require("../controllers/jobController");
const { protect, authorize } = require("../middleware/authMiddleware");

// anyone logged in can see jobs
router.get("/", protect, getJobs);

// ONLY company can create jobs
router.post("/", protect, authorize("company"), createJob);

module.exports = router;
