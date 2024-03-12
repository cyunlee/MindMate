import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//페이지 임포트
import MainPage from './pages/MainPage';
import Error404 from './pages/errors/Error404';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/signup" element={<SignupPage/>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path="*" element={<Error404 />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
