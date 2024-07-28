const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
mongoose
  .connect("mongodb://localhost:27017/real-time-chat-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());

// Socket.io connection
io.on("connection", (socket) => {
  console.log("New WebSocket connection");
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
