const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const router = require("./router");

const app = express();

app.use(router);
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }) => {
    console.log(name, room);
  });
});

httpServer.listen(5000, () => {
  console.log("Sever has started");
});
