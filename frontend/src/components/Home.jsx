import React, { useEffect, useState } from "react";
import DrawingBoard from "./DrawingBoard";
import Users from "./Users";
import LiveChat from "./LiveChat";
import { useSelector } from "react-redux";
import Word from "./Word";
import { useNavigate } from "react-router-dom";

const Home = ({ socket }) => {
  const [users, setUsers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const userName = useSelector((store) => store.app.name);
  const navigate = useNavigate()

  socket.on("endGame",()=>{
    navigate("/result");
  })

  useEffect(() => {
    const fetchRoomInfo = () => {
      socket.emit("getRoomInfo");
      socket.on("getRoomInfo", ({ data }) => {
        setUsers(data);
      });
    };

    fetchRoomInfo();

    return () => {
      socket.off("getRoomInfo");
    };
  }, [socket]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % users.length);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [users]);

  const currentPlayer = users[currentPlayerIndex];

  return (
    currentPlayer && (
      <div>
        <div className="flex items-center justify-center">
          {userName == currentPlayer.name ? <Word socket={socket} /> : <></>}
        </div>
        <div className="flex h-screen justify-evenly items-center">
          <div className="h-[450px] w-1/4 flex flex-col justify-evenly">
            {users.map((user) => (
              <Users
                name={user.name}
                score={user.score}
                player={currentPlayer.name}
              />
            ))}
          </div>
          <DrawingBoard
            socket={socket}
            user={userName}
            player={currentPlayer.name}
          />
          <LiveChat
            socket={socket}
            name={userName}
            player={currentPlayer.name}
          />
        </div>
      </div>
    )
  );
};

export default Home;
