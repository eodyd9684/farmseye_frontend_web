import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import FarmseyeInput from "../../common_component/FarmseyeInput";
import FarmseyeButton from "../../common_component/FarmseyeButton";
import styles from "./TempChart.module.css";
import SimpleChart from "../../components/SimpleChart";
import SimpleBarChart from "../../components/SimpleBarChart";

const TempChart = ({ today }) => {
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

      

      <div className={styles.chart_container}>
        <SimpleChart
          dataKey={"temp"}
          data={tempData}
          legend={
            <div>
              <span>{today}</span>
              <span> 온도</span>
            </div>
          }
          yAxis={"℃"}
        />
      </div>
    </div>
  );
};

export default TempChart;
