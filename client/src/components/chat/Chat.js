import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { io } from "socket.io-client";

let socket;
const Chat = () => {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const ENDPOINT = "localhost:5000";
  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room });
  }, [ENDPOINT]);

  return <div>Chat</div>;
};

export default Chat;
