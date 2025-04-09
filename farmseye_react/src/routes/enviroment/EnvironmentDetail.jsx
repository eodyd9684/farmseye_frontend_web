import React, { useEffect, useState } from 'react'
import styles from './EnvironmentDetail.module.css'
import Weather from '../weather/Weather'
import TempChart from './TempChart'
import HumidityChart from './HumidityChart'
import WeekWeather from '../weather/WeekWeather'

const EnvironmentDetail = () => {
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
      <div className={styles.data_container}>

        <div>         
          <Weather today={today} />
          <WeekWeather />
        </div>

        <div>
          <TempChart today={today} />
        </div>

        <div>
          <HumidityChart today={today} />
        </div>
      </div>
    </div>
  )
}

export default EnvironmentDetail