import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  
  socket.on("join-room", (arg, callback) => {
    console.log(socket.id," x ")
    const { name, roomId } = arg.data;
    socket.join(roomId);
    console.log(roomId," ** ")
    socket.to(roomId).emit("welcome", {
      message: "Succes",
    });

    socket.on("drawing", (arg, cb) => {
      socket.to(roomId).emit("drawing", {
        data: arg,
      });
    });
    socket.on("start-drawing", (arg, cb) => {
      socket.to(roomId).emit("start-drawing", {
        data: arg,
      });
    });
    socket.on('stop-drawing',(arg)=>{
      socket.to(roomId).emit("stop-drawing")
    })

    socket.on('draw',()=>{socket.to(roomId).emit('draw')})
    socket.on('erase',()=>{socket.to(roomId).emit('erase')})

  });

  
});

httpServer.listen(3000);
