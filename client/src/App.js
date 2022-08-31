import React from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "./components/chat/Chat";
import Join from "./components/join/Join";
const App = () => (
  <Routes>
    <Route path="/" element={<Join />} />
    <Route path="chat" element={<Chat />} />
  </Routes>
);

export default App;
