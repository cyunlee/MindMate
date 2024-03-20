import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import MainPage from './pages/MainPage';
import Error404 from './pages/errors/Error404';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import TestChat from './pages/TestChat';
import CommunityPage from './pages/CommunityPage';
import RoutinePage from './pages/RoutinePage';
import PlacesPage from './pages/PlacesPage';
import CounsultPage from './pages/ConsultPage';
import WritePostPage from './pages/WritePostPage';
import DetailPostPage from './pages/DetailPostPage';
// import CommunityStudy from './pages/CommunityStudy';
// import CommunityMoney from './pages/CommunityMoney';
// import CommunityWork from './pages/CommunityWork';
// import CommunityLove from './pages/CommunityLove';
// import CommunityPeople from './pages/CommunityPeople';
// import CommunityGeneral from './pages/CommunityGeneral';

import { useParams } from 'react-router-dom';

interface AppProps {
  socket: Socket;
}

const App: React.FC<AppProps> = ({ socket }) => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" element={<MainPage />} />

          {/* 회원가입, 로그인 페이지 */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* 커뮤니티 페이지 */}
          <Route path="/community/:categoryVal" element={<CommunityPage/>}/>
          <Route path="/community/:categoryVal/:postid" element={<DetailPostPage/>}/>

          {/* <Route path="/community/:category" element={<CommunityPage/>}/> */}

          {/* <Route path="/community/study" element={<CommunityStudy/>}/>
          <Route path="/community/money" element={<CommunityMoney/>}/>
          <Route path="/community/work" element={<CommunityWork/>}/>
          <Route path="/community/love" element={<CommunityLove/>}/>
          <Route path="/community/people" element={<CommunityPeople/>}/>
          <Route path="/community/general" element={<CommunityGeneral/>}/> */}

          {/* 포스트 페이지 */}
          <Route path='/writepost' element={<WritePostPage/>}/>
          <Route path='/detailpost' element={<DetailPostPage/>}/>
          
          <Route path="/routine" element={<RoutinePage/>}/>
          <Route path="/places" element={<PlacesPage/>}/>
          <Route path="/consult" element={<CounsultPage/>}/>
          <Route
            path="/testchat/:roomId"
            element={<ChatPage />} // Pass the socket instance as a prop
          />
          <Route
            path="/testchat/:userId/:roomId"
            element={<TestChat socket={socket} />} // Pass the socket instance as a prop
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
