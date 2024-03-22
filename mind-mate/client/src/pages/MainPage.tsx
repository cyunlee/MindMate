import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import ChatPage from './ChatPage'; // Import the ChatPage component
import axios from 'axios';

const App = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [showChat, setShowChat] = useState(false);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          setIsLogin(false);
          return;
        }
        
        const res = await axios.get('/api/verify', {
          headers: {
            Authorization: accessToken
          }
        });

        if (res.data.isError) {
          setIsLogin(false);
          console.log(res.data,'User not logged in');
        } else {
          setIsLogin(true);
          console.log(res.data.decoded.userid, 'User logged in');
          setUserId(res.data.decoded.userid);
        }
      } catch (error) {
        console.error('Error checking login:', error);
        setIsLogin(false); // Reset login state on error
      }
    };

    checkLogin();
  }, []); // Run once on component mount

  // Function to handle button click event
  // Function to handle button click event
const handleClickEvent = () => {
  // If the user is logged in, show the chat page
  if (isLogin) {
    setShowChat(true);
  } else {
    // If the user is not logged in, display a message or redirect to the login page
    alert('Please log in to access the chat.'); // Display a simple alert message
    // You can also redirect to the login page using React Router: history.push('/login');
  }
};


  return (
    <div style={{ width: '100%' }}>
      <TopBar />
      <h1>Main</h1>
      <h5>Start Chat</h5>
      
      {/* Button to show chat bot */}
      <button
        className="chatButton"
        style={{ position: 'fixed', right: '100px', bottom: '100px' }}
        onClick={handleClickEvent}
      >
        Show Chat
      </button>

      {/* Conditional rendering of the ChatPage component */}
      {showChat && <ChatPage userId={userId} />} {/* Pass the userId prop */}
    </div>
  );
};

export default App;
