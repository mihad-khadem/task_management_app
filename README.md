# 🗂️ Task Management App

A modular and scalable **Task Management System** built with **NestJS**, **Prisma ORM**, **PostgreSQL**, and **Docker** — designed for future expansion including admin and user dashboards.

---

## 🧰 Tech Stack

- ⚙️ **Backend Framework:** [NestJS](https://nestjs.com/)
- 🛢️ **Database:** PostgreSQL (Dockerized)
- 🧬 **ORM:** Prisma
- 🐳 **Containerization:** Docker & Docker Compose
- 🛠️ **Admin UI:** Adminer (DB visualization)
- ✅ **Validation:** class-validator + DTOs
- 🔐 **Planned Auth:** JWT, Role-Based Access Control (RBAC)

---

## 🎯 Future Plans

✅ **Planned Dashboards** (via Next.js or similar):

- **User Dashboard:**
  - View & update personal tasks
  - Track progress across projects
  - Collaborate with team members

- **Admin Dashboard:**
  - Manage all users & projects
  - View analytics and progress summaries
  - Handle deleted/archived content

💡 **Additional further implementations:**

- 🔐 Role-based access: USER / ADMIN
- 🧠 Task timeline / kanban view
- 📊 Dashboard analytics (task load, completion rates)
- 🔔 Notifications for due dates or mentions
- 📎 File attachments (with S3 / Cloudinary)

---

## 📦 Features

- CRUD for **Users**, **Projects**, **Tasks**, **Comments**
- Enums for task **status** and **priority**
- **Soft delete** and **archiving** support
- Prisma-powered relational models
- Adminer for visual DB control
- Fully Dockerized for fast local setup

---

## 📁 Project Structure

```

src/
├── app.module.ts
├── prisma/
│ └── prisma.service.ts
├── user/
├── task/
├── project/
├── comment/
├── common/
│ └── filters/

```

---

## 🐳 Run with Docker

### 1️⃣ Clone & Setup

```bash
git clone https://github.com/mihad-khadem/task_management_app.git
cd task_management_app
```

### 2️⃣ Configure Environment

Create `.env` file:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/taskdb?schema=public
```

### 3️⃣ Launch

```bash
docker-compose up --build
```

### 🔗 Services

| Service    | URL                                            |
| ---------- | ---------------------------------------------- |
| NestJS API | [http://localhost:3000](http://localhost:3000) |
| Adminer UI | [http://localhost:8080](http://localhost:8080) |

> Adminer Login:
>
> - System: `PostgreSQL`
> - Server: `db`
> - Username: `postgres`
> - Password: `postgres`
> - DB: `taskdb`

---

## 📬 API Endpoints

### 🔐 Auth (coming soon)

- `POST /auth/register` — Register new user
- `POST /auth/login` — Authenticate user and receive JWT

---

### 👤 User

- `GET /users` — Get all users
- `GET /users/:id` — Get single user
- `POST /users` — Create user
- `PATCH /users/:id` — Update user
- `DELETE /users/:id` — Soft delete user

---

### 📁 Project

- `GET /projects` — List all projects
- `GET /projects/:id` — Get project details
- `POST /projects` — Create project
- `PATCH /projects/:id` — Update project
- `DELETE /projects/:id` — Soft delete project

---

### ✅ Task

- `GET /tasks` — List all tasks
- `GET /tasks/:id` — Get single task
- `POST /tasks` — Create task
- `PATCH /tasks/:id` — Update task
- `DELETE /tasks/:id` — Soft delete task
- `GET /projects/:projectId/tasks` — Tasks by project (optional)

---

### 💬 Comment

- `POST /comments` — Add a comment to a task
- `GET /comments/task/:taskId` — Get comments for a task
- `DELETE /comments/:id` — (planned) Delete comment

---

## 🧬 Prisma Migrations

```bash
npx prisma generate         # Generate Prisma Client
npx prisma migrate dev      # Apply migrations
npx prisma studio           # Explore DB in browser
```

---

## ✍️ Author

**Mihad Khadem**
📫 [mihadkhadem@gmail.com](mailto:mihadkhadem@gmail.com)
🌐 [Portfolio](https://mihad-khadem.github.io/portfolio.website)
🔗 [LinkedIn](https://www.linkedin.com/in/mihad-khadem-6510b6222/)
💻 [GitHub](https://github.com/mihad-khadem)

---

## 📄 License

[MIT](LICENSE) — free to use and modify.

---

## 🤝 Contributions

Pull requests, issues, and ideas are welcome!
Let’s build this into a full production-ready task suite.

---
