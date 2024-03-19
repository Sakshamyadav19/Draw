export const RoomManager = {
    roomId:null,
    joinRoom(socket, roomId) {
      socket.join(roomId);
      this.roomId=roomId
      
    },
    updateRoomInfo(io, rooms, roomId) {
      rooms[roomId] = [];
      io.to(roomId).fetchSockets().then((sockets) => {
          sockets.forEach((socket) => {
              rooms[roomId].push({ name: socket.data.name, score: 0 });
        });
        io.to(roomId).emit("getRoomInfo", { data: rooms[roomId] });
      });
    },
  
    getSocketRoomId() {
      return this.roomId
    }
  };