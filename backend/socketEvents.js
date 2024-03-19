import { RoomManager } from "./roomManagement.js";

export const handleSocketEvents = (io, socket, rooms) => {
  socket.on("join-room", (arg, cb) => {
    const { roomId, name,players } = arg.data;
    console.log(roomId, " x ", name,"-",players);
    socket.data.name=name

    RoomManager.joinRoom(socket, roomId);
    RoomManager.updateRoomInfo(io, rooms, roomId);

    const usersInRoom = io.sockets.adapter.rooms.get(roomId).size;
    if (usersInRoom == 2) {
      io.to(roomId).emit("startGame");
    }
    socket.on("start-drawing", (arg) => {
      socket.to(roomId).emit("start-drawing", { data: arg });
    });

    socket.on("drawing", (arg) => {
      io.to(roomId).emit("drawing", { data: arg });
    });

    socket.on("stop-drawing", () => {
      socket.to(roomId).emit("stop-drawing");
    });

    socket.on("draw", () => {
      socket.to(roomId).emit("draw");
    });

    socket.on("erase", () => {
      socket.to(roomId).emit("erase");
    });
  });

  socket.on("getCount", () => {
    const roomId = RoomManager.getSocketRoomId();
    console.log(roomId);
    const total = io.sockets.adapter.rooms.get(roomId).size;
    io.to(roomId).emit("getCount", { data: total });
  });

  socket.on("getRoomInfo", () => {
    const roomId = RoomManager.getSocketRoomId();
    socket.to(roomId).emit("getRoomInfo", { data: rooms[roomId] });
  });

  socket.on("sendMsg",(arg)=>{
    const roomId = RoomManager.getSocketRoomId();
    console.log(arg.data,"*******")
    io.to(roomId).emit("receiveMsg",{message:arg.data})
  })
};
