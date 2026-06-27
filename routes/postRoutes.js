const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Create Post
router.post("/", async (req, res) => {
    try {
        const { title, content, user_id } = req.body;

        const result = await pool.query(
            `INSERT INTO posts (title, content, user_id)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [title, content, user_id]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Get All Posts
router.get("/", async (req, res) => {
    try {

        const result = await pool.query(`
            SELECT
                posts.id,
                posts.title,
                posts.content,
                users.id AS user_id,
                users.username,
                users.email
            FROM posts
            JOIN users
            ON posts.user_id = users.id
        `);

        res.status(200).json(result.rows);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;