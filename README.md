# Blog Platform API & Frontend

A full-stack Blog and Article platform built with the MERN stack. It features role-based access control (RBAC), JWT authentication using HTTP-only cookies, and complete CRUD operations for posts and comments.

## Live Links
- **Frontend (Vercel):** [Insert Vercel Link Here]
- **Backend API (Render):** [Insert Render Link Here]

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Security:** JWT (JSON Web Tokens), bcryptjs, cookie-parser

## Features
- **Role-Based Authentication:** - Readers can read published posts and comment.
  - Writers can create, edit, and delete their own posts.
  - Admins can manage all posts and comments.
- **Security:** JWTs are securely stored in HTTP-only cookies.
- **Search & Pagination:** API supports fetching published posts with query parameters (`?page=1&limit=10&search=keyword`).
- **Comments System:** Authenticated users can leave comments; authors/admins can delete them.

## Local Setup Instructions

### 1. Backend Setup
\`\`\`bash
cd blog-backend
npm install
\`\`\`
Create a `.env` file in the root of the backend folder:
\`\`\`env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
\`\`\`
Start the server:
\`\`\`bash
npm run dev
\`\`\`

### 2. Frontend Setup
\`\`\`bash
cd blog-frontend
npm install
\`\`\`
Start the Vite development server:
\`\`\`bash
npm run dev
\`\`\`

## API Endpoints

### Auth Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive HTTP-only cookie

### Post Routes
- `GET /api/posts` - Get published posts (Supports `?page`, `?limit`, `?search`)
- `POST /api/posts` - Create a post (Writer/Admin)
- `PUT /api/posts/:id` - Edit a post (Author/Admin)
- `DELETE /api/posts/:id` - Delete a post (Author/Admin)

### Comment Routes
- `POST /api/comments/:postId` - Add a comment (Authenticated users)
- `DELETE /api/comments/:commentId` - Delete a comment (Author/Admin)