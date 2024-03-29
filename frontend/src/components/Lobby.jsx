import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const Lobby = ({ socket }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [usersCount, setUsersCount] = useState();
  const players = useSelector((store) => store.app.totalPlayers);
  console.log(players);

  socket.on("usersJoined", ({ data }) => {
    console.log(data);
    setUsersCount(data);
  });

  socket.on("startGame", () => {
    navigate("/Home/" + id);
  });

  return (
    <div className=" text-3xl">
      <Progress value={(usersCount * 100) / players} />
    </div>
  );
};

export default Lobby;
