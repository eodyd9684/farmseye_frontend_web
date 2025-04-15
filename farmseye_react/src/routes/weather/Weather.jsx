import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from './Weather.module.css'

const Weather = ({today}) => {
  const [hour, setHour] = useState(''); 

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

    setHour(today.substring(11, 13)); //공백 기준 분할 → 두 번째 요소 선택

    // 클린업 함수 (컴포넌트가 언마운트될 때 setInterval 정리)
    return () => clearInterval(interval);
  }, [city]);

  const getDayOfWeek = () => {
    const dayOfWeek = new Date(today).getDay();

    if(dayOfWeek === 0){
      return '일';
    }
    else if(dayOfWeek === 1){
      return '월';
    }
    else if(dayOfWeek === 2){
      return '화';
    }
    else if(dayOfWeek === 3){
      return '수';
    }
    else if(dayOfWeek === 4){
      return '목';
    }
    else if(dayOfWeek === 5){
      return '금';
    }
    else if(dayOfWeek === 6){
      return '토';
    }
  }


  return (
    <>
      
      {
      weather ? 
        (
          <div className={styles.weather_container}>
            <div className={styles.weather_icon}>
              {weatherIcons[weather.weather[0].main] || "🌍"}
              <p>{today}{`(${getDayOfWeek()})`}</p>
            </div>

            <div>
              <p>날씨 : <span>{weather.weather[0].description}</span></p>
              <p>온도 : <span>{weather.main.temp} °C</span></p>
              <p>습도 : <span>{weather.main.humidity} %</span></p>
            </div>
            
            <div>
              <p>기압 : <span>{weather.main.feels_like} (hPa)</span></p>
              <p>풍속 : <span>{weather.wind.speed} (m/)</span></p>
              <p>풍향 : <span>{weather.wind.deg} (도)</span></p>
              <p>강수량 : <span>{weather.rain?.["1h"] ??  "0"} (mm)</span></p>
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