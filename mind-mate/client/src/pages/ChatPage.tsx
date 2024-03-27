import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

interface ChatRoom {
  chatroomID: number;
}

interface ChatPageProps {
  userId: string;
}

const ChatPage: React.FC<ChatPageProps> = ({ userId }) => {
  const [chatList, setChatList] = useState<ChatRoom[]>([]); 

  const { userId: routeUserId } = useParams<{ userId: string | undefined }>();

  const user = userId || '';

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const response: AxiosResponse<ChatRoom[]> = await axios.get(`/api/getChatRoomList/${user}`);
        setChatList(response.data);
      } catch (error) {
        console.error('Error fetching chat list:', error);
      }
    };

    fetchChatList();
  }, [user]);

  const createNewChatRoom = async () => {
    try {
      const response: AxiosResponse<ChatRoom> = await axios.post('/api/newChatRoom', { userId: user });
      setChatList(prevChatList => [...prevChatList, response.data]);
    } catch (error) {
      console.error('Error creating new chat room:', error);
    }
  };

  return (
    <div>
      <h3>Show my Id {user}</h3>
      <h5>Start Chat</h5>
      {chatList.length === 0 && (
        <button onClick={createNewChatRoom}>Create Chat</button>
      )}
      {chatList.length > 0 && (
        <div>
          <h2>My Chat List:</h2>
          <ul>
            {chatList.map(chat => (
              <li key={chat.chatroomID}>
                <span>Chat Room ID: {chat.chatroomID}</span>
                <Link to={`/testchat/${user}/${chat.chatroomID}`}>Enter Chat</Link>
              </li>
            ))}
          </ul>
          <button onClick={createNewChatRoom}>Create Chat</button>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
