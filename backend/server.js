const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const socketio = require("socket.io");
const authRoutes = require("./routes/auth");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cors()); // This enables CORS for all routes
app.use("/api/auth", authRoutes);

// Configure Socket.io with CORS
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000", // Allow only this origin to connect
    methods: ["GET", "POST"], // Allow these HTTP methods
    credentials: true, // Allow credentials (e.g., cookies)
  },
});

io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  // Handle events here
  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room);
    io.to(room).emit("message", `${username} has joined the room`);
  });

  socket.on("chatMessage", (msg) => {
    io.to(msg.room).emit("message", msg.message);
  });

  socket.on("disconnect", (msg) => {
    io.to(msg.room).emit("message", "A user has left the chat");
  });
});

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/chatapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
