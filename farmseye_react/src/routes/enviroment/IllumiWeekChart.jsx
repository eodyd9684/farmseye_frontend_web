import React, { useEffect, useState, useMemo } from 'react'
import styles from './TempWeekChart.module.css'
import SimpleBarChart from '../../components/SimpleBarChart';
import { useSelector } from 'react-redux';
import DataChart from './DataChart';
import { selectEnvList } from '../../apis/enviromentApi';

// 데이터 페칭 로직을 커스텀 훅으로 분리
const useEnvironmentData = () => {
  const [envData, setEnvData] = useState(null);
  const [weekData, setWeekData] = useState(null);

  useEffect(() => {
    const fetchEnvData = async () => {
      try {
        const res = await selectEnvList();
        
        // 오늘의 15시 데이터 필터링
        const filteredEnv = res.data.map(item => ({
          ...item,
          illumi: (10000 / (item.illumi + 1)).toFixed(1)
        })).filter(item => {
          const date = new Date(item.timestamp);
          return date.getHours() === 15;
        });
        
        // 최근 12개 데이터만 사용
        const todayData = filteredEnv.slice(-12);
        setEnvData(todayData);

        // 14일 데이터 필터링 및 시간별 그룹화
        const dayFourteenData = res.data.map(item => ({
          ...item,
          illumi: (10000 / (item.illumi + 1)).toFixed(1)
        })).filter(item => {
          const date = new Date(item.timestamp);
          return date.getDate() === 14;
        }).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

        // 12개씩 묶어서 배열 분할
        setWeekData(chunkArray(dayFourteenData, 12));
      } catch (error) {
        console.error("환경 데이터를 불러오는 중 오류 발생:", error);
      }
    };
  
    fetchEnvData();
  }, []);

  return { envData, weekData };
};

// 배열을 지정된 크기로 분할하는 유틸리티 함수
const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

// 날짜 관련 유틸리티 함수들
const getWeekDays = () => {
  const today = new Date();
  const days = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - 6 + i);
    days.push(day);
  }

  return days;
};

const getDayName = (date) => {
  const options = { weekday: 'long' };
  return date.toLocaleDateString('ko-KR', options);
};

const IllumiWeekChart = () => {
  const today = useSelector(state => state.today.today);
  const { envData, weekData } = useEnvironmentData();
  
  // 주간 날짜 계산 - useMemo로 최적화
  const weekDays = useMemo(() => getWeekDays(), []);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <p className={styles.chart_title}>WeekChart</p>
  
        {envData && (
          <div className={styles.today_chart}>
            <p>TodayChart</p>
            <DataChart today={today} data={envData} dataKey={'illumi'}/>
          </div>
        )}
        
        <div className={styles.days_container}>
          {weekDays.map((day, index) => (
            <div key={index} className={styles.day_box}>
              <div>{getDayName(day)}</div>
              <div>{day.getDate()}</div>
              <hr />
              <div className={styles.week_temp}>
                {weekData && weekData[index] && (
                  <SimpleBarChart 
                    legend={<></>}
                    rawData={weekData[index].map(d => d.illumi)}
                    yAxis={"lx"}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IllumiWeekChart;
