import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { io, Socket } from 'socket.io-client';

// Define the AppProps interface with the socket prop
interface AppProps {
  socket: Socket;
}

const socket = io('http://localhost:4000'); // Replace with your server's URL

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App socket={socket} />
  </React.StrictMode>
);
