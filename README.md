# Frontend Developer Task - Full Stack Application

This is a full-stack application built with the MERN stack (MongoDB, Express, React, Node.js) featuring authentication, user profiles, and a task management system.

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt
- **Frontend**: React, Vite, TailwindCSS, Axios, React Router, Lucide React

## Features

- **Authentication**: Register and Login with JWT.
- **Protected Routes**: Dashboard and Profile pages are protected.
- **Dashboard**: View, Create, Edit, Delete, Search, and Filter tasks.
- **Profile**: View and Update user profile.
- **UI/UX**: Responsive design, modern components, loading states, and error handling.

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running (or use MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp ../.env.example .env
   ```
   Update `MONGO_URI` if needed.
4. Start the server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173`.

## API Endpoints

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login user and get token.
- **GET /api/auth/user**: Get current user data.
- **GET /api/profile/me**: Get current user profile.
- **PUT /api/profile**: Update user profile.
- **GET /api/tasks**: Get all tasks (supports `search` and `status` query params).
- **POST /api/tasks**: Create a new task.
- **PUT /api/tasks/:id**: Update a task.
- **DELETE /api/tasks/:id**: Delete a task.

## Scaling Explanation

To scale this application:
- **Backend**: Implement horizontal scaling using a load balancer (e.g., Nginx) and run multiple instances of the Node.js server (using PM2 or Docker).
- **Database**: Use MongoDB sharding and replication for high availability and performance. Index frequently queried fields (like `user` and `status` in Tasks).
- **Frontend**: Optimize build with code splitting, lazy loading, and CDN for static assets.
- **Caching**: Implement Redis for caching frequently accessed data (like user profiles).

## License

MIT
