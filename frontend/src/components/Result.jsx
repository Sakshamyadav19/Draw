import React from "react";
import ResultCard from "./ResultCard";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Result = ({ users }) => {
  // Sort users by score
  users.sort((a, b) => b.score - a.score);
  const navigate = useNavigate();

  return (
    users && (
      <div className=" bg-stone-300 ">
        <div className="flex justify-between p-2">
          <div className="font-bold text-4xl mb-5 ">Result</div>
          <Button className="flex justify-center" onClick={()=>{navigate("/")}}>New Game</Button>
        </div>
        <div className="flex justify-center items-center h-screen flex-col">
          <div className="w-1/3">
            {users.map((user, index) => (
              <ResultCard key={index} score={user.score} name={user.name} />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Result;
