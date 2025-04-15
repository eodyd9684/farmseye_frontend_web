import React, { useEffect, useRef } from 'react'
import styles from './WeatherDetail.module.css'
import Weather from './Weather'
import WeekWeather from './WeekWeather'
import { useSelector } from 'react-redux'

const WeatherDetail = ({ onClick }) => {
  const today = useSelector(state => state.today.today);
  const modalRef = useRef(); // 모달 영역 ref 생성

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClick(); // 모달 닫기 함수 실행
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClick]);

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.container} ref={modalRef}>
        <button className={styles.close_button} onClick={onClick}>X</button>

        <div>
          <Weather today={today} />
        </div>

        <div>
          <WeekWeather />
        </div>
      </div>
    </div>
  );
};

export default WeatherDetail;
