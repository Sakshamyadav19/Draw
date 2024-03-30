import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { handleSocketEvents } from "./socketEvents.js";

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
const rooms = {};

io.on("connection", (socket) => {
  handleSocketEvents(io, socket, rooms);
});

httpServer.listen(3000);
