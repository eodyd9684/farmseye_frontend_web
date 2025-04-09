import React, { useEffect, useState } from 'react'
import styles from './WeatherDetail.module.css'
import Weather from './Weather'
import WeekWeather from './WeekWeather'

const WeatherDetail = () => {

  //오늘 날짜 받아오기
      const [today, setToday] = useState("");
        
      useEffect(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const date = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        setToday(`${year}.${month}.${date} ${hours}:${minutes}`); // yyyy-mm-dd 형식
      }, []);

  return (
    <div className={styles.container}>
      <div>
        <Weather today={today} />
      </div>
      
      <div>
        <WeekWeather />
      </div>
    </div>
  )
}

export default WeatherDetail