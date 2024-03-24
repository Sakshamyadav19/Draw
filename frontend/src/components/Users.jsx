import React from "react";

const Users = ({ name, score, player }) => {
  return (
    <div
      className={`flex m-2 border-b-2 ${
        player === name ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <div className="border border-black rounded-full w-12 h-12 flex justify-center items-center">
        {name[0].toUpperCase()}
      </div>
      <div className="flex flex-col justify-center items-start w-full px-2">
        <div className="border-b-2">{name}</div>
        {score} Points
      </div>
    </div>
  );
};

export default Users;
