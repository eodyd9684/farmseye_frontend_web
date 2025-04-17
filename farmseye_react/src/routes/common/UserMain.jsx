import React, { useEffect, useState } from 'react'
import styles from './UserMain.module.css'
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

const UserMain = () => {
  const nav = useNavigate();

  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState(false); // 모달 열기/닫기 상태

  //오늘 날짜 문자열 형태로 저장한 데이터 받아오기
  const today = useSelector(state => state.today.today);

  //현재 값, 내부 적정 온도
  const [appropriateTemp, setAppropriateTemp] = useState({
    now : 0,
    min : 18,
    max : 24
  });

  //현재 값, 내부 적정 습도
  const [appropriateHumi, setAppropriateHumi] = useState({
    now : 0,
    min : 50,
    max : 70
  });

  //현재 값, 내부 적정 조도
  const [appropriateLux, setAppropriateLux] = useState({
    now : 0,
    min : 10,
    max : 20
  });

  //co2, no2, nh3, h2s 현재값
  const [appropriateNowData, setAppropriateNowData] = useState({
    co2 : 2100,
    no2 : 6,
    nh3 : 0.6,
    h2s : 0.2
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
    nh3 : 2.5,
    h2s : 2
  }

  useEffect(() => {
    selectEnvList()
      .then(res => {
        const data = res.data[res.data.length - 1];
        setAppropriateTemp({...appropriateTemp, now : data.temp})
        setAppropriateHumi({...appropriateHumi, now : data.humi})
        //CDS조도 센서 출력값을 LUX단위로 변경시 사용식 => 10000 / (743 + 1) ≈ 13.44 lux
        const lux = (10000 / (data.illumi + 1)).toFixed(1)
        setAppropriateLux({...appropriateLux, now : lux})
        setAppropriateNowData({...appropriateNowData, co2 : data.co2.toFixed(1), no2 : data.no2.toFixed(3), nh3 : data.nh3.toFixed(3), h2s : data.h2s.toFixed(3)})
      })
      .catch(error => console.log(error))
  } , []);
  

  return (
    <div className={styles.container}>
        
        <p className={styles.myFarmseye} onClick={e => nav('/main/enviroment')} >My FarmsEye</p>
        <div className={styles.user_main_contents}>
          
          <div>
            <p>날씨</p>
            <MainWeather today={today} />
            <FarmseyeButton 
              title='+ 더 보기' 
              size='' 
              onClick={e => {
                setIsWeatherModalOpen(true)
              }} 
            />
          </div>



          <div>
            <p>현재 온도 : </p>
            <p>{appropriateTemp.now}℃</p>
            <GaugeDesign appropriate={appropriateTemp} />  
            <Legend />
            <FarmseyeButton title='+ 더 보기' size='' onClick={e => nav('/main/tempWeekChart')} />
          </div>



          <div>
            <p>현재 습도</p>
            <p>{appropriateHumi.now}%</p>
            <GaugeDesign appropriate={appropriateHumi} />
            <Legend />
          </div>



          <div>
            <p>조도</p>
            <p>{appropriateLux.now} lx</p>
            <GaugeDesign appropriate={appropriateLux} />
            <p>최소 : {appropriateLux.min} lx</p>
            <Legend />
          </div>



          <div>
            <p>CO2</p>
            <ProgressBarChart 
              max={appropriateData.co2} 
              current={appropriateNowData.co2} 
              danger={appropriateDangerData.co2}
            />
            <Legend />
          </div>



          <div>
            <p>NO2</p>
            <ProgressBarChart 
              max={appropriateData.no2} 
              current={appropriateNowData.no2} 
              danger={appropriateDangerData.no2} 
            />
            <Legend />
          </div>



          <div>
            <p>NH3</p>
            <ProgressBarChart 
              max={appropriateData.nh3} 
              current={appropriateNowData.nh3} 
              danger={appropriateDangerData.nh3} 
            />
            <Legend />
          </div>



          <div>
            <p>H2S</p>
            <ProgressBarChart 
              max={appropriateData.h2s} 
              current={appropriateNowData.h2s} 
              danger={appropriateDangerData.h2s} 
            />
            <Legend />
          </div>

        </div>

        {isWeatherModalOpen && <WeatherDetail onClick={() => setIsWeatherModalOpen(false)} />}

        
    </div>
  )
}

export default UserMain