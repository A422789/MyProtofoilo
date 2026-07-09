# Portfolio Backend API

A complete MERN stack backend built with Express.js, MongoDB Atlas, and Cloudinary. It serves the public data for the portfolio frontend and provides a secure, JWT-authenticated API for the React Admin Dashboard.

## Features

- **MVC Architecture**: Clean separation of routes, controllers, and models.
- **MongoDB Atlas Integration**: Advanced schemas for Profile, Projects, Skills, Certificates, Social Links, and Contact Submissions.
- **Cloudinary Media Management**: Full CRUD operations for images and PDF files (upload, replace, delete).
- **Security Best Practices**: 
  - JWT Authentication for all admin routes
  - Rate limiting (general, login, contact form)
  - Helmet for secure HTTP headers
  - CORS configured for frontend/admin origins
  - express-mongo-sanitize for NoSQL injection prevention
  - Joi validation & XSS sanitization (sanitize-html) for all incoming data
- **Email Notifications**: Integrated Nodemailer for sending contact form submissions directly to your email.
- **Winston Logging**: Daily rotating file logs for requests, errors, and security events.

## Getting Started

### 1. Prerequisites

- Node.js (v18+)
- MongoDB Atlas account (with a cluster connection string)
- Cloudinary account (Cloud Name, API Key, API Secret)
- (Optional) Gmail App Password for email notifications

### 2. Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### 3. Environment Variables

Create a `.env` file in the root of the `backend/` directory. Use the provided `.env.example` as a reference.

```env
# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001

# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# JWT Auth
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1d

# Admin Credentials (Used by the seed script to create your login)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_123

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Notifications (Optional - Nodemailer)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=YOUR_GMAIL_APP_PASSWORD_HERE
EMAIL_TO=your-email@gmail.com
```

### 4. Running the Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

## Available Scripts

- `npm start`: Runs the server in production mode
- `npm run dev`: Runs the server using nodemon for development

## Next Steps

1. Start this backend server (`npm run dev`).
2. Start the Frontend portfolio (`npm run dev` in the root).
3. Start the Admin Dashboard (`npm run dev` in the `admin-dashboard/` folder).
4. Login to the admin dashboard using the credentials you defined in the `.env` file!
