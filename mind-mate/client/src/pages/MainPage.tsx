// App.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import ChatPage from './ChatPage'; // Import the ChatPage component
import axios, { AxiosResponse } from 'axios';

const App = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

    const accessToken = localStorage.getItem('accessToken');

    const [userId, setUserId] = useState<string>('');

    const checkLogin = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: '/api/verify',
                headers: {
                    Authorization: accessToken
                }
            })
            if(res.data.isError===true){
                setIsLogin(false);
                console.log(res.data)
            }else if(res.data.isError===false){
                setIsLogin(true);
                console.log(res.data)
            }
        }catch(error) {
            console.log('error : ', error);
        }
    }
  let userID = '1234';
  const [showChat, setShowChat] = useState(false); // State to control chat page visibility

  // Function to handle button click event
  const handleClickEvent = async () => {
    // Check if the user is logged in
    await checkLogin();
  
    // If the user is logged in, show the chat page
    if (isLogin) {
      setShowChat(true);
    } else {
      // If the user is not logged in, redirect to the login page or display a message
      console.log('User is not logged in. Redirect to login page or display a message.');
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
      {showChat && <ChatPage userId={userID} />} {/* Pass the userId prop */}
    </div>
  );
};

export default App;
