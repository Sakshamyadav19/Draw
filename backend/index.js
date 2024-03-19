import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { handleSocketEvents } from "./socketEvents.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const rooms = {};

io.on("connection", (socket) => {
  handleSocketEvents(io, socket, rooms);
});

httpServer.listen(3000);
