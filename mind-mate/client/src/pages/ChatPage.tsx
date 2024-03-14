import React, { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

const App = () => {
  let userID = 1234;
  //백에서 user가 참여하고 있는 room의 roomID목록을 받아오는 axios통신 실행
  return (
    <div>
      <h1>Main</h1>
      <h3>Show my Id {userID}</h3>
      <h5>Start Chat</h5>
    </div>
  );
};

export default App;
