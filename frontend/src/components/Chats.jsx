import React, { useState } from "react";

const Chats = ({ socket, name, msg, correctWord }) => {

  return (
    <div className="flex p-1">
      <div className="px-2">
        {correctWord == msg ? name + " guessed correctly" : name + " " + msg}
      </div>
    </div>
  );
};

export default Chats;
