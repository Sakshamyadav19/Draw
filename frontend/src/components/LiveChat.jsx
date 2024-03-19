import React, { useRef, useState } from "react";

const LiveChat = ({ socket }) => {
  const message = useRef();
  const [liveMsg, setLiveMsg] = useState();

  socket.on("receiveMsg", ({ message }) => {
    console.log(message);
    setLiveMsg(message);
  });

  return (
    <div className="w-1/4 h-[450px] border border-black">
      <div className="border border-gray-100 w-full h-full">{liveMsg}</div>
      <div className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            socket.emit("sendMsg", { data: message.current.value });
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
