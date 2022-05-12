const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000;

const router = require("./router");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

app.use(router);

httpServer.listen(PORT, () => console.log("server satrted on", PORT));
