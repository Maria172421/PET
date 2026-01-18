# Personal Expense Tracker – Full Stack App

A mini full-stack expense tracking application that allows users to sign up, log in, add expenses, view recent expenses, and delete them securely.

This project was built as part of a full-stack technical assignment.

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router
- Supabase Auth (Email & Password)

### Backend
- Node.js
- Express.js

### Database
- Supabase (PostgreSQL)

---

## ✨ Features

- User authentication (Sign up / Login)
- Protected routes (Expenses page accessible only after login)
- Add expenses (amount, category, date, optional notes)
- View latest 20 expenses (most recent first)
- Delete expenses
- User-specific data isolation using Row Level Security (RLS)

---

## 📁 Project Structure

root
├── frontend
│ ├── src
│ └── package.json
├── backend
│ ├── routes
│ ├── index.js
│ └── package.json


---

## 🚀 Running the Project Locally

1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd <repo-folder>

2️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Create a .env file inside frontend/:

VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key


Frontend runs on:

http://localhost:5173

3️⃣ Backend Setup
cd backend
npm install
node index.js


Create a .env file inside backend/:

SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_supabase_service_key


Backend runs on:

http://localhost:3000

🗄 Supabase Setup
Table: expenses

| Column       | Type      | Description               |
| ------------ | --------- | ------------------------- |
| id           | uuid      | Primary key               |
| user_id      | uuid      | References auth.users(id) |
| amount       | numeric   | Expense amount            |
| category     | text      | Expense category          |
| expense_date | date      | Date of expense           |
| notes        | text      | Optional notes            |
| created_at   | timestamp | Auto-generated            |

🔐 Authentication & Security

Supabase Auth (Email + Password) is used for authentication.

Each expense row stores the authenticated user's user_id.

Row Level Security (RLS) policies ensure:

Users can only read their own expenses

Users can only insert expenses with their own user_id

Users can only delete their own expenses

RLS Policy Example
auth.uid() = user_id

🔑 JWT Validation

Supabase automatically issues JWTs upon authentication.

The frontend uses the Supabase client which sends JWTs securely.

Backend endpoints validate the JWT using Supabase service role key.

User identity is derived from the token and never trusted from client input.

📝 Notes / Assumptions

UI focuses on clarity and usability rather than pixel-perfect design.

Only the latest 20 expenses are shown as per requirements.

Category values are predefined for simplicity.

Email verification is handled by Supabase.

✅ Status

All mandatory requirements from the task description have been implemented.


---

## ✅ 2️⃣ `.env.example` (VERY IMPORTANT)

Create this file in **both frontend and backend folders**.

### frontend/.env.example
```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

backend/.env.example
SUPABASE_URL=
SUPABASE_SERVICE_KEY=


⚠️ Do NOT commit real .env files.

