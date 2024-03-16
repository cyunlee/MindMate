import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import MainPage from './pages/MainPage';
import Error404 from './pages/errors/Error404';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import TestChat from './pages/TestChat';
import CommunityPage from './pages/CommunityPage';
import RoutinePage from './pages/RoutinePage';
import PlacePage from './pages/PlacesPage';
import PlacesPage from './pages/PlacesPage';
import CounsultPage from './pages/ConsultPage';

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
          <Route path="/community" element={<CommunityPage/>}/>
          <Route path="/routine" element={<RoutinePage/>}/>
          <Route path="/places" element={<PlacesPage/>}/>
          <Route path="/consult" element={<CounsultPage/>}/>
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
