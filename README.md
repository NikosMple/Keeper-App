# 🚀 Project Overview  

Welcome to this full-stack application showcasing modern technologies for authentication, note-taking, and learning. Below, you'll find everything you need to get started!  

---

## 🛠️ Technologies Used  

### 🌐 Frontend:  
- ⚛️ **React**: A JavaScript library for building interactive user interfaces.  
- 🎨 **Tailwind CSS**: A utility-first CSS framework for sleek and responsive designs.  

### 🖥️ Backend:  
- 🟢 **Node.js**: JavaScript runtime for building scalable server-side applications.  
- ⚡ **Express.js**: Lightweight and flexible web application framework.  
- ☁️ **MongoDB Atlas**: Cloud-hosted NoSQL database for secure data storage.  

### 🔒 Security:  
- 🛡️ **JWT (JSON Web Tokens)**: For secure user authentication and authorization.  
- 🔑 **bcrypt**: Ensures encrypted storage of user passwords.  
- 🚦 **express-rate-limit**: Protects APIs by limiting repeated requests.  

---

## 🌟 Features  

### 👥 **User Authentication**:  
- Secure user registration and login with encrypted passwords.  
- Token-based API access using JWT for enhanced security.  

### 📝 **Note Management**:  
- Add, edit, delete, and search notes.  
- Each note is securely associated with the authenticated user.  

### 🗄️ **Database Integration**:  
- Data persistence powered by MongoDB Atlas.  
- Easily configurable connection details using environment variables.  

### 🛡️ **Enhanced Security**:  
- Password encryption with bcrypt.  
- Secure JWT-based authentication.  
- API abuse prevention through rate limiting.  

---

## 🗂️ File Structure  

- **frontend/**: Contains the React application.  
- **backend/**: Contains the Node.js and Express.js server.  

---

## ⚙️ Setup Instructions  

### 🧰 Prerequisites:  
1. Install **Node.js** and **npm** on your machine.  
2. Create a MongoDB Atlas cluster and obtain your connection URI.  
3. Generate a secret key for JWT authentication.  

### 🛠️ Steps:  

1. Clone the repository to your local machine:  
   ```bash  
   git clone <repository-url>
   
2. Navigate to the backend folder and install dependencies:
   ```bash  
   cd backend  
   npm install

3. Create a .env file in the backend directory with the following contents:
   ```bash
   MONGO_URI=<your-mongodb-atlas-connection-string>  
   ACCESS_TOKEN_SECRET=<your-jwt-secret>

4. Start the backend server:
   ```bash
   nodemon index.js

5. Open a new terminal, navigate to the frontend folder, and install dependencies:
   ```bash
   cd frontend  
   npm install
   
6. Start the frontend application:
   ```bash
   npm start
   ```
---

***💡 Notes***
- Replace <your-mongodb-atlas-connection-string> with the URI of your MongoDB Atlas cluster.
- Replace <your-jwt-secret> with your unique secret key for signing tokens.
- The application assumes the Backend runs on http://localhost:8000 and the Frontend on http://localhost:3000 by default. Ensure the axiosInstance in the frontend is configured accordingly.


📜 License
This project is licensed for personal and educational use only. Contributions and pull requests are welcome!


