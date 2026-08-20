# 🛒 E-Commerce Backend API

A RESTful E-Commerce Backend API built with **Node.js, Express.js, MongoDB, and Mongoose**.

The project provides secure user authentication, role-based authorization, product management, pagination, validation, centralized error handling, and image uploads for user avatars and products.

---

## 🚀 Features

### 🔐 Authentication & Authorization

- User registration and login.
- Password hashing using **bcryptjs**.
- JWT-based authentication.
- Protected routes using Bearer tokens.
- Token expiration handling.
- Role-Based Access Control (RBAC).
- Support for multiple user roles:
  - `ADMIN`
  - `MANAGER`
  - `USER`
- Unauthorized requests return appropriate HTTP status codes.

### 👤 User Management

- User registration.
- User login.
- User data management.
- Email uniqueness validation.
- User avatar upload.
- Image type and extension validation.
- Passwords are never returned in API responses.

### 📦 Product Management

- Create products.
- Retrieve all products.
- Retrieve a product by ID.
- Update products.
- Delete products.
- Product validation using Mongoose.
- Product image upload.
- Support for JSON and `multipart/form-data`.
- Safe product updates using allowed fields only.
- Prevent updating protected fields such as `_id` and `__v`.
- Prevent empty product updates.
- Keep the existing product image when no new image is uploaded.

### 📄 Pagination

The products endpoint supports pagination using:

```text
?page=1&limit=10
