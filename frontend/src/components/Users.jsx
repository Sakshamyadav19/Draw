import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Users = ({ name, score, player }) => {
  return (
    <div
      className={`flex m-2 border-b-2  bg-zinc-400 rounded-md ${
        player === name ? "border border-black" : ""
      }`}
    >
      <Avatar className="border border-black w-12 h-12 flex justify-center items-center">
        <AvatarFallback className=" bg-blue-300">
          {name[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center items-start w-full px-2">
        <div className="border-b-2">{name}</div>
        {score} Points
      </div>
      <div className="text-3xl">{player === name ? "🖊️" : ""}</div>
    </div>
  );
};

export default Users;
