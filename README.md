# E-Commerce Backend API

A RESTful e-commerce backend built with Node.js, Express.js, MongoDB, Mongoose, and JWT authentication.

## Features

- Product CRUD with Mongoose validation.
- Product pagination with `page`, `limit`, and pagination metadata.
- User registration and login with bcrypt password hashing.
- JWT authentication and role-based authorization.
- Optional user avatar upload with image type and extension filtering.
- Centralized error responses.

## Tech Stack

- Node.js and Express.js
- MongoDB and Mongoose
- JSON Web Tokens (`jsonwebtoken`)
- `bcryptjs`, `multer`, `validator`, and `dotenv`

## Project Structure

```text
controller/    Request handlers for products and users
middleware/    Authentication, authorization, async, and upload middleware
models/        Mongoose schemas
routes/        Express route definitions
utils/         Errors, JWT generation, response text, and roles
app.js         Express application configuration and routes
index.js       Database connection and HTTP server startup
db.js          MongoDB connection helper
uploads/       Uploaded avatars
```

## Authentication

Register with `POST /users/register`, then login with `POST /users/login`. Login returns a JWT. Protected endpoints require:

```text
Authorization: Bearer <token>
```

Passwords are hashed with bcrypt and are excluded from user query responses.

## Authorization / RBAC

The available roles are `ADMIN`, `MANAGER`, and `USER`. Product creation, update, and deletion require `ADMIN`. Listing users requires `ADMIN` or `MANAGER`; user deletion and updates require `ADMIN`.

## API Endpoints

| Method | Endpoint                    | Access         | Description                                              |
| ------ | --------------------------- | -------------- | -------------------------------------------------------- |
| GET    | `/products?page=1&limit=10` | Public         | List products with pagination                            |
| POST   | `/products`                 | ADMIN          | Create a product                                         |
| GET    | `/products/:id`             | Authenticated  | Get one product                                          |
| PUT    | `/products/:id`             | ADMIN          | Update a product                                         |
| DELETE | `/products/:id`             | ADMIN          | Delete a product                                         |
| POST   | `/users/register`           | Public         | Register a user; optional multipart image field `avatar` |
| POST   | `/users/login`              | Public         | Login and receive a JWT                                  |
| GET    | `/users`                    | ADMIN, MANAGER | List users                                               |
| PATCH  | `/users/:id`                | ADMIN          | Update a user                                            |
| DELETE | `/users/:id`                | ADMIN          | Delete a user                                            |

## Installation

```bash
npm install
```

Copy `.env.example` to `.env` and provide local values. Never commit `.env` or real credentials.

## Environment Variables

```text
mongodb_URL=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
PORT=3000
NODE_ENV=development
```

## Running The Project

```bash
npm start
```

For local development with Nodemon:

```bash
npm run dev
```

## Example API Responses

Successful product listing:

```json
{
  "status": "success",
  "data": {
    "products": [],
    "pagination": { "page": 1, "limit": 10, "total": 0, "totalPages": 0 }
  }
}
```

Error response:

```json
{ "status": "fail", "message": "Product not found" }
```

## Future Improvements

- Add automated API tests with Jest and Supertest.
- Add request logging and API documentation.

## Suggested Repository Metadata

Repository description:

> RESTful E-Commerce Backend API built with Node.js, Express.js, MongoDB, JWT authentication, RBAC, pagination, and file uploads.

Suggested topics: `nodejs`, `express`, `mongodb`, `mongoose`, `rest-api`, `jwt`, `authentication`, `authorization`, `backend`, `ecommerce`, `javascript`, `api`

## Author

Backend Junior Developer Portfolio Project
