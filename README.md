# 🌐 Full-Stack MERN Developer Portfolio & Admin Dashboard

Welcome to my completely dynamic, database-driven **MERN Stack Portfolio**. 
What started as a highly polished React.js frontend has now evolved into a complete, production-ready Full-Stack application featuring a dedicated secure Admin Dashboard for Content Management.

This project showcases my ability to architect full-stack solutions, manage databases, handle cloud file storage, design premium user interfaces, and build robust RESTful APIs.

---

## 🌟 The Architecture

This application is composed of three interconnected parts:

1. **The Portfolio Frontend (React + Vite)**: The public-facing website featuring 3D animations, responsive layouts, and dynamic data fetching.
2. **The Backend API (Node.js + Express)**: A highly secure, MVC-patterned API acting as the brain of the application.
3. **The Admin Dashboard (React + Vite)**: A secure, JWT-authenticated portal where I can manage my entire portfolio content without touching a single line of code.

---

## 🚀 Features Highlights

### 🎨 Frontend (The Portfolio)
- **Dynamic Content**: Every text, project, skill, and social link is fetched dynamically from MongoDB.
- **Cloudinary Media**: Images and PDFs (like my CV and certificates) are securely streamed from the cloud.
- **Premium Animations**: Built with Framer Motion, featuring 3D hover effects, typing animations, and scroll reveals.
- **Integrated Contact Form**: Submissions don't just go to my email (via Nodemailer)—they are also securely stored in the database for me to read in the dashboard.

### 🛡️ Backend (The Engine)
- **Strict MVC Architecture**: Clean code separation (Routes, Controllers, Models, Middleware, Utils).
- **Advanced Security**: 
  - JWT (JSON Web Tokens) for authentication.
  - Three layers of Rate Limiting (Global, Auth, Contact).
  - Helmet for HTTP headers & Mongo Sanitize for NoSQL injection prevention.
  - Joi validation & HTML sanitization (XSS protection) for all incoming data.
- **Cloudinary SDK**: Automated image and PDF uploading, overwriting, and deletion.
- **Winston Logging**: Daily rotating logs keeping track of requests and potential errors.

### 🎛️ Admin Dashboard (The Control Room)
- **Dark/Gold Aesthetic**: A beautiful custom dashboard matching the premium feel of the portfolio.
- **Analytics Overview**: Live stats showing total projects, skills, certificates, and unread messages.
- **Complete CRUD Operations**: 
  - Update profile bio, hero text, and titles.
  - Add/Edit/Delete Projects, Skills (with custom SVG injection), and Certificates.
  - Upload & Replace images and PDFs directly to Cloudinary.
  - Read and manage contact form submissions.

---

## 🛠️ Tech Stack & Tools

### **Frontend & Admin Dashboard**
- **React.js** (Vite)
- **Tailwind CSS v4**
- **Framer Motion** (3D Animations)
- **Axios** (API Calls)
- **React Router Dom** (Navigation)
- **React Hot Toast** (Notifications)
- **Lucide React** (Icons)

### **Backend & Database**
- **Node.js & Express.js**
- **MongoDB & Mongoose** (Database & ODM)
- **Cloudinary** (Cloud Media Storage)
- **Nodemailer** (Email Notifications)
- **JSON Web Tokens (JWT)** (Auth)
- **Winston** (Logging)
- **Joi** (Validation)

---

## ⚙️ Running Locally

Because this is a full-stack application, running it requires booting up the different environments.

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas cluster URI
- Cloudinary credentials (Cloud Name, API Key, Secret)
- Gmail App Password (for Nodemailer)

### 2. Environment Variables
Create a `.env` file in the `backend/` directory (see `backend/.env.example` for details).
Create a `.env` file in the `admin-dashboard/` directory containing:
`VITE_API_BASE_URL=http://localhost:5000/api`

### 3. Installation & Database Seeding
Navigate to the backend and install dependencies:
```bash
cd backend
npm install
```
*Initial Setup:* Run the custom seed script to populate the database and upload assets to Cloudinary.
```bash
npm run seed
```

### 4. Booting Up
You will need three terminals:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend Portfolio):**
```bash
# In the root directory
npm install
npm run dev
```

**Terminal 3 (Admin Dashboard):**
```bash
cd admin-dashboard
npm install
npm run dev
```

---

## 📩 Contact & Links

- **Email**: a422789255@gmail.com
- **LinkedIn**: [Ahmad Ayyad](https://www.linkedin.com/in/ahmad-ayyad-608293304/)

⭐ *This portfolio represents my transition from frontend development to full-stack engineering, demonstrating my commitment to building high-quality, production-ready, and scalable architectures.*
