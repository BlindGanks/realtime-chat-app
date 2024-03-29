import React from "react";
import "./Input.css";
const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(event) => event.key === "Enter" && sendMessage(event)}
      />
      <button className="sendButton">send</button>
    </form>
  );
};

export default Input;
