import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./components/chat/Chat";
import Join from "./components/join/Join";
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Join />} />
      <Route path="chat" element={<Chat />} />
    </Routes>
  </Router>
);

export default App;
