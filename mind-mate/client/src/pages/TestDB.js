import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestDB = () => {
  const [testInput, setTestInput] = useState([]);

  useEffect(() => {
    // 서버에서 데이터를 가져오는 비동기 함수 호출
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/enemyDeck'); // 적절한 API 엔드포인트로 변경
        setEnemyDeckData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // fetchData 함수 호출
    fetchData();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출
  return (
    <div>
      <h1>Test DB</h1>
    </div>
  );
};

export default TestDB;
