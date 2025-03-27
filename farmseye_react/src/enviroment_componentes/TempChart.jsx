import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import FarmseyeInput from '../common_component/FarmseyeInput'
import FarmseyeButton from '../common_component/FarmseyeButton'
import styles from './TempChart.module.css'

const TempChart = () => {
  //데이터베이스에서 온도 데이터 받아올 변수
  const [tempData, setTempData] = useState([
    {
      no : 1,
      temp : 26.5
    },
    {
      no : 2,
      temp : 27.2
    },
    {
      no : 3,
      temp : 28.5
    },
    {
      no : 4,
      temp : 24.5
    }
  ]);

  const tempLabel = <i class="bi bi-thermometer-half"></i>;

  


  const chartRef = useRef(null);
  let chartInstance = null;
  
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const createChart = () => {
      Chart.register(...registerables);

      const minTemp = Math.min(...tempData.map((t) => t.temp));
      const maxTemp = Math.max(...tempData.map((t) => t.temp));

      // eslint-disable-next-line react-hooks/exhaustive-deps
      chartInstance = new Chart(ctx, {
        type: "line", //그래프 타입 선택
        data: {
          labels: tempData.map((t) => {return t.no}), //temp.map((t) => {t.time})
          datasets: [
            {
              label: "온도",
              data: tempData.map((t) => {return t.temp}), //temp.map((t) => {t.temperature})
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
              min : minTemp - 1,
              max : maxTemp + 1,
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
      <div className={styles.temp_chart_title}>
        <i class="bi bi-thermometer-half"></i>
        <span>온도</span>
      </div>

      <div>
        <span>현재 내부 온도 : </span>
        {tempData[tempData.length - 1].temp}
      </div>

      <canvas ref={chartRef} className={styles.chart}/>
    </div>
  )
}

export default TempChart