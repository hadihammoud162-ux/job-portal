const db = require("../config/db");

/**
 * APPLY FOR A JOB
 * Student only
 */
exports.applyForJob = (req, res) => {
  const userId = req.user.id; // student id
  const jobId = req.params.jobId;

  const sql = `
    INSERT INTO applications (job_id, user_id)
    VALUES (?, ?)
  `;

  db.query(sql, [jobId, userId], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          message: "You already applied to this job",
        });
      }

      console.error("Apply job error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ message: "Applied successfully" });
  });
};

/**
 * GET MY APPLICATIONS
 * Student only
 */
exports.getMyApplications = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      jobs.id,
      jobs.title,
      jobs.description,
      companies.company_name
    FROM applications
    JOIN jobs ON applications.job_id = jobs.id
    JOIN companies ON jobs.company_id = companies.id
    WHERE applications.user_id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Get my applications error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
};

/**
 * GET APPLICANTS FOR A JOB
 * Company only (later use)
 */
exports.getApplicantsByJob = (req, res) => {
  const jobId = req.params.jobId;

  const sql = `
    SELECT users.id, users.name, users.email
    FROM applications
    JOIN users ON applications.user_id = users.id
    WHERE applications.job_id = ?
  `;

  db.query(sql, [jobId], (err, results) => {
    if (err) {
      console.error("Get applicants error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
};
