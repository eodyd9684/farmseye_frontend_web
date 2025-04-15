import React, { useEffect, useState } from 'react'
import styles from './UserMainTest.module.css'
import { useSelector } from 'react-redux'
import MainWeather from '../weather/mainWeather'
import GaugeDesign from '../../components/practice/GaugeDesign'
import ProgressBarChart from '../../components/practice/ProgressBarChart'
import Legend from '../../components/Legend'
import { useNavigate } from 'react-router-dom'
import FarmseyeButton from '../../common_component/FarmseyeButton'
import { selectEnvList } from '../../apis/enviromentApi'
import WeekWeather from '../weather/WeekWeather'
import WeatherDetail from '../weather/WeatherDetail'
import LineChartComponent from '../../components/LineChartComponent'
import ProgressBarChartHor from '../../components/practice/ProgressBarChartHor'

const UserMainTest = () => {
  const nav = useNavigate();

  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState(false); // 모달 열기/닫기 상태

  //오늘 날짜 받아오기
    const today = useSelector(state => state.today.today);
  
    const dataKey = {
      temp : 'temp',
      humi : 'humi',
      illumi : 'illumi'
    };
  
    //오늘 기준 농장 내부 환경 데이터 12개
    const [envData, setEnvData] = useState(null);
  
     //co2, no2, nh3, h2s 현재값
    const [appropriateNowData, setAppropriateNowData] = useState({
      co2 : 0,
      no2 : 0,
      nh3 : 0,
      h2s : 0
    });
  
    //co2, no2, nh3, h2s 적정 수치값
    const appropriateData = {
      co2 : 3000,
      no2 : 5,
      nh3 : 1,
      h2s : 0.5
    }
  
    //co2, no2, nh3, h2s 위험 수치값
    const appropriateDangerData = {
      co2 : 5000,
      no2 : 10,
      nh3 : 25,
      h2s : 2
    }
  
    useEffect(() => {
      const fetchEnvData = async () => {
        try {
          const res = await selectEnvList();
          const data = res.data[res.data.length - 1];
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
    
          setAppropriateNowData(prev => ({
            ...prev,
            co2: data.co2.toFixed(1),
            no2: data.no2.toFixed(3),
            nh3: data.nh3.toFixed(3),
            h2s: data.h2s.toFixed(3),
          }));
        } catch (error) {
          console.error("환경 데이터를 불러오는 중 오류 발생:", error);
        }
      };
    
      fetchEnvData();
    }, []);
  

  return (
    <div className={styles.container}>
      <div className={styles.left_panel}>
        <p className={styles.chart_title}>📊 하루 변화 (온도 / 습도 / 조도)</p>
        <LineChartComponent envData={envData}/> {/* line chart 그래프 컴포넌트 (recharts 사용 추천) */}
      </div>
  
      <div className={styles.right_panel}>
        <Legend />
        <div className={styles.card_item}>
          <p>CO2 <span>{appropriateNowData.co2}</span></p>

          <ProgressBarChartHor 
            max={appropriateData.co2} 
            current={appropriateNowData.co2} 
            danger={appropriateDangerData.co2}
          />
        </div>

        <div className={styles.card_item}>
          <p>NO2 <span>{appropriateNowData.no2}</span></p>

          <ProgressBarChartHor
            max={appropriateData.no2} 
            current={appropriateNowData.no2} 
            danger={appropriateDangerData.no2} 
          />
        </div>

        <div className={styles.card_item}>
          <p>NH3 <span>{appropriateNowData.nh3}</span></p>

          <ProgressBarChartHor 
            max={appropriateData.nh3} 
            current={appropriateNowData.nh3} 
            danger={appropriateDangerData.nh3} 
          />
        </div>

        <div className={styles.card_item}>
          <p>H2S <span>{appropriateNowData.h2s}</span></p>
          <ProgressBarChartHor 
            max={appropriateData.h2s} 
            current={appropriateNowData.h2s} 
            danger={appropriateDangerData.h2s} 
          />
        </div>
        
      </div>
    </div>
  );
  
}

export default UserMainTest