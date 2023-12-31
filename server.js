const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Пользователь подключился");

  socket.on("updateCone", (data) => {

    io.emit("updateCone", data);
  });

  socket.on("disconnect", () => {
    console.log("Пользователь отключился");
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
