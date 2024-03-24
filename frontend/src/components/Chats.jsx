import React, { useState } from "react";

const Chats = ({ socket, name, msg }) => {
  const [liveMsg, setLiveMsg] = useState();
  const [correctWord, setCorrectWord] = useState();

  socket.on("receiveMsg", ({ message }) => {
    setLiveMsg(message);
  });
  socket.on("chosenWord", ({ message }) => {
    setCorrectWord(message);
  });
  //   {correctWord == liveMsg ? name + " guessed correctly" : liveMsg}

  return (
    <div className="flex">
      <div>{name + " " + msg}</div>
    </div>
  );
};

export default Chats;
