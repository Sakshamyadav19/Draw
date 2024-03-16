import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import io from "socket.io-client";
import Join from "./components/Join";
const socket = io("http://localhost:3000");

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Join socket={socket}/>} />
          <Route path="/home/:id" element={<Home socket={socket}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
