import React from 'react'
import styles from './EnvironmentDetail.module.css'
import Weather from './Weather'
import TempChart from './TempChart'
import HumidityChart from './HumidityChart'

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

        <div>
          <HumidityChart />
        </div>
      </div>
    </div>
  )
}

export default EnvironmentDetail