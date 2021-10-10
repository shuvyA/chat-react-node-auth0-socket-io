const express = require("express");
const app = express();
const http = require("http").createServer(app);
// const cors = require("cors");

const port = 8080;
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A new user has joined the chat");

  // socket.emit("message", "You have successfully joined the chat");

  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
});
http.listen(port, () => console.log(`Server Running`, port));

io.on("disconnect", () => {
  console.log("A user disconnected");
});
