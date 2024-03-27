import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import ChatPage from './ChatPage'; 
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
        setIsLogin(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <TopBar />
      <h1>Main</h1>
      <div>
        <Link to={`/chatpage/${userId}`}>
          <img
            src='/chatButton.png'
            alt="Chat Button"
            className="chatButton"
            style={{ position: 'fixed', right: '100px', bottom: '100px' }}
          />
        </Link>
      </div>
    </div>
  );
};

export default App;
