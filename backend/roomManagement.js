export const RoomManager = {
    roomId:null,
    totalRounds:4,
    currentRound:null,
    currentPlayer:null,
    joinRoom(socket, roomId) {
      socket.join(roomId);
      this.roomId=roomId
      this.currentRound=0;
      this.currentPlayer=0;
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

    updateUserScore(rooms,roomId,user,points){
      rooms[roomId][user].score+=points
    },
    
    getCurrentPlayer(rooms,roomId){
      const currentIndex=this.currentPlayer%4;
      this.currentPlayer++;
      return rooms[roomId][currentIndex];
    },

    getSocketRoomId() {
      return this.roomId
    }
  };