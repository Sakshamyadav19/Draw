import { RoomManager } from "./roomManagement.js";

export const handleSocketEvents = (io, socket, rooms) => {
  socket.on("join-room", (arg, cb) => {
    const { roomId, name, players } = arg.data;
    socket.data.name = name;
    socket.data.total = players;

    RoomManager.joinRoom(socket, roomId);
    RoomManager.updateRoomInfo(io, rooms, roomId);

    const usersInRoom = io.sockets.adapter.rooms.get(roomId).size;
    io.to(roomId).emit("usersJoined", { data: usersInRoom });

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
    const total = io.sockets.adapter.rooms.get(roomId).size;
    io.to(roomId).emit("getCount", { data: total });
  });

  socket.on("getRoomInfo", () => {
    const roomId = RoomManager.getSocketRoomId();
    socket.to(roomId).emit("getRoomInfo", { data: rooms[roomId] });
  });

  socket.on("drawWord", (arg) => {
    const roomId = RoomManager.getSocketRoomId();
    RoomManager.setWord(arg.data);
    RoomManager.totalRounds--;
    io.to(roomId).emit("chosenWord", { message: arg.data });
    if (RoomManager.totalRounds == -1) io.to(roomId).emit("endGame");
  });

  socket.on("sendChat", (arg) => {
    const chats = RoomManager.addChat(arg.data);
    const roomId = RoomManager.getSocketRoomId();
    RoomManager.updateUserScore(rooms, roomId, arg.data.name, arg.data.chat);
    io.to(roomId).emit("getChat", { message: chats });
    if (RoomManager.word == arg.data.chat)
      io.to(roomId).emit("getRoomInfo", { data: rooms[roomId] });
  });

  socket.on("clearChat", () => {
    const chats = RoomManager.clearChat();
    const roomId = RoomManager.getSocketRoomId();
    io.to(roomId).emit("getChat", { message: chats });
  });

  socket.on("Play", () => {
    const roomId = RoomManager.getSocketRoomId();
    let i = 0;
    const interval = setInterval(() => {
      socket.to(roomId).emit("currentPlayer", { player: i });
      i++;
    }, 10000);
    socket.on('disconnect', () => clearInterval(interval));
  });
};
