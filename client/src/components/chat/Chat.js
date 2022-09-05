import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { io } from "socket.io-client";
import "./Chat.css";
import InfoBar from "../infoBar/InfoBar";
import Input from "../input/Input";
import Messages from "../messages/Messages";
let socket;
const Chat = () => {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const ENDPOINT = "https://realtime-chat-app-backend.vercel.app";
  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);
    socket = io(ENDPOINT, {
      path: "/socket.io",
      transports: "websocket",
      secure: true,
    });

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) alert(error);
    });

    return () => {
      socket.disconnect();
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

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
