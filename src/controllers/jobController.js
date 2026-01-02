const db = require("../config/db");

/**
 * GET ALL JOBS
 * For students
 */
exports.getJobs = (req, res) => {
  const sql = `
    SELECT 
      jobs.id,
      jobs.title,
      jobs.description,
      companies.company_name
    FROM jobs
    JOIN companies ON jobs.company_id = companies.id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Get jobs error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
};

/**
 * CREATE JOB
 * Only company
 */
exports.createJob = (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id; // from JWT

  if (!title || !description) {
    return res.status(400).json({
      message: "Title and description are required",
    });
  }

  // 1️⃣ Find the company that belongs to this user
  const findCompanySql = "SELECT id FROM companies WHERE user_id = ?";

  db.query(findCompanySql, [userId], (err, companyResult) => {
    if (err) {
      console.error("Find company error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (companyResult.length === 0) {
      return res.status(400).json({
        message: "Company profile not found",
      });
    }

    const companyId = companyResult[0].id;

    // 2️⃣ Insert the job using company_id
    const insertJobSql =
      "INSERT INTO jobs (title, description, company_id) VALUES (?, ?, ?)";

    db.query(insertJobSql, [title, description, companyId], (err) => {
      if (err) {
        console.error("Create job error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      res.json({ message: "Job created successfully" });
    });
  });
};
