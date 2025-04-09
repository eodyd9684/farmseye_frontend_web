import React, { useEffect, useRef, useState } from 'react'
import styles from './HumidityChart.module.css'
import { Chart, registerables } from 'chart.js';

const HumidityChart = () => {

 //데이터베이스에서 온도 데이터 받아올 변수
  const [humiData, setHumiData] = useState([
    {
      no : 1,
      humi : 64
    },
    {
      no : 2,
      humi : 58
    },
    {
      no : 3,
      humi : 72
    },
    {
      no : 4,
      humi : 66
    },
  ]);



  const chartRef = useRef(null);
  let chartInstance = null;
  
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const createChart = () => {
      Chart.register(...registerables);

      const minTemp = Math.min(...humiData.map((t) => t.humi));
      const maxTemp = Math.max(...humiData.map((t) => t.humi));

      // eslint-disable-next-line react-hooks/exhaustive-deps
      chartInstance = new Chart(ctx, {
        type: "line", //그래프 타입 선택
        data: {
          labels: humiData.map((t) => {return t.no}), //temp.map((t) => {t.time})
          datasets: [
            {
              label: "습도",
              data: humiData.map((t) => {return t.humi}), //temp.map((t) => {t.temperature})
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgb(0, 0, 0)",
                "rgb(12, 156, 252)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },

          scales: {
            x:{
              maxTicksLimit : 10,
              grid:{
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                display: true,
              },
              min : minTemp - 10,
              max : maxTemp + 10,
            },
          },
        },
      });
    };

    const destroyChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
    };

    destroyChart(); // 기존 차트 파괴
    createChart(); // 새로운 차트 생성

    return () => {
      destroyChart(); // 컴포넌트가 unmount될 때 차트 파괴
    };
  }, []);



  return (
    <div>
      <div className={styles.humi_chart_title}>
        <i class="bi bi-droplet-half"></i>
        <span>습도</span>
      </div>

      <div>
        <span>현재 내부 온도 : </span>
        {humiData[humiData.length - 1].humi}
      </div>

      <div className={styles.chart}>
        <canvas ref={chartRef} />
      </div>
     
    </div>
  )
}

export default HumidityChart