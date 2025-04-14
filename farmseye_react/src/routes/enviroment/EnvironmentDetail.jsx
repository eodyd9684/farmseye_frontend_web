import React, { useEffect, useState } from 'react'
import styles from './EnvironmentDetail.module.css'
import { useSelector } from 'react-redux'
import DataChart from './DataChart'
import { selectEnvList } from '../../apis/enviromentApi'

const EnvironmentDetail = () => {
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
      {
        envData === null ? 
        null
        :
        <div className={styles.data_container}>
          
          <div>
            <div>
              <i class="bi bi-thermometer-half"></i>
              <span>온도</span>
            </div>

            <DataChart today={today} data={envData} dataKey={dataKey.temp}/>
          </div>

          <div>
            <div >
              <i class="bi bi-droplet-half"></i>
              <span>습도</span>
            </div>

            <DataChart today={today} data={envData} dataKey={dataKey.humi}/>
          </div>

          <div>
            <div>
              <i class="bi bi-lightbulb"></i>
              <span>조도</span>
            </div>
            
            <DataChart today={today} data={envData} dataKey={dataKey.illumi}/>
          </div>

        </div>
      }

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