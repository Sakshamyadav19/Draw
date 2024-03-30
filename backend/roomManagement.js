export const RoomManager = {
  roomId: null,
  totalRounds: null,
  chats: null,
  points: null,
  word: null,

  joinRoom(socket, roomId) {
    socket.join(roomId);
    this.totalRounds=10
    this.roomId = roomId;
    this.chats = [];
    this.points = 300;
  },
  updateRoomInfo(io, rooms, roomId) {
    rooms[roomId] = [];
    io.to(roomId)
      .fetchSockets()
      .then((sockets) => {
        sockets.forEach((socket) => {
          rooms[roomId].push({ name: socket.data.name, score: 0,total:socket.data.total });
        });
        io.to(roomId).emit("getRoomInfo", { data: rooms[roomId] });
      });
  },

  updateUserScore(rooms, roomId, user, guessed) {
    if (this.word != guessed) return;
    const index = rooms[roomId].findIndex((obj) => obj.name === user);
    rooms[roomId][index].score += this.points;
    this.points = this.points / 2;
  },

  addChat(chat) {
    this.chats.unshift(chat);
    return this.chats;
  },

  clearChat() {
    this.chats = [];
    return this.chats;
  },

  setWord(word) {
    this.word = word;
    this.points = 300;
  },

  getSocketRoomId() {
    return this.roomId;
  },
};
