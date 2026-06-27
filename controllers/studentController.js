const pool = require("../config/db");

// Create Student
const createStudent = async (req, res, next) => {
  try {
    const { name, email, age, course } = req.body;

    const result = await pool.query(
      `INSERT INTO students (name, email, age, course)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, age, course]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Get Student By ID
const getStudentById = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM students WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Get All Students
const getStudents = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    let sql = "SELECT * FROM students";
    const values = [];

    if (req.query.name) {
      sql += " WHERE name = $1";
      values.push(req.query.name);
    }

    sql += ` LIMIT ${limit} OFFSET ${offset}`;

    const result = await pool.query(sql, values);

    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
};

// Update Student
const updateStudent = async (req, res, next) => {
  try {
    const { name, email, age, course } = req.body;

    const result = await pool.query(
      `UPDATE students
       SET name = $1,
           email = $2,
           age = $3,
           course = $4
       WHERE id = $5
       RETURNING *`,
      [name, email, age, course, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Delete Student
const deleteStudent = async (req, res, next) => {
  try {
    const result = await pool.query(
      "DELETE FROM students WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
};