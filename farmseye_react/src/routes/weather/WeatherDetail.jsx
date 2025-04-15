import React, { useEffect, useState } from 'react'
import styles from './WeatherDetail.module.css'
import Weather from './Weather'
import WeekWeather from './WeekWeather'
import { useSelector } from 'react-redux'

const WeatherDetail = () => {

  //오늘 날짜 받아오기
  const today = useSelector(state => state.today.today);
        
      

  return (
    <div className={styles.container}>
      <div>
        <Weather today={today} />
      </div>
      
      <div>
        <WeekWeather />
      </div>
    </div>
  )
}

export default WeatherDetail