import React, { useEffect, useRef, useState } from "react";

const DrawingBoard = ({ socket }) => {
  const canva = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const ctx = useRef(null);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctx.current.beginPath();
    ctx.current.moveTo(offsetX, offsetY);
    ctx.current.lineTo(offsetX, offsetY);
    ctx.current.stroke();
    setDrawing(true);
    socket.emit("start-drawing", { x: offsetX, y: offsetY });
    nativeEvent.preventDefault();
  };

  const stopDrawing = () => {
    ctx.current.closePath();
    setDrawing(false);
    socket.emit("stop-drawing");
  };

  const draw = ({ nativeEvent }) => {
    if (!drawing) return;
    const { offsetX, offsetY } = nativeEvent;
    ctx.current.lineTo(offsetX, offsetY);
    ctx.current.stroke();
    socket.emit("drawing", { x: offsetX, y: offsetY });
    nativeEvent.preventDefault();
  };

  const setToDraw = () => {
    ctx.current.lineWidth = 5;
    ctx.current.globalCompositeOperation = "source-over";
    socket.emit("draw");
  };
  const setToErase = () => {
    ctx.current.lineWidth = 50;
    ctx.current.globalCompositeOperation = "destination-out";
    socket.emit("erase");
  };

  socket.on("erase", () => {
    ctx.current.lineWidth = 50;
    ctx.current.globalCompositeOperation = "destination-out";
  });
  socket.on("draw", () => {
    ctx.current.lineWidth = 5;
    ctx.current.globalCompositeOperation = "source-over";
  });

  socket.on("start-drawing", ({ data }) => {
    ctx.current.beginPath();
    ctx.current.moveTo(data.x, data.y);
    ctx.current.lineTo(data.x, data.y);
    ctx.current.stroke();
    setDrawing(true);
  });

  socket.on("drawing", ({ data }) => {
    if (!drawing) return;
    ctx.current.lineTo(data.x, data.y);
    ctx.current.stroke();
  });

  socket.on("stop-drawing", () => {
    ctx.current.closePath();
    setDrawing(false);
  });

  useEffect(() => {
    const canvas = canva.current;
    const context = canvas.getContext("2d");

    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    ctx.current = context;
  }, []);

  return (
    <div>
      <canvas
        onMouseDown={(e) => {
          startDrawing(e);
        }}
        onMouseUp={() => {
          stopDrawing();
        }}
        onMouseMove={(e) => {
          draw(e);
        }}
        onMouseLeave={() => {
          stopDrawing();
        }}
        ref={canva}
        className="border border-black cursor-crosshair w-[500px] h-[450px]"
      ></canvas>
      <button onClick={setToDraw}>Draw</button>
      <button onClick={setToErase} className="mx-2 border border-black">
        Erase
      </button>
    </div>
  );
};

export default DrawingBoard;
