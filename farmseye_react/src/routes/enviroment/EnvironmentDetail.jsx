import React, { useEffect, useState } from 'react'
import styles from './EnvironmentDetail.module.css'
import { useSelector } from 'react-redux'
import DataChart from './DataChart'

const EnvironmentDetail = () => {
  //오늘 날짜 받아오기
  const today = useSelector(state => state.today.today);

  const dataKey = {
    temp : 'temp',
    humi : 'humi',
    lux : 'lux'
  };

  //데이터베이스에서 온도 데이터 받아올 변수
  const [tempData, setTempData] = useState([
    {
      no: 1,
      temp: 26.5,
    },
    {
      no: 2,
      temp: 27.2,
    },
    {
      no: 3,
      temp: 28.5,
    },
    {
      no: 4,
      temp: 24.5,
    },
  ]);

  //데이터베이스에서 습도 데이터 받아올 변수
  const [humiData, setHumiData] = useState([
    {
      no: 1,
      humi: 64,
    },
    {
      no: 2,
      humi: 58,
    },
    {
      no: 3,
      humi: 72,
    },
    {
      no: 4,
      humi: 66,
    },
  ]);

  //데이터베이스에서 조도 데이터 받아올 변수
  const [luxData, setLuxData] = useState([
    {
      no: 1,
      lux: 26.5,
    },
    {
      no: 2,
      lux: 27.2,
    },
    {
      no: 3,
      lux: 28.5,
    },
    {
      no: 4,
      lux: 24.5,
    },
  ]);

  //co2, no2, nh3, h2s 현재값
  const [appropriateNowData, setAppropriateNowData] = useState({
    co2 : 2210,
    no2 : 6,
    nh3 : 10,
    h2s : 0.2
  });



  return (
    <div className={styles.container}>
      <div className={styles.data_container}>
        
        <div>
          <div>
            <i class="bi bi-thermometer-half"></i>
            <span>온도</span>
          </div>

          <DataChart today={today} data={tempData} dataKey={dataKey.temp}/>
        </div>

        <div>
          <div >
            <i class="bi bi-droplet-half"></i>
            <span>습도</span>
          </div>

          <DataChart today={today} data={humiData} dataKey={dataKey.humi}/>
        </div>

        <div>
          <div>
            <i class="bi bi-lightbulb"></i>
            <span>조도</span>
          </div>
          
          <DataChart today={today} data={luxData} dataKey={dataKey.lux}/>
        </div>

      </div>

      <div className={styles.gas_info}>
        <div>
          <p>co2</p>
          <p>현재 수치 : {appropriateNowData.co2}</p>
        </div>

        <div>
          <p>no2</p>
          <p>현재 수치 : {appropriateNowData.no2}</p>
        </div>

        <div>
          <p>nh3</p>
          <p>현재 수치 : {appropriateNowData.nh3}</p>
        </div>

        <div>
          <p>h2s</p>
          <p>현재 수치 : {appropriateNowData.h2s}</p>
        </div>
      </div>
    </div>
  )
}

export default EnvironmentDetail