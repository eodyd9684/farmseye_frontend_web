import React, { useState } from 'react'
import styles from './UserMain.module.css'
import { useSelector } from 'react-redux'
import MainWeather from '../weather/mainWeather'
import FarmseyeInput from '../../common_component/FarmseyeInput'
import GaugeDesign from '../../components/practice/GaugeDesign'
import ProgressBar from '../../components/practice/ProgressBarChart'
import Legend from '../../components/Legend'
import { useNavigate } from 'react-router-dom'

const UserMain = () => {
  const nav = useNavigate();

  //오늘 날짜 문자열 형태로 저장한 데이터 받아오기
  const today = useSelector(state => state.today.today);

  //현재 값, 내부 적정 온도
  const [appropriateTemp, setAppropriateTemp] = useState({
    now : '21',
    min : 18,
    max : 24
  });

  //현재 값, 내부 적정 습도
  const [appropriateHumi, setAppropriateHumi] = useState({
    now : '58',
    min : 50,
    max : 70
  });

  //현재 값, 내부 적정 조도
  const [appropriateLux, setAppropriateLux] = useState({
    now : '15',
    min : 10,
    max : 20
  });

  //co2, no2, nh3, h2s 현재값
  const [appropriateNowData, setAppropriateNowData] = useState({
    co2 : 2100,
    no2 : 6,
    nh3 : 10,
    h2s : 0.2
  });

  //co2, no2, nh3, h2s 적정 수치값
  const appropriateData = {
    co2 : 3000,
    no2 : 5,
    nh3 : 20,
    h2s : 0.5
  }

  const appropriateDangerData = {
    co2 : 5000,
    no2 : 10,
    nh3 : 25,
    h2s : 2
  }

  

  return (
    <div className={styles.container}>
        <div className={styles.user_main_contents}>
          
          <div>
            <p>날씨</p>
            <MainWeather today={today} />
            <button type='button' onClick={e => nav('/main/week-weather')}>+ 더 보기</button>
          </div>



          <div>
            <p>현재 온도 : </p>
            <p>{appropriateTemp.now}℃</p>
            <GaugeDesign appropriate={appropriateTemp} />  
            <Legend />
            <button type='button' onClick={e => nav('/main')}>+ 더 보기</button>
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
            <ProgressBar 
              max={appropriateData.co2} 
              current={appropriateNowData.co2} 
              danger={appropriateDangerData.co2}
            />
            <Legend />
          </div>



          <div>
            <p>NO2</p>
            <ProgressBar 
              max={appropriateData.no2} 
              current={appropriateNowData.no2} 
              danger={appropriateDangerData.no2} 
            />
            <Legend />
          </div>



          <div>
            <p>NH3</p>
            <ProgressBar 
              max={appropriateData.nh3} 
              current={appropriateNowData.nh3} 
              danger={appropriateDangerData.nh3} 
            />
            <Legend />
          </div>



          <div>
            <p>H2S</p>
            <ProgressBar 
              max={appropriateData.h2s} 
              current={appropriateNowData.h2s} 
              danger={appropriateDangerData.h2s} 
            />
            <Legend />
          </div>

        </div>

        
    </div>
  )
}

export default UserMain