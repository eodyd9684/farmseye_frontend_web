import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SafetyData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          // 위치를 기반으로 데이터 가져오기
          fetchData(latitude, longitude);
        },
        (error) => {
          console.error("위치 정보를 가져올 수 없습니다.", error);
          fetchData(); // 위치 정보 없이 데이터 가져오기
        }
      );
    } else {
      console.error("브라우저가 위치 정보를 지원하지 않습니다.");
      fetchData(); // 위치 정보 없이 데이터 가져오기
    }
  }, []);

  // API 데이터 가져오기
  const fetchData = (latitude, longitude) => {
    axios.get('V2/api/DSSP-IF-00247?serviceKey=R48UF0HJOIUF67UD')
      .then(res => {
        console.log('API Response:', res.data);

        let messages = [];
        if (res.data && Array.isArray(res.data.messages)) {
          messages = res.data.messages;
        }

        // 위치 기반 필터링 (예제: 특정 지역명 포함 여부 확인)
        if (latitude && longitude) {
          messages = messages.filter(msg => 
            msg.location && msg.location.includes("서울") // 예제: 서울 포함 메시지 필터링
          );
        }

        // 최신순 정렬 후 상위 5개만 표시
        messages.sort((a, b) => new Date(b.date) - new Date(a.date));
        setData(messages.slice(0, 5));
      })
      .catch(error => {
        console.error('API Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>📢 내 위치 기반 최신 재난 문자 (5개)</h2>
      {location && <p>📍 현재 위치: {location.latitude}, {location.longitude}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : data.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {data.map((item, index) => (
            <li key={index} style={{
              backgroundColor: '#f8f9fa',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              borderLeft: '5px solid #dc3545',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
            }}>
              <strong>📅 날짜: {item.date || 'N/A'}</strong>
              <p>📌 내용: {item.message || '내용 없음'}</p>
              <small>🏢 발송 기관: {item.agency || '알 수 없음'}</small>
              <p>📍 위치: {item.location || '위치 정보 없음'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>📭 내 위치 기반 재난 문자 데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default SafetyData;
