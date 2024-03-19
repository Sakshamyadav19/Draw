import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Lobby = ({ socket }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  socket.on("startGame", () => {
    console.log(id);
    navigate("/Home/" + id);
  });

  return <div className=" text-3xl">Waiting....</div>;
};

export default Lobby;
