import React, { useEffect, useState } from "react";

const Countdown = ({ changeIndex }) => {
  const [count, setCount] = useState(60);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 0) {
          changeIndex();
          // Restart countdown when it reaches 0
          return 60;
        } else {
          return prevCount - 1;
        }
      });
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <div className="text-4xl font-bold text-red-500 flex justify-end px-4">
      {count === 0 ? "Time's Up!" : count}
    </div>
  );
};

export default Countdown;
