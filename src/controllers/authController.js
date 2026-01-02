const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * REGISTER USER
 * POST /api/auth/register
 */
exports.register = (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const insertUserSql =
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

    db.query(
      insertUserSql,
      [name, email, hashedPassword, role],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "Email already exists" });
          }

          console.error(err);
          return res.status(500).json({ message: "User creation failed" });
        }

        const userId = result.insertId;

        // 🔹 IF USER IS COMPANY → CREATE COMPANY PROFILE
        if (role === "company") {
          const insertCompanySql =
            "INSERT INTO companies (user_id, company_name) VALUES (?, ?)";

          db.query(insertCompanySql, [userId, name], (err) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .json({ message: "Company profile creation failed" });
            }

            return res.status(201).json({
              message: "Company registered successfully ✅",
            });
          });
        } else {
          // student
          return res.status(201).json({
            message: "Student registered successfully ✅",
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};



/**
 * LOGIN USER
 * POST /api/auth/login
 */
exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });

    // ❌ USER NOT FOUND
    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);

    // ❌ PASSWORD WRONG
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // ✅ SUCCESS
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });
  });
};

