import React, { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

const App = () => {
  let userID = 1234;
  return (
    <div>
      <h1>Main</h1>
      <h3>Show my Id {userID}</h3>
      <Link to={`/testchat/${userID}`}>Enter Chat</Link>
    </div>
  );
};

export default App;
