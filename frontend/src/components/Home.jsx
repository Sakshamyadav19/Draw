import React, { useEffect, useState } from "react";
import DrawingBoard from "./DrawingBoard";
import Users from "./Users";
import LiveChat from "./LiveChat";

const Home = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit("getRoomInfo");
    socket.on("getRoomInfo", ({ data }) => {
      console.log(data);
      setUsers(data);
    });
  }, []);

  return (
    <div className="flex h-screen justify-evenly items-center">
      <div className="h-[450px] w-1/4 flex flex-col justify-evenly">
        {users.map((user) => (
          <Users name={user.name} score={user.score} />
        ))}
      </div>
      <DrawingBoard socket={socket} />
      <LiveChat socket={socket} />
    </div>
  );
};

export default Home;
