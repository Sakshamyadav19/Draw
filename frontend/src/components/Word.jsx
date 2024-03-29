import React, { useEffect, useState } from "react";
import { pictionaryWords } from "../../utils/words";

const Word = ({ socket }) => {
  const [wordToDraw, setWordToDraw] = useState();

  const getRandomWord = (arr) => {
    const index = Math.floor(Math.random() * arr.length);
    socket.emit("drawWord", { data: arr[index] });
    setWordToDraw(arr[index]);
  };
  useEffect(() => {
    getRandomWord(pictionaryWords);
  }, []);

  return (
    <div className="border border-black px-4 font-bold py-2 rounded-md bg-black text-white">
      {wordToDraw}
    </div>
  );
};

export default Word;
