import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { io } from "socket.io-client";

let socket;
const Chat = () => {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const ENDPOINT = "localhost:5000";
  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message) =>
      setMessages((messages) => [...messages, message])
    );
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) socket.emit("sendMessage", message, () => setMessage(""));
  };

  console.log(messages);
  return (
    <div className="outerContainer">
      <div className="container">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(event) => event.key === "Enter" && sendMessage(event)}
        />
      </div>
    </div>
  );
};

export default Chat;
