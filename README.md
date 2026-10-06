
<div align="center">

# 🎓 Exam App

**A full-featured online exam platform for Elevate Bootcamp students and admins.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-black?style=for-the-badge&logo=vercel)](https://YOUR-APP.vercel.app)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

![Exam App Preview](./screenshots/hero.jpg)

</div>

---

## ✨ Overview

Exam App digitizes the assessment workflow of a bootcamp. Students sign up, pick a **Diploma** (learning track), take timed **Exams**, and get an instant result with per-question analytics. Admins manage diplomas and exams from a dedicated dark-themed dashboard.

## 🚀 Live Demo

🔗 **https://YOUR-APP.vercel.app**

## 👥 Two Experiences

### 🧑‍🎓 Student
- Multi-step registration (Email → OTP → Info → Password)
- Login, forgot / reset password
- Browse diplomas and exams with infinite scroll
- Take an exam question-by-question with a **countdown timer** and **auto-submit**
- Result page with a **score donut chart** and selected-vs-correct answer review
- Profile, change email (OTP), change password

### 🛠️ Admin Dashboard
> ⚠️ The dashboard is only visible to admin accounts. Use the demo account below to explore it.

**Demo admin account**

| Field | Value |
|---|---|
| Username | `elevateadmin` |
| Password | `Elevate@123` |

- Paginated, searchable, filterable, sortable **diplomas table**
- Full CRUD: add (with image upload), view, edit, delete
- Exams management table with filters and delete

![Admin Dashboard](./screenshots/admin-dashboard.png)

## 📸 Screenshots

| Login | Diplomas | Exam |
|---|---|---|
| ![Login](./screenshots/login.png) | ![Diplomas](./screenshots/diplomas.png) | ![Exam](./screenshots/exam.png) |

| Result | Admin Table | Add Diploma |
|---|---|---|
| ![Result](./screenshots/result.png) | ![Admin](./screenshots/admin-table.png) | ![Add](./screenshots/add-diploma.png) |

## 🧰 Tech Stack

| Layer | Tools |
|---|---|
| UI | React 19, TypeScript, Tailwind CSS 4, Base UI (shadcn-style kit) |
| Routing | React Router 7 |
| Server state | TanStack Query 5, Axios |
| Forms | React Hook Form, Zod |
| Tooling | Vite 8, oxlint |

## 📂 Project Structure

```
src/
├── components/ui/     # reusable UI kit
├── features/          # auth, diploma, exam, question, submission, upload, user, admin-dashboard
├── shared/            # axios instance, utils, shared components
└── stores/            # wizard step contexts
```

## ⚙️ Getting Started

```bash
git clone https://github.com/YOUR-USERNAME/exam-app.git
cd exam-app
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:5173

### Environment variables

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend API origin |

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint with oxlint |

## 👩‍💻 Author

**Your Name** · [LinkedIn](https://linkedin.com/in/YOUR-PROFILE) · [GitHub](https://github.com/YOUR-USERNAME)