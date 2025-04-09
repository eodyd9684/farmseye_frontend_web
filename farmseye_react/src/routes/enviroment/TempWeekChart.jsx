import React, { useEffect, useState } from 'react'
import styles from './TempWeekChart.module.css'
import SimpleBarChart from '../../components/SimpleBarChart';

const TempWeekChart = () => {
  // 예시 데이터
  const [weekTemp, setWeekTemp] = useState([
    [
      26.5,
      26.7,
      26.8,
      26.5,
      24.5,
      24.9,
      25.3,
      25.7,
      26.5,
      26.5,
      26.5,
      26.5,
    ],
    [
      26.5,
      26.7,
      26.8,
      26.5,
      24.5,
      24.9,
      25.3,
      25.7,
      26.5,
      26.5,
      26.5,
      26.5,
    ],
    [
      26.5,
      26.7,
      26.8,
      26.5,
      24.5,
      24.9,
      25.3,
      25.7,
      26.5,
      26.5,
      26.5,
      26.5,
    ],
    [
      26.5,
      26.7,
      26.8,
      26.5,
      24.5,
      24.9,
      25.3,
      25.7,
      26.5,
      26.5,
      26.5,
      26.5,
    ],
    [
      26.5,
      26.7,
      26.8,
      26.5,
      24.5,
      24.9,
      25.3,
      25.7,
      26.5,
      26.5,
      26.5,
      26.5,
    ],
    [
      26.5,
      26.7,
      26.8,
      26.5,
      24.5,
      24.9,
      25.3,
      25.7,
      26.5,
      26.5,
      26.5,
      26.5,
    ],
    [
      26.5,
      26.7,
      26.8,
      26.5,
      24.5,
      24.9,
      25.3,
      25.7,
      26.5,
      26.5,
      26.5,
      28,
    ]
  ]);

  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    const today = new Date(); // 오늘 날짜
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() -6 + i); // 오늘에서 i일을 더하거나 빼서 날짜를 계산
      days.push([day, weekTemp[i]]);
    }

    setWeekDays(days);
  }, []);

  const getDayName = (date) => {
    const options = { weekday: 'long' };
    return date.toLocaleDateString('ko-KR', options); // 요일을 한국어로 출력
  };

  
  
  return (
    <div className={styles.container}>
      <h2>이전 데이터</h2>
      
      <div className={styles.days_container} >
        {weekDays.map((day, index) => (
          <div key={index} className={styles.day_box}>

            <div>{getDayName(day[0])}</div>

            <div>{day[0].getDate()}</div> {/* 날짜 표시 */}

            <hr />

            <div className={styles.week_temp}>
              <SimpleBarChart 
                dataKey={'temp'}
                rawData={weekTemp[index]}
                legend={
                  <div>
                    <span> 온도</span>
                  </div>
                }
                yAxis={"℃"}
              />
            </div>

          </div>
        ))}
      </div>

      

    </div>
  )
}

export default TempWeekChart