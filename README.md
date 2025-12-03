# ⚙️ Course Enrollment Platform – Backend API

The **Course Enrollment Platform Backend** is a robust RESTful API built with **Node.js**, **Express.js**, **MongoDB**, and **Firebase Authentication**.  
It provides all essential backend functionalities for user authentication, course management, and enrollment tracking — serving as the data and logic layer for the **React-based frontend UI**.

This backend is structured for scalability, security, and real-world readiness — following MVC principles and JWT-based authentication workflows.

---

## 🚀 Key Features

- **🔐 Secure Firebase Authentication:**  
  Handles user registration, login, and token-based authentication through Firebase.  
  Supports both frontend Firebase tokens and backend JWT verification for double-layered security.

- **📚 Course Management:**  
  REST APIs to manage courses, including creation, retrieval, and seeding with sample data using MongoDB.

- **🎓 Enrollment System:**  
  Allows users to enroll in courses, track progress, and fetch their personal course data securely.

- **🧾 User Profiles:**  
  Fetch and manage authenticated user profiles with Firebase user linkage.

- **🧰 Database Seeding (seed.js):**  
  Preloads multiple sample courses into MongoDB for development and testing.

- **🌐 CORS-Enabled & Ready for Deployment:**  
  Optimized CORS configuration allows seamless integration with your React frontend hosted on a different origin.

---

## 🧠 Tech Stack

| Category | Technology | Purpose |
|-----------|-------------|----------|
| **Runtime** | Node.js | JavaScript runtime environment |
| **Framework** | Express.js | Lightweight and fast backend web framework |
| **Database** | MongoDB + Mongoose | Schema-based data modeling and persistence |
| **Authentication** | Firebase Auth + JWT | Dual authentication layer for user security |
| **Environment Management** | dotenv | Secure environment variable handling |
| **Seeding / Dev Tool** | seed.js | Preloads initial course data |
| **API Testing** | Postman / Thunder Client | REST API testing and debugging |

---

## 🧩 API Structure Overview

### 🧑‍💼 Authentication Routes (`/auth`)
- **POST /auth/register** → Register a new user  
- **POST /auth/login** → Authenticate existing user  
- **GET /auth/profile** → Get user profile using Firebase token  

### 🎓 Course Routes (`/courses`)
- **GET /courses** → Fetch all available courses  
- **GET /courses/:id** → Fetch a single course by ID  

### 🧾 Enrollment Routes (`/users/enrollments`)
- **GET /users/enrollments** → Get all enrolled courses for the logged-in user  
- **POST /users/enroll/:courseId** → Enroll the user in a specific course  

### 🧩 Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud via MongoDB Atlas)
- Firebase project (Admin SDK credentials)

🧑‍💻 Author

Md Raiyan Sheikh
Full-Stack Developer & Cybersecurity Enthusiast

Category: Node.js / Express.js / MongoDB Projects
License: MIT License

