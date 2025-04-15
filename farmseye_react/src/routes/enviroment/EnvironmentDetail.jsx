import React, { useEffect, useState } from 'react'
import styles from './EnvironmentDetail.module.css'
import { useSelector } from 'react-redux'
import DataChart from './DataChart'
import { selectEnvList } from '../../apis/enviromentApi'
import ProgressBarChartHor from '../../components/practice/ProgressBarChartHor'
import Legend from '../../components/Legend'

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
      {
        envData === null ? 
        null
        :
        <div className={styles.data_container}>
          
          <div>
            <div>
              <div>
                <i class="bi bi-thermometer-half"></i>
                <span> 온도</span>
              </div>

              <div>
                <span>※ 현재 내부 온도 : </span>
                {envData[envData.length - 1][dataKey.temp]}
              </div>
            </div>

            <DataChart today={today} data={envData} dataKey={dataKey.temp}/>
          </div>

          <div>
            <div>
              <div>
                <i class="bi bi-droplet-half"></i>
                <span> 습도</span>
              </div>

              <div>
                <span>※ 현재 내부 습도 : </span>
                {envData[envData.length - 1][dataKey.humi]}
              </div>
            </div>

            <DataChart today={today} data={envData} dataKey={dataKey.humi}/>
          </div>

          <div>
            <div>
              <div>
                <i class="bi bi-lightbulb"></i>
                <span>조도</span>
              </div>

              <div>
                <span>※ 현재 내부 조도 : </span>
                {envData[envData.length - 1][dataKey.illumi]}
              </div>
            </div>
            
            <DataChart today={today} data={envData} dataKey={dataKey.illumi}/>
          </div>

        </div>
      }

      <div className={styles.bottom}>
        <div className={styles.test}>
          <div>
            <p>CO2 <span>{appropriateNowData.co2}</span></p>
            <ProgressBarChartHor 
              max={appropriateData.co2} 
              current={appropriateNowData.co2} 
              danger={appropriateDangerData.co2}
            />
          </div>
  
          <div>
            <p>NO2 <span>{appropriateNowData.no2}</span></p>
            <ProgressBarChartHor
              max={appropriateData.no2} 
              current={appropriateNowData.no2} 
              danger={appropriateDangerData.no2} 
            />
          </div>
  
          <div>
            <p>NH3 <span>{appropriateNowData.nh3}</span></p>
            <ProgressBarChartHor 
              max={appropriateData.nh3} 
              current={appropriateNowData.nh3} 
              danger={appropriateDangerData.nh3} 
            />
          </div>
  
          <div>
            <p>H2S <span>{appropriateNowData.h2s}</span></p>
            <ProgressBarChartHor 
              max={appropriateData.h2s} 
              current={appropriateNowData.h2s} 
              danger={appropriateDangerData.h2s} 
            />
          </div>
  
        </div>
        <br />
        <Legend />
      </div>

      
    </div>
  )
}

export default EnvironmentDetail