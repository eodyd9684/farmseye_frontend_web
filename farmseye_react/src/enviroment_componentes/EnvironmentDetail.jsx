import React from 'react'
import styles from './EnvironmentDetail.module.css'
import Weather from './Weather'

const EnvironmentDetail = () => {



  return (
    <div className={styles.container}>
      <div className={styles.data_container}>

        <div className={styles.weather}>
          
          <Weather />
          
        </div>

        <div>요일별 온도</div>

        <div>요일별 습도</div>
      </div>
    </div>
  )
}

export default EnvironmentDetail