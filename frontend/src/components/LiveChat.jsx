import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChat, clearChat } from "../../utils/appSlice";
import Chats from "./Chats";

const LiveChat = ({ socket, name, player }) => {
  const message = useRef();
  const dispatch = useDispatch();
  const chats = useSelector((store) => store.app.chats);

  useEffect(() => {
    dispatch(clearChat());
  }, [player]);

  return (
    <div className="w-1/4 h-[450px] border border-black">
      <div className="border border-gray-100 w-full h-full">
        {chats.map((chat)=><Chats socket={socket} msg={chat} name={name}/>)}
        </div>
      <div className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            socket.emit("sendMsg", { data: message.current.value });
            dispatch(addChat(message.current.value));
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
