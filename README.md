# 📝 TODO App – React.js + Next.js + MongoDB

A simple full-stack TODO application built with **Next.js**, **React.js**, and **MongoDB**. It supports CRUD operations, search, sorting, pagination, and Swagger-based API documentation.

---

## 🚀 Getting Started

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) & Docker Compose

---

## 📦 Scripts

All scripts are run using `npm run <script-name>`:

| Command          | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| `dev`            | Start the app in development mode and MongoDB via Docker                   |
| `mongo`          | Start only MongoDB container (via `docker-compose.db.yml`)                 |
| `seed`           | Seed the database with sample topic data                                   |
| `reset-db`       | Stop, clear, and restart the MongoDB container                             |
| `dev:seed`       | Reset DB, seed data, and start the app                                     |
| `dev:reset`      | Reset DB and start the app                                                  |
| `build`          | Build the Next.js production bundle                                        |
| `start`          | Start the built production server                                          |
| `lint`           | Run ESLint for code quality checks                                         |

---

## 🗃 MongoDB with Docker

MongoDB is managed using a separate Docker Compose file:  
```bash
docker compose -f docker-compose.db.yml up -d
````

You can reset the database with:

```bash
npm run reset-db
```

---

## 🌱 Seed Data

To populate the database with mock topic data:

```bash
npm run seed
```

Or run everything from scratch:

```bash
npm run dev:seed
```

---

## 📚 API Documentation

Swagger UI is available at:

```
http://localhost:3000/docs
```

The OpenAPI spec file is located at:

```
/public/swagger.yaml
```

---

## 🧪 Features

* ✅ Create, edit, delete tasks
* ✅ Search by title, description, and due date
* ✅ Sort by title, description, due date
* ✅ Pagination with per-page control and go-to page
* ✅ Full API documentation (Swagger/OpenAPI)
* ✅ Responsive, accessible UI

---

## 🖼 Preview

Coming soon...

---

## 🛠 Tech Stack

* Frontend: **Next.js 14** (App Router)
* Backend: **Next API routes**
* Database: **MongoDB (Dockerized)**
* Styles: **Tailwind CSS**
* API Docs: **Swagger UI**

---

## 📂 Folder Structure

```
/app
  /api/topics       → API routes
  /docs             → Swagger UI page
/components         → UI components
/models             → Mongoose schemas
/libs               → DB connection, utilities
/public             → Static files (e.g. swagger.yaml)
```


