import React from "react";
import styles from "./DataChart.module.css";
import SimpleChart from "../../components/SimpleChart";

const DataChart = ({ today, data , dataKey}) => {

  const handleDataKey = (e) => {
    if(e === 'temp'){
      return '℃'
    }
    else if(e === 'humi'){
      return '%'
    }
    else return 'lx'
  }

  return (
    <div>

      <div className={styles.chart_container}>
        <SimpleChart
          dataKey={dataKey}
          data={data}
          legend={
            <div>
            </div>
          }
          yAxis={handleDataKey(dataKey)}
        />
      </div>
    </div>
  );
};

export default DataChart;
