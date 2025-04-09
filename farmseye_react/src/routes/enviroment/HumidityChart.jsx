import React, { useEffect, useRef, useState } from "react";
import styles from "./HumidityChart.module.css";
import { Chart, registerables } from "chart.js";
import SimpleChart from "../../components/SimpleChart";

const HumidityChart = ({ today }) => {
  //데이터베이스에서 온도 데이터 받아올 변수
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

      <div className={styles.chart_container}>
        <SimpleChart
          data={humiData}
          dataKey={"humi"}
          legend={
            <div>
              <span>{today}</span>
              <span> 습도</span>
            </div>
          }
          yAxis={"%"}
        />
      </div>
    </div>
  );
};

export default HumidityChart;
