# Project Overview

This project is a full-stack application built using modern technologies to demonstrate authentication, note-taking functionality, and secure data handling. While the code is provided for reference and learning purposes, the application is not hosted online. Below, you will find detailed information about the technologies, structure, and setup instructions.

---

## Technologies Used

### Frontend:
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling components.

### Backend:
- **Node.js**: JavaScript runtime for server-side programming.
- **Express.js**: Web application framework for Node.js.
- **MongoDB Atlas**: Cloud-hosted NoSQL database for data persistence.

### Security:
- **JWT (JSON Web Tokens)**: Used for secure user authentication and authorization.
- **bcrypt**: For encrypting user passwords to enhance security.
- **express-rate-limit**: Middleware to prevent abuse by limiting repeated requests.

---

## Features

1. **User Authentication**:
   - User registration and login with encrypted passwords.
   - JWT-based authentication for API access.

2. **Note Management**:
   - Add, edit, delete, and search notes.
   - Securely associate notes with authenticated users.

3. **Database**:
   - MongoDB Atlas is used for storing user and note data.
   - The database connection details are configurable via environment variables.

4. **Security Enhancements**:
   - Password encryption using bcrypt.
   - Token-based authentication with JWT.
   - Rate limiting to mitigate API abuse.

---

## File Structure

- **frontend/**: Contains the React application.
- **backend/**: Contains the Node.js and Express.js server.

---

## Setup Instructions

### Prerequisites:
1. Install **Node.js** and **npm** on your machine.
2. Create a MongoDB Atlas cluster and obtain your connection URI.
3. Generate a secret key for JWT authentication.

### Steps:

1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the backend folder and install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in the `backend` directory with the following contents:
   ```plaintext
   MONGO_URI=<your-mongodb-atlas-connection-string>
   ACCESS_TOKEN_SECRET=<your-jwt-secret>
   ```

4. Start the backend server:
   ```bash
   nodemon index.js
   ```

5. Open a new terminal, navigate to the frontend folder, and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

6. Start the frontend application:
   ```bash
   npm start
   ```

---

## Notes
- Replace `<your-mongodb-atlas-connection-string>` with the URI of your MongoDB Atlas cluster.
- Replace `<your-jwt-secret>` with your unique secret key for signing tokens.
- The application assumes the backend runs on `http://localhost:8000` and the frontend on `http://localhost:3000` by default. Ensure the `axiosInstance` in the frontend is configured accordingly.

---


