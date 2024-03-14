import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const App = () => {
  const navigate = useNavigate();
  let { userID } = useParams();
  //get login information
  useEffect(() => {
    if (userID) {
      navigate('/login');
    } else {
      //get joined room information
    }
  }, [userID]);
  return (
    <div>
      <h1>Main</h1>
      <h3>Show my Id {userID}</h3>
      <h5>Start Chat</h5>
    </div>
  );
};

export default App;
