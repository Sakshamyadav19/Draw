import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";



const Join = ({socket}) => {
  const input = useRef();
  const userName = useRef();
  const [players, setPlayers] = useState();
  const navigate = useNavigate();

  const joinRoom = () => {
    const id = input.current.value;
    console.log(typeof id)
    console.log(typeof socket.id)
    socket.emit(
      "join-room",
      { data: { name: userName.current.value, roomId: id } },
      (res) => {
        console.log(res);
      }
      );
      navigate("/home/"+id);
  };

  const createRoom=()=>{
    socket.emit(
      "join-room",
      { data: { name: userName.current.value, roomId: socket.id } },
      (res) => {
        console.log(res);
      }
      );
      navigate("/home/"+socket.id);
  }

  const handleOption = (e) => {
    setPlayers(e.target.value);
    console.log(players);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-600 text-white">
      <div className="p-5 border border-black w-1/3 h-1/4 ">
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Enter Name"
            ref={userName}
            className=" bg-transparent border border-black px-2 my-2 rounded-md w-3/4"
          />
        </div>
        <div className="flex justify-between mb-4">
          <input
            ref={input}
            className="border border-black w-3/2 bg-transparent px-2 rounded-md"
            placeholder="Enter RoomId"
          ></input>
          <button
            onClick={() => {
              joinRoom();
            }}
            className="border border-black w-1/3 rounded-md"
          >
            Join
          </button>
        </div>
        <div className="flex justify-between">
          <div>
            <span className="pr-2">Players:</span>
            <input
              type="radio"
              id="option1"
              name="options"
              value="2"
              onChange={handleOption}
            />
            <label htmlFor="option1" className="pr-2">
              2
            </label>
            <input
              type="radio"
              id="option2"
              name="options"
              value="3"
              onChange={handleOption}
            />
            <label htmlFor="option2" className="pr-2">
              3
            </label>
            <input
              type="radio"
              id="option3"
              name="options"
              value="4"
              onChange={handleOption}
            />
            <label htmlFor="option3">4</label>
          </div>
          <button onClick={createRoom} className="w-1/3 border border-black rounded-md">
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Join;
