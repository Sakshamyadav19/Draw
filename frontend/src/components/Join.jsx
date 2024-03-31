import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addName, updateTotalPlayers } from "../../utils/appSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function generateRandomString() {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const Join = ({ socket }) => {
  const input = useRef();
  const userName = useRef();
  const [players, setPlayers] = useState();
  const [errMsg, setErrMsg] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let roomId;

  const createRoom = () => {
    roomId = generateRandomString();
    if(!players || !userName.current.value)
    {
      setErrMsg("Invalid Inputs !");
      return;
    }

    socket.emit("join-room", {
      data: { name: userName.current.value, roomId: roomId, players: players },
    });

    dispatch(addName(userName.current.value));
    navigate("/lobby/" + roomId);
  };

  const joinRoom = () => {
    if (!input.current.value||!userName.current.value) {
      setErrMsg("Invalid Inputs !");
      return;
    }

    socket.emit("getRoomInfo");
    socket.on("getRoomInfo", ({ data }) => {

      setPlayers(data[0].total);
      dispatch(updateTotalPlayers(data[0].total));
    });
    const roomId = input.current.value;

    socket.emit("join-room", {
      data: { name: userName.current.value, roomId: roomId, players: players },
    });
    dispatch(addName(userName.current.value));
    navigate("/lobby/" + roomId);
  };

  const handleSelectChange = (count) => {
    setPlayers(count);
    dispatch(updateTotalPlayers(count));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-600 text-white">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Draw.io</CardTitle>
          <CardDescription>Doodle your way to victory!</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input ref={userName} id="name" placeholder="Name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="roomId">RoomId</Label>
                <Input ref={input} id="roomId" placeholder="RoomId" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Players</Label>
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
          <div className=" text-red-700">{errMsg}</div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => {
              joinRoom();
            }}
            variant="outline"
          >
            Join
          </Button>
          <Button
            onClick={() => {
              createRoom();
            }}
          >
            Create
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Join;
