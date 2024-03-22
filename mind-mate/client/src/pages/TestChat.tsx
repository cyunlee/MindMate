import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';

interface TestChatProps {
  socket: Socket;
}

const TestChat: React.FC<TestChatProps> = ({ socket }) => {
  const { userId, roomId } = useParams<{ userId: string, roomId: string }>();
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    // Connect to socket server when component mounts
    socketRef.current = io('http://localhost:4000');
  
    // Join the chatroom when component mounts
    if (socketRef.current && userId && roomId) {
      socketRef.current.emit('join', { userId, roomId });
    }
  
    // Attach event listener for incoming chat messages
    socketRef.current?.on('chat message', (message: string) => {
      console.log('Received message:', message);
      console.log('Received message object:',  message);
      setMessages(prevMessages => [...prevMessages, message]);
    });
    
  
    // Clean up socket connection and event listeners when component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off('chat message');
      }
    };
  }, [userId, roomId]);
  

  const sendMessage = () => {
    if (socketRef.current && messageInput.trim() !== '') {
      // Emit the 'chat message' event with the roomId, userId, and messageInput
      console.log('chat message', roomId, userId, messageInput);
      socketRef.current.emit('chat message', roomId, userId, messageInput);
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
