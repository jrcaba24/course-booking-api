# Course Booking API

## 1. Overview

The Course Booking API is a RESTful API designed for managing course bookings. It provides user authentication, course management, and booking functionalities. The API follows RESTful principles and is built using Node.js and Express.

- **2. Tech Stack**
 Backend: Node.js, Express.js
 Database: MongoDB (Mongoose ORM)
 Authentication: JWT, Passport.js
 Testing: Postman

- **3. Features**
- ***3.1 User Management***
	User Registration & Login
	Authentication with JWT
	Role-based Access Control (Admin, Instructor, Student)
- ***3.2 Course Management***
	Create, Update, Delete Courses (Admin, Instructor)
	Retrieve Course Listings (Public)
- ***3.3 Booking System***
	Enroll in a Course (Authenticated Users)
	View Enrolled Courses
	Cancel Enrollment
- **4. API Endpoints**
- ***4.1 Authentication***
	POST /auth/register - User registration
	POST /auth/login - User login
- ***4.2 Course Management***
	GET /courses - Get all courses
	POST /courses - Create a course (Admin/Instructor)
	PUT /courses/:id - Update course details
	DELETE /courses/:id - Delete a course
- ***4.3 Booking System***
	POST /bookings/:courseId - Enroll in a course
	GET /bookings - View enrolled courses
	DELETE /bookings/:id - Cancel enrollment
- **5. Security & Authentication**
	JWT Authentication for secured endpoints
	Role-based access control for course and user management
- **6. Deployment & Environment Variables**
- ***6.1 Required Environment Variables***
	PORT - Server Port
	MONGO_URI - MongoDB Connection String
	JWT_SECRET - Secret Key for JWT Authentication
- **7. Testing & Documentation**
	API Testing: Postman Collection provided
	API Documentation: Swagger/OpenAPI (Recommended)
- **8. Future Enhancements**
	Implementing payment integration
	Adding notifications for enrollments
	Enhancing search and filtering for courses