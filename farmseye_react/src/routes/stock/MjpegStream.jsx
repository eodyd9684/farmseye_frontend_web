
import React, { useEffect, useRef } from 'react';

const MjpegStream = () => {
  const imgRef = useRef(null);

  useEffect(() => {
    // MJPEG 스트림을 img 태그로 표시하는 함수
    const startStream = () => {
      const sourceUrl = 'http://192.168.30.236:8000/stream.mjpg'; // 스트리밍 서버 주소
      const imgElement = imgRef.current;

      // 서버에서 MJPEG 스트림을 받아오기 위해 이미지 src를 설정
      imgElement.src = sourceUrl;

      imgElement.onload = () => {
        // 이미지 로딩이 완료되면 스트리밍을 시작
        imgElement.style.display = 'block';
      };

      imgElement.onerror = () => {
        console.error('MJPEG stream failed to load.');
      };
    };

    startStream();

    // 컴포넌트 언마운트 시 스트리밍 종료
    return () => {
      if (imgRef.current) {
        imgRef.current.src = ''; // 스트리밍 중지
      }
    };
  }, []);

  return (
    <div>
      <h1>Live Camera Stream</h1>
      <img ref={imgRef} alt="Live Stream" style={{ width: '640px', height: '480px', display: 'none' }} />
    </div>
  );
};

export default MjpegStream;
