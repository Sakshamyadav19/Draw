import React, { useEffect, useRef, useState } from "react";
import Chats from "./Chats";

const LiveChat = ({ socket, name, player }) => {
  const [chats, setChats] = useState([]);
  const [correctWord, setCorrectWord] = useState();
  const message = useRef();

  socket.on("getChat", ({ message }) => {
    setChats(message);
  });


  socket.on("chosenWord", ({ message }) => {
    setCorrectWord(message);
  });

  useEffect(() => {
    socket.emit("clearChat");
  }, [player]);

  return (
    <div className="w-1/4 h-[450px] border border-black">
      <div className="border border-gray-100 w-full h-full">
        {chats.map((chat) => (
          <Chats socket={socket} msg={chat.chat} name={chat.name} correctWord={correctWord}/>
        ))}
      </div>
      <div className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            socket.emit("sendChat", {
              data: { name: name, chat: message.current.value },
            });
          }}
        >
          <input ref={message} className="border border-black w-3/4"></input>
          <button className="border border-black text-center w-1/4 bg-blue-500">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default LiveChat;
