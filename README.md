# Student Management API (PostgreSQL)

A RESTful Student Management API built using **Node.js**, **Express.js**, and **PostgreSQL**. The project supports CRUD operations for students, user authentication using JWT, password hashing with bcrypt, and post management.



## Features

- Student CRUD Operations
- User Registration & Login
- JWT Authentication
- Password Hashing using bcrypt
- PostgreSQL Database
- RESTful APIs
- SQL JOIN for Posts and Users
- Pagination for Student Listing
- Helmet Security
- CORS Support
- Rate Limiting
- Centralized Error Handling

---

##  Tech Stack

- Node.js
- Express.js
- PostgreSQL
- pg
- JWT (jsonwebtoken)
- bcryptjs
- Helmet
- CORS
- express-rate-limit
- dotenv

---

##  Project Structure

```
student-management-api-postgresql
│
├── config
│   └── db.js
│
├── controllers
│   └── studentController.js
│
├── middleware
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── routes
│   ├── authRoutes.js
│   ├── postRoutes.js
│   └── studentRoutes.js
│
├── .env.example
├── .gitignore
├── app.js
├── package.json
└── README.md
```

---

##  Installation

### Clone Repository

```bash
git clone https://github.com/your-username/student-management-api-postgresql.git
```

Move into the project.

```bash
cd student-management-api-postgresql
```

Install dependencies.

```bash
npm install
```

---

##  Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

DB_USER=postgres
DB_HOST=localhost
DB_NAME=studentdb
DB_PASSWORD=your_password
DB_PORT=5432

JWT_SECRET=your_secret_key
```

---

##  Database Setup

Create a PostgreSQL database.

```sql
CREATE DATABASE studentdb;
```

### Students Table

```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT,
    course VARCHAR(100)
);
```

### Users Table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

### Posts Table

```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    user_id INT REFERENCES users(id)
);
```

---

## Run the Project

```bash
npm start
```

or

```bash
node app.js
```

Server runs at:

```
http://localhost:5000
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /auth/register | Register User |
| POST | /auth/login | Login User |
| GET | /auth/profile | User Profile |

---

## Students

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /students | Create Student |
| GET | /students | Get All Students |
| GET | /students/:id | Get Student by ID |
| PUT | /students/:id | Update Student |
| DELETE | /students/:id | Delete Student |

---

## Posts

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /posts | Create Post |
| GET | /posts | Get All Posts |

---

## Security

- JWT Authentication
- Password Hashing
- Helmet Security
- CORS Protection
- Rate Limiting

---

##  Author

**Suguna Kante**

GitHub: https://github.com/suguna-kante

---

##  Future Enhancements

- Search Students
- Sorting
- File Upload
- Swagger API Documentation
- Docker Support
- Unit Testing
- Refresh Tokens
- Role-Based Authentication

---

##  Live API

Base URL:
https://student-management-api-postgresql.onrender.com
