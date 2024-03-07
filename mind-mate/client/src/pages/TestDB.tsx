import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestDB = () => {
  //const [testInput, setTestInput] = useState([]);
  const [testContent, setTestContent] = useState({
    id: '',
    username: '',
    email: '',
    password: '',
  });

  const [id, setID] = useState('');

  const handleInputId = (e) => {
    setID(e.target.value);
  };

  const [username, setUsername] = useState('');

  const handleInputName = (e) => {
    setUsername(e.target.value);
  };

  const dbTest = async (event) => {
    event.preventDefault();
    let data = [id, username];
    console.log('data ', data);
    axios({
      method: 'post',
      url: '/api/test',
      data: data,
    })
      .then((res) => {
        console.log('데이터 전송 성공', res.data[0]);
        const content = res.data[0];
        console.log('content ', content);
        setTestContent(content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form className="test-input">
        <input
          className="id-input"
          type="text"
          placeholder="아이디를 입력하세요"
          onChange={handleInputId}
          value={id}
        />
        <input
          className="username-input"
          type="text"
          placeholder="유저 이름을 입력하세요"
          onChange={handleInputName}
          value={username}
        />
        <button className="test-btn" onClick={dbTest}>
          Submit
        </button>
      </form>
      <div>{id}</div>
      <div>{username}</div>
      <div>{testContent.id}</div>
      <div>{testContent.username}</div>
      <div>{testContent.email}</div>
      <div>{testContent.password}</div>
    </div>
  );
};

export default TestDB;
