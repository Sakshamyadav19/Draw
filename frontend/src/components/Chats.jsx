import { Separator } from "./ui/separator";
import React, { useState } from "react";

const Chats = ({ toggleState, name, msg, correctWord }) => {
  if (!msg) return;
  if (correctWord == msg) {
    toggleState();
  }
  return (
    <div className="p-1">
      <div className="px-2">
        {correctWord == msg ? (
          <span className=" text-green-500">{name + " guessed correctly"}</span>
        ) : (
          <div className="flex h-7 ">
            <span>{name}</span>
            <Separator className="mx-2" orientation="vertical" />
            <span>{" " + msg}</span>
          </div>
        )}
        <Separator className="my-2" />
      </div>
    </div>
  );
};

export default Chats;
