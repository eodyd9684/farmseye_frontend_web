import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from './Weather.module.css'


const Weather = ({today}) => {
  //날씨 데이터 받아온걸 저장할 변수
  const [weather, setWeather] = useState(null);
  
  //특정 지역의 날씨를 조회하기 위해 지정한 변수
  const [city, setCity] = useState('Ulsan'); 

  //OpenWeatherMap API 키 입력
  const API_KEY = "d2a371b0579c616f5a7b1edc780996c0"; 


  //날씨에 따라 들어갈 아이콘
  const weatherIcons = {
    Clear: <img src="/images/icons8-태양.gif" />,
    Clouds: <img src="/images/icons8-바람이-부는-날씨.gif" />,
    Rain: <img src="/images/icons8-비.gif" />,
    Thunderstorm: <img src="/images/icons8-구름_번개.gif" />,
    Snow: <img src="/images/icons8-눈.gif" />,
    Mist: <img src="/images/icons8-비조금.gif" />,
  };

  

  //날씨 api를 받아오는 useEffect함수
  useEffect(() => {

    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("날씨 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchWeather();

    // 60초마다 데이터 업데이트
    const interval = setInterval(() => {
      fetchWeather();
    }, 60000);

    // 클린업 함수 (컴포넌트가 언마운트될 때 setInterval 정리)
    return () => clearInterval(interval);
  }, [city]);


  return (
    <>
      {
      weather ? 
        (
          <div className={styles.weather_container}>
            {weatherIcons[weather.weather[0].main] || "🌍"}
            <div className={styles.weather_info}>
              <p>온도 : {weather.main.temp}°C</p>
              <p>습도 : {weather.main.humidity}%</p>
              <p>날씨 : {weather.weather[0].description}</p>
              <p>날짜 : {today}</p>
            </div>
          </div>
        ) 
        : 
        (<p>날씨 정보를 가져오는 중...</p>)
      }
    
    </>
  )
}

export default Weather