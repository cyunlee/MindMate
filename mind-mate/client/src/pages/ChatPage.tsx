import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

// Define an interface representing the response data structure
interface ChatRoom {
  chatroomID: number;
  // Add other fields as needed
}

interface ChatPageProps {
  userId: string; // Define the userId prop
}

const ChatPage: React.FC<ChatPageProps> = ({ userId }) => {
  const [chatList, setChatList] = useState<ChatRoom[]>([]); // State to store chat list

  // Use the useParams hook to access route parameters
  const { userId: routeUserId } = useParams<{ userId: string | undefined }>();

  // Ensure userId is defined or set it to an empty string
  const user = userId || '';

  useEffect(() => {
    // Function to fetch chat list from the backend
    const fetchChatList = async () => {
      try {
        // Make GET request to fetch chat list from the backend
        const response: AxiosResponse<ChatRoom[]> = await axios.get(`/api/getChatRoomList/${user}`);
        // Update state with fetched chat list
        setChatList(response.data);
      } catch (error) {
        // Handle error
        console.error('Error fetching chat list:', error);
      }
    };

    // Call the fetchChatList function when component mounts
    fetchChatList();
  }, [user]); // Dependency array ensures useEffect runs only when user changes

  // Function to create a new chat room
  const createNewChatRoom = async () => {
    try {
      // Make POST request to create new chat room
      const response: AxiosResponse<ChatRoom> = await axios.post('/api/newChatRoom', { userId: user });
      // Update chat list state with the newly created chat room
      setChatList(prevChatList => [...prevChatList, response.data]); // Add the new chat room to the existing list
    } catch (error) {
      // Handle error
      console.error('Error creating new chat room:', error);
    }
  };

  return (
    <div>
      <h3>Show my Id {user}</h3>
      <h5>Start Chat</h5>

      {/* Conditional rendering of "Create Chat" button */}
      {chatList.length === 0 && (
        <button onClick={createNewChatRoom}>Create Chat</button>
      )}

      {/* Render chat list if available */}
      {chatList.length > 0 && (
        <div>
          <h2>My Chat List:</h2>
          <ul>
            {chatList.map(chat => (
              <li key={chat.chatroomID}>
                {/* Display chat room details */}
                <span>Chat Room ID: {chat.chatroomID}</span>
                <Link to={`/testchat/${user}/${chat.chatroomID}`}>Enter Chat</Link>
                {/* Add more chat room details as needed */}
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
