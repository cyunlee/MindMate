// src/pages/TestChat.tsx
import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client'; // Import io function
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
interface TestChatProps {
  socket: Socket;
}

const TestChat: React.FC<TestChatProps> = ({ socket }) => {
  let { userID, roomId } = useParams();
  const navigate = useNavigate();
  console.log('roomId', roomId);
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    socketRef.current = io('http://localhost:4000');

    // Use optional chaining to handle null case
    socketRef.current?.on('message', (message: string) => {
      setMessages(messages.concat(message));
    });

    return () => {
      // Use optional chaining to handle null case
      socketRef.current?.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current && messageInput.trim() !== '') {
      // Use optional chaining to handle null case
      socketRef.current?.emit('message', messageInput);
      console.log('message', messageInput);
      setMessageInput('');
    }
  };

  return (
    <div>
      <div>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default TestChat;
