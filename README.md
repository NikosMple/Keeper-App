#!/bin/bash

# Project setup script
echo "🚀 Starting project setup..."

# Step 1: Clone the repository
echo "📂 Cloning the repository..."
git clone <repository-url>
cd <repository-folder> || exit

# Step 2: Backend setup
echo "🔧 Setting up the backend..."
cd backend || exit
npm install

# Create .env file
echo "📝 Creating .env file for backend..."
cat <<EOL > .env
MONGO_URI=<your-mongodb-atlas-connection-string>
ACCESS_TOKEN_SECRET=<your-jwt-secret>
EOL

# Start backend server
echo "🚀 Starting the backend server..."
npx nodemon index.js &
BACKEND_PID=$!
echo "✅ Backend running with PID $BACKEND_PID"

# Step 3: Frontend setup
echo "🌟 Setting up the frontend..."
cd ../frontend || exit
npm install

# Start frontend application
echo "🚀 Starting the frontend application..."
npm start &
FRONTEND_PID=$!
echo "✅ Frontend running with PID $FRONTEND_PID"

# Completion message
echo "🎉 Project setup is complete!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"

# Keep script running to allow background processes
read -p "Press [Enter] to stop the servers..."
kill $BACKEND_PID $FRONTEND_PID
echo "🛑 Servers stopped. Exiting setup."
