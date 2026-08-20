# 🛒 E-Commerce Backend API

A RESTful E-Commerce Backend API built with **Node.js, Express.js, MongoDB, and Mongoose**.

The project provides secure user authentication, role-based authorization, product management, pagination, validation, centralized error handling, and image uploads for user avatars and products.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#️-installation)
- [Environment Variables](#-environment-variables)
- [Running the Project](#️-running-the-project)
- [API Endpoints](#-api-endpoints)
- [Authentication](#-authentication)
- [Creating a Product](#-creating-a-product)
- [Product Pagination](#-product-pagination)
- [Product Images](#️-product-images)
- [Updating Products](#️-updating-products)
- [Role-Based Access Control](#-role-based-access-control)
- [API Testing](#-api-testing)
- [Security Considerations](#️-security-considerations)
- [Deployment](#-deployment)
- [Future Improvements](#-future-improvements)
- [Author](#-author)
- [Project Highlights](#-project-highlights)

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
```

The API returns pagination metadata including:

- Current page.
- Items per page.
- Total products.
- Total pages.

The maximum allowed limit is 100 to prevent unnecessarily large requests.

### 🛡️ Validation & Error Handling

- Mongoose schema validation.
- Required field validation.
- Numeric value validation.
- String length validation.
- MongoDB ObjectId validation.
- Duplicate email handling.
- Invalid JWT handling.
- Expired JWT handling.
- Invalid image type handling.
- Centralized application error handling.
- Consistent JSON error responses.

### 🖼️ File Uploads

File uploads are handled using Multer.

Supported image formats include:

- `.jpg`
- `.jpeg`
- `.png`
- `.gif`
- `.webp`

Uploaded files receive unique names using `crypto.randomUUID()` to avoid filename collisions.

Uploaded files are served through:

```text
/uploads/<filename>
```

---

## 🛠️ Tech Stack

**Backend**

- Node.js
- Express.js
- JavaScript
- REST API

**Database**

- MongoDB
- Mongoose

**Authentication & Security**

- JSON Web Tokens (JWT)
- bcryptjs
- Role-Based Access Control (RBAC)

**File Uploads**

- Multer
- `crypto.randomUUID()`

**Development & Testing**

- Nodemon
- Postman
- Git
- GitHub

**Deployment**

- Render

---

## 📁 Project Structure

```text
ecommerce-backend-api/
│
├── controller/
│   ├── products.controller.js
│   └── users.controller.js
│
├── middleware/
│   ├── allowedTo.js
│   ├── asyncwrapper.js
│   ├── upload.js
│   └── verifyToken.js
│
├── models/
│   └── users.model.js
│
├── routes/
│   ├── product.route.js
│   └── users.route.js
│
├── utils/
│   ├── AppError.js
│   ├── GeneretJWT.js
│   ├── httpstatustext.js
│   └── userRoles.js
│
├── uploads/
│
├── app.js
├── db.js
├── index.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Installation

**1. Clone the repository**

```bash
git clone https://github.com/EbrahimQaid/ecommerce-backend.git
```

**2. Navigate to the project**

```bash
cd ecommerce-backend
```

**3. Install dependencies**

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
mongodb_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> ⚠️ Never commit your `.env` file to GitHub.

The project includes `.env.example` as a template.

---

## ▶️ Running the Project

**Development**

```bash
npm run dev
```

**Production**

```bash
npm start
```

The API will be available at:

```text
http://localhost:3000
```

---

## 🔗 API Endpoints

### 👤 Users

| Method | Endpoint          | Authentication | Description             |
| ------ | ----------------- | -------------- | ----------------------- |
| POST   | `/users/register` | Public         | Register a new user     |
| POST   | `/users/login`    | Public         | Login and receive JWT   |
| GET    | `/users/:id`      | Protected      | Get user information    |
| PATCH  | `/users/:id`      | Protected      | Update user information |

### 📦 Products

| Method | Endpoint         | Authentication | Description            |
| ------ | ---------------- | -------------- | ---------------------- |
| GET    | `/products`      | Public         | Get paginated products |
| GET    | `/products/:id`  | Protected      | Get a product by ID    |
| POST   | `/products`      | ADMIN          | Create a product       |
| PUT    | `/products/:id`  | ADMIN          | Update a product       |
| DELETE | `/products/:id`  | ADMIN          | Delete a product       |

---

## 🔐 Authentication

Protected endpoints require a JWT Bearer token.

Add the following HTTP header:

```http
Authorization: Bearer <your_token>
```

Example:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## 📦 Creating a Product

Products can be created using either JSON or `multipart/form-data`.

### JSON

```http
POST /products
Content-Type: application/json
Authorization: Bearer <ADMIN_TOKEN>
```

Example:

```json
{
  "title": "Wireless Headphones",
  "description": "High-quality wireless headphones",
  "price": 89.99,
  "category": "Electronics",
  "stock": 25
}
```

### With Product Image

Use:

```http
Content-Type: multipart/form-data
```

Form fields:

```text
title        = Wireless Headphones
description  = High-quality wireless headphones
price        = 89.99
category     = Electronics
stock        = 25
image        = <image file>
```

---

## 📄 Product Pagination

The products endpoint supports pagination:

```http
GET /products?page=1&limit=10
```

Example response structure:

```json
{
  "status": "success",
  "data": {
    "products": [],
    "pagination": {
      "currentPage": 1,
      "limit": 10,
      "totalProducts": 25,
      "totalPages": 3
    }
  }
}
```

The API limits the maximum number of requested products per page to 100.

---

## 🖼️ Product Images

When creating or updating a product, an image can be uploaded using the `image` field.

Uploaded images can be accessed through:

```text
/uploads/<filename>
```

For example:

```text
http://localhost:3000/uploads/afeb6b69-7003-4845-8418-fe2b65edd625.png
```

The upload system:

- Generates unique filenames.
- Accepts image files only.
- Validates file extensions.
- Validates MIME types.
- Reuses the same upload middleware for user avatars and product images.

---

## ✏️ Updating Products

Products can be updated using:

```http
PUT /products/:id
```

Only the following fields are allowed:

- `title`
- `description`
- `price`
- `category`
- `stock`
- `image`

Protected fields such as:

- `_id`
- `__v`

cannot be modified through the product update endpoint.

If no new image is provided, the existing product image is preserved.

---

## 👥 Role-Based Access Control

The API uses RBAC to control access to protected resources.

### ADMIN

Can:

- Create products.
- Update products.
- Delete products.
- Access protected administrative operations.

### USER

Can access authenticated user functionality according to the route permissions.

### MANAGER

Supported as an application role and can be assigned according to the application's authorization rules.

---

## 🧪 API Testing

The API can be tested using Postman.

Recommended testing flow:

```text
1. Register User
       ↓
2. Login
       ↓
3. Copy JWT Token
       ↓
4. Send Bearer Token
       ↓
5. Create Product as ADMIN
       ↓
6. Upload Product Image
       ↓
7. Get Products
       ↓
8. Test Pagination
       ↓
9. Update Product
       ↓
10. Delete Product
```

---

## 🛡️ Security Considerations

The project implements several backend security practices:

- JWT authentication.
- Password hashing with bcryptjs.
- Role-based authorization.
- Protected administrative routes.
- JWT expiration.
- Validation of authorization headers.
- Image MIME type validation.
- Image extension validation.
- Protected update fields.
- Environment variables for sensitive configuration.
- `.env` excluded from Git.

---

## 🚀 Deployment

The API is deployed as a Node.js web service using Render.

The production server uses:

```bash
npm start
```

Environment variables must be configured on the hosting platform.

---

## 🔮 Future Improvements

Possible future improvements include:

- Automated testing with Jest and Supertest.
- API documentation using Swagger / OpenAPI.
- Request logging.
- Advanced product search and filtering.
- Shopping cart functionality.
- Order management.
- Payment integration.
- Refresh token mechanism.
- Docker support.

These features are outside the current scope of the project.

---

## 👨‍💻 Author

**Ebrahim Qaid**

Computer Science Student | Aspiring Backend Developer

GitHub: [https://github.com/EbrahimQaid](https://github.com/EbrahimQaid)

---

## ⭐ Project Highlights

This project demonstrates practical backend development concepts including:

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs
- JWT Authentication
- RBAC
- Password Hashing
- Validation
- Pagination
- Centralized Error Handling
- File Uploads
- API Security
- Git & GitHub
- Deployment

⭐ If you find this project useful, feel free to explore the repository and give it a star.
