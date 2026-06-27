const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

// Login
router.post("/login", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [req.body.email]
        );

        const user = result.rows[0];

        if (!user) {
            return res.status(400).json({
                message: "Invalid user"
            });
        }

        const isMatch = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {
                userID: user.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({ token });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Register
router.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(
            req.body.password,
            10
        );

        const result = await pool.query(
            `INSERT INTO users(username,email,password)
             VALUES($1,$2,$3)
             RETURNING *`,
            [
                req.body.username,
                req.body.email,
                hashedPassword
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Profile
router.get("/profile", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Welcome user",
        user: req.user
    });
});

module.exports = router;