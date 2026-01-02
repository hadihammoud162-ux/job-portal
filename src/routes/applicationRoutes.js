const express = require("express");
const router = express.Router();

const {
  applyForJob,
  getMyApplications,
  getApplicantsByJob,
  updateApplicationStatus
} = require("../controllers/applicationController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Student applies for job
router.post(
  "/apply/:jobId",
  protect,
  authorize("student"),
  applyForJob
);

// Student views their applications
router.get(
  "/my",
  protect,
  authorize("student"),
  getMyApplications
);

// Company views applicants for a job
router.get(
  "/job/:jobId",
  protect,
  authorize("company"),
  getApplicantsByJob
);

// Company updates application status
/*router.put(
  "/:id/status",
  protect,
  authorize("company"),
  updateApplicationStatus
);*/

module.exports = router;
