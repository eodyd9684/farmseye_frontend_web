import React, { useEffect, useState } from 'react'
import styles from './TempWeekChart.module.css'
import SimpleBarChart from '../../components/SimpleBarChart';
import { useSelector } from 'react-redux';
import DataChart from './DataChart';
import { selectEnvList } from '../../apis/enviromentApi';

const TempWeekChart = () => {
  const today = useSelector(state => state.today.today);

  //오늘 기준 농장 내부 환경 데이터 12개
  const [envData, setEnvData] = useState(null);

  const [weekData, setWeekData] = useState(null);

  // 예시 데이터
  const [weekTemp, setWeekTemp] = useState([
    [
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10
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

  useEffect(() => {
    const fetchEnvData = async () => {
      try {
        const res = await selectEnvList();
        const env = res.data.filter((item) => {
          item.illumi = (10000 / (item.illumi + 1)).toFixed(1)
          const date = new Date(item.timestamp)
          return date.getHours() === 15;
        })
        const envCopy = []
        for(let i = env.length - 12 ; i < env.length ; i ++){
          envCopy.push(env[i])
        }
        setEnvData(envCopy);
//////////////////////////////////////////////////////////////////////////////////////////
        //일주일 전 데이터(weekTemp) 받아오기(시간별)
        const weekEnvData = res.data;
        
//////////////////////////////////////////////////////////////////////////////////////////
      } catch (error) {
        console.error("환경 데이터를 불러오는 중 오류 발생:", error);
      }
    };
  
    fetchEnvData();
  }, []);


  

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
      <h2>주간 데이터</h2>

      {envData === null ? null : 
        <div>
        <DataChart today={today} data={envData} dataKey={'temp'}/>
      </div>}
      
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
                  <>
                  </>
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