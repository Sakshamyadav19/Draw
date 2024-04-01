import React, { useEffect, useState } from "react";
import DrawingBoard from "./DrawingBoard";
import Users from "./Users";
import LiveChat from "./LiveChat";
import Word from "./Word";
import Result from "./Result";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Countdown from "./Countdown";

const Home = ({ socket }) => {
  const [users, setUsers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const userName = useSelector((store) => store.app.name);
  const totalPlayers = useSelector((store) => store.app.totalPlayers);
  const navigate = useNavigate();

  const handleEndGame = () => {
    setEndGame(true);
  };

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
    socket.on("endGame", handleEndGame);

    return () => {
      socket.off("endGame", handleEndGame);
    };
  }, [socket]);

  useEffect(() => {
    if (endGame) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    socket.emit("Play");
  }, []);

  const currentPlayer = users[currentPlayerIndex];

  const renderGameContent = () => {
    if (!currentPlayer) {
      return <p>Loading...</p>;
    }

    return (
      <div className="bg-stone-300 h-screen">
        <Countdown
          changeIndex={() => {
            setCurrentPlayerIndex(prevIndex => (prevIndex + 1) % totalPlayers);
          }}
        />
        <div className="flex items-center justify-center h-16">
          {userName === currentPlayer.name && <Word socket={socket} />}
        </div>
        <div className="flex justify-evenly">
          <div className="h-[450px] w-1/4 flex flex-col justify-evenly">
            {users.map((user) => (
              <Users
                key={user.name}
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
    );
  };

  return endGame ? <Result users={users} /> : renderGameContent();
};

export default Home;
