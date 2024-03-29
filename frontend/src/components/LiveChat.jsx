import React, { useEffect, useRef, useState } from "react";
import Chats from "./Chats";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

const LiveChat = ({ socket, name, player }) => {
  const [chats, setChats] = useState([]);
  const [correctWord, setCorrectWord] = useState();
  const [answered,setAnswered] = useState(false);
  const message = useRef();

  socket.on("getChat", ({ message }) => {
    setChats(message);
  });

  socket.on("chosenWord", ({ message }) => {
    setCorrectWord(message);
  });

  useEffect(() => {
    socket.emit("clearChat");
    setAnswered(false)
  }, [player]);

  return (
    <div className="w-1/4 h-[450px] border border-black rounded-md">
      <div className="border border-gray-100 w-full h-full overflow-auto flex flex-col-reverse">
        {chats.map((chat) => (
          <Chats
            socket={socket}
            msg={chat.chat}
            name={chat.name}
            correctWord={correctWord}
            toggleState={()=>{setAnswered(true)}}
          />
        ))}
      </div>
      <div className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            socket.emit("sendChat", {
              data: { name: name, chat: message.current.value },
            });
            message.current.value = "";
          }}
        >
          <div className="flex justify-between">
            <Input
              ref={message}
              placeholder="Guess..."
              disabled={player === name || answered }
              className="border border-black w-3/4 bg-transparent"
            />
            <Button className=" text-center w-1/5 bg-blue-500">Send</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LiveChat;
