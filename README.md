# Real-Time Chat Application

## Introduction

Welcome to the Real-Time Chat Application repository! This application is designed to facilitate seamless real-time communication through chat rooms. Built with modern technologies, it offers a secure and interactive environment for users to connect and chat live.

## Key Technologies

- Frontend: React.js, Axios, React Router
- Backend: Express.js, Node.js, Socket.io
- Database: MongoDB
- Session Management: Express-session, JSON Web Tokens (JWT)
- Deployment: Heroku, Docker (optional)

## Features

- User Registration and Authentication: Secure sign-up and login with session management.
- Real-Time Messaging: Instant chat functionality using Socket.io.
- Dynamic Chat Rooms: Join and create chat rooms to interact with others.
- Responsive Design: Optimized for both desktop and mobile devices.

## Getting Started

Follow these steps to set up and run the Real-Time Chat Application on your local machine.

## Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm (or Yarn)

## Installation

- Clone the Repository

```bash
git clone https://github.com/yourusername/chat-application.git
cd chat-application
```

- Install Dependencies
  Backend

```bash
cd backend
npm install
```

Frontend

```bash
cd frontend
npm install
```

- Set Up Environment Variables
  Create a .env file in the backend directory:

```bash
MONGO_URI=mongodb://localhost:27017/chatapp
SESSION_SECRET=your-session-secret
```

- Start the Application
  Backend

```bash
cd backend
npm start
```

Frontend

```bash
cd frontend
npm start
```

Access the frontend at [http://localhost:3000] http://localhost:3000 and the backend at [http://localhost:4000] http://localhost:4000.

## How to Use

- Register: Navigate to /register to create a new user account.
- Log In: Access the login page to authenticate and gain access to the chat application.
- Join Chat Rooms: Once logged in, go to /chat to join or create chat rooms and start chatting.
