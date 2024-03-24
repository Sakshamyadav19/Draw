import React, { useEffect, useState } from "react";
import { pictionaryWords } from "../../utils/words";

const Word = ({ socket }) => {
  const [wordToDraw, setWordToDraw] = useState();

  const getRandomWord = (arr) => {
    const index = Math.floor(Math.random() * arr.length);
    setWordToDraw(arr[index]);
  };
  useEffect(() => {
    getRandomWord(pictionaryWords);
  }, [socket]);

  useEffect(()=>{
    socket.emit("drawWord", { data: wordToDraw });
  },[wordToDraw])


  return (
    <div className="border border-black px-4 font-bold py-2">{wordToDraw}</div>
  );
};

export default Word;
