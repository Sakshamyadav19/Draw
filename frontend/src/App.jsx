import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import io from "socket.io-client";
import Join from "./components/Join";
import Lobby from "./components/Lobby";
const socket = io("https://determined-highfalutin-ornament.glitch.me/");

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Join socket={socket} />} />
          <Route path="/home/:id" element={<Home socket={socket} />} />
          <Route path="/lobby/:id" element={<Lobby socket={socket} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
