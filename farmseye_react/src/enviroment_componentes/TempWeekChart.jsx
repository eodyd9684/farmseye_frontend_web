import React, { useEffect, useState } from 'react'

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
      26.5,
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
    <div>
      <h2>이번 주 요일</h2>
      
      <div style={{ display: 'flex', justifyContent: 'space-between' ,border:'1px solid black' }}>
        {weekDays.map((day, index) => (
          <div key={index} style={{ margin:'10px', padding: '10px', textAlign: 'center', width: '13%' , border:'1px solid red' }}>
            <div>{getDayName(day[0])}</div>
            <div>{day[0].getDate()}</div> {/* 날짜 표시 */}
            <hr />
            {
              day[1].map((e , i) => {
                return(
                  <div key={i}>
                    <span>{i * 2}시 : </span>
                    <span>{e}</span>
                    <br />
                  </div>
                )
              })
            }
          </div>
        ))}
      </div>

    </div>
  )
}

export default TempWeekChart