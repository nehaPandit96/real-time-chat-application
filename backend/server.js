const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const socketio = require("socket.io");
const authRoutes = require("./routes/auth");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();
const server = http.createServer(app);

// Middleware
// Session middleware configuration
app.use(
  session({
    secret:
      "824a6f9e5be9a596077c36e28a5fe095396aa4be02ca2a154f8515f1dbd4cc8d37b6dec8669e75fc7aaeb0e1d29c6365053ea6e6ae7c06cab5918083ce2862c8",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/chatapp",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
      sameSite: "lax",
      // secure: process.env.NODE_ENV === "production", // Ensures cookies are sent over HTTPS
    },
  })
);
app.use(express.json());
app.use(cors()); // This enables CORS for all routes
app.use("/api/auth", authRoutes);

// Configure Socket.io with CORS
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
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
