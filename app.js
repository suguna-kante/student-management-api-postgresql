const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
require("./config/db");

const app = express();


// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// Routes
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

// Error Middleware
const errorHandler = require("./middleware/errorMiddleware");

// Routes
app.use("/students", studentRoutes);
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

// Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});