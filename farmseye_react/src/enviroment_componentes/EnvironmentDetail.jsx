import React from 'react'
import styles from './EnvironmentDetail.module.css'
import Weather from './Weather'
import TempChart from './TempChart'

const EnvironmentDetail = () => {



  return (
    <div className={styles.container}>
      <div className={styles.data_container}>

        <div>         
          <Weather />
        </div>

        <div>
          <TempChart />
        </div>

        <div>요일별 습도</div>
      </div>
    </div>
  )
}

export default EnvironmentDetail