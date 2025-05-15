# 📝 TODO App – React.js + Next.js + MongoDB

A simple full-stack TODO application built with **Next.js**, **React.js**, and **MongoDB**. It supports full CRUD operations, search, sorting, pagination, and is preloaded with sample data.

> Includes RESTful API design and Swagger-based API documentation.

---

## 🧠 Features

- ✅ Create, Read, Update, Delete (CRUD)
- 🔍 Search and 🔃 Sort by title, description, or due date
- 📅 Pagination
- 🌱 Seed database with sample data
- 📜 Swagger/OpenAPI documentation
- 🧪 Unit tested API routes (Jest)
- 🐳 Docker-based MongoDB setup

---

## 🚀 Getting Started

```
git clone https://github.com/ChiXX/TODO-App.git
npm install
```

Start the app with preloaded data

```
 npm run dev:seed
```

Start the app with empty database

```
 npm run dev:empty
```
App is available at:

http://localhost:3000/

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) & Docker Compose

---

## 📦 Scripts

All scripts are run using `npm run <script-name>`:

| Command          | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| `dev`            | Start the app in development mode and create/connect to MongoDB via Docker |
| `reset-db`       | Stop, clear, and restart the MongoDB container with empty data             |
| `dev:seed`       | Reset DB, seed it, and start the app                                       |
| `dev:empty`      | Reset DB and start the app (no seeding)                                    |
| `test`           | Run unit tests with Jest                                                   |
| `lint`           | Run ESLint                                                                 |
| `format`         | Run prettier                                                               |

---

## 🌐 REST API Documentation

### 📎 Base URL: `/api/topics`

| Method | Endpoint         | Description                      |
|--------|------------------|----------------------------------|
| GET    | `/api/topics`    | Get list with pagination/search |
| POST   | `/api/topics`    | Create a new topic               |
| GET    | `/api/topics/:id`| Get a topic by ID                |
| PUT    | `/api/topics/:id`| Update a topic by ID             |
| DELETE | `/api/topics/:id`| Delete a topic by ID             |

### 🔍 Query Parameters for `GET /api/topics`

| Param      | Type   | Description                                  |
|------------|--------|----------------------------------------------|
| `search`   | string | Text search in title/description/dueDate     |
| `sortBy`   | string | One of `title`, `description`, `dueDate`     |
| `sortOrder`| string | `asc` or `desc`                              |
| `page`     | number | Page number (default: 1)                     |
| `pageSize` | number | Items per page (default: 5)                  |

---

## 📖 Swagger UI

API documentation is available at:

http://localhost:3000/docs

Or see the static OpenAPI definition in [`public/swagger.yaml`](./public/swagger.yaml).

---

## 🧪 Tests

Jest is used for API unit tests. Test files are located in `app/api/topics/*.test.js`.

Run tests with:

```bash
npm run test
```
## 🗂️ Project Structure
```
app/
  api/
    topics/                # API Routes for topic CRUD
  docs/                    # Swagger UI page
  addTopic/
  editTopic/
components/                # React components
models/
  topic.js                 # Mongoose schema
libs/
  mongodb.js               # DB connection
public/
  swagger.yaml             # OpenAPI definition
scripts/
  seed.js                  # Database seeder
```


