import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import MainPage from './pages/MainPage';
import Error404 from './pages/errors/Error404';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import TestChat from './pages/TestChat';

interface AppProps {
  socket: Socket;
}

const App: React.FC<AppProps> = ({ socket }) => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/testchat/:roomId"
            element={<ChatPage />} // Pass the socket instance as a prop
          />
          <Route
            path="/testchat/:userId/:roomId"
            element={<TestChat socket={socket} />} // Pass the socket instance as a prop
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
