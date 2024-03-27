import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Message {
  content: string;
  sender: 'user' | 'ai';
}

interface TestChatProps {
  socket: Socket;
}

const TestChat: React.FC<TestChatProps> = ({ socket }) => {
  const { userId, roomId } = useParams<{ userId: string; roomId: string }>();
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    socketRef.current = io('http://localhost:4000');

    if (socketRef.current && userId && roomId) {
      socketRef.current.emit('join', { userId, roomId });
    }

    socketRef.current?.on('chat message', (message: string) => {
      setMessages(prevMessages => [...prevMessages, { content: message, sender: 'ai' }]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off('chat message');
      }
    };
  }, [userId, roomId]);

  const sendMessage = async () => {
    if (messageInput.trim() !== '') {
      socketRef.current?.emit('chat message', roomId, userId, messageInput);

      try {
        const response = await axios.post('/api/aichat', {
          message: messageInput
        });
        console.log(response);
        console.log(response.data.answer);
        const aiResponse = response.data.answer;
        setMessages(prevMessages => [...prevMessages, { content: aiResponse, sender: 'ai' }]);
      } catch (error) {
        console.error('Error sending message to AI:', error);
      }

      setMessageInput('');
    }
  };

  return (
    <div>
      <div>
        <ul>
          {messages.map((message, index) => (
            <li key={index} className={message.sender === 'user' ? 'user-message' : 'ai-message'}>
              {message.content}
            </li>
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
