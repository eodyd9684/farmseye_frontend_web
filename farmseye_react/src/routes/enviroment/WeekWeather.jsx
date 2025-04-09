import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from './WeekWeather.module.css'

const WeekWeather = () => {

  //날씨 데이터 받아온걸 저장할 변수
  const [weather, setWeather] = useState(null);
  
  //특정 지역의 날씨를 조회하기 위해 지정한 변수
  const [city, setCity] = useState('Ulsan'); 

  //OpenWeatherMap API 키 입력
  const API_KEY = "d2a371b0579c616f5a7b1edc780996c0"; 


  //날씨에 따라 들어갈 아이콘
  const weatherIcons = {
    Clear: <i class="bi bi-brightness-high-fill"></i>,
    Clouds: <i class="bi bi-cloud-fill"></i>,
    Rain: <i class="bi bi-cloud-drizzle"></i>,
    Thunderstorm: <i class="bi bi-cloud-lightning-rain"></i>,
    Snow: <i class="bi bi-snow2"></i>,
    Mist: <i class="bi bi-water"></i>,
  };

  

  //날씨 api를 받아오는 useEffect함수
  useEffect(() => {

    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=kr`
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
    <div >
    <h2>{city}의 주간 날씨</h2>
    {weather ? (
      <div className={styles.week_weather}>
        {weather.list
          .filter((item) => item.dt_txt.includes("12:00:00")) // 정오 데이터만 필터링
          .map((item, index) => {
            const date = new Date(item.dt * 1000);
            const day = date.toLocaleDateString('ko-KR', { weekday: 'long' });

            return (
              <div key={index}>
                <p className={styles.day}>{day}</p>
                <div  className={styles.weather_card}>
                  {/* 날씨 아이콘 */}
                  <div>
                    {weatherIcons[item.weather[0].main] || item.weather[0].main}
                  </div>
  
                  <div>
                    <p>{date.toLocaleDateString('ko-KR')}</p>
    
                    <p>온도: {item.main.temp}℃</p>
                    
                    <p>날씨: {item.weather[0].description}</p>
                  </div>
                </div>
             </div>
            );
          })}
      </div>
      ) : (
        <p>날씨 정보를 불러오는 중...</p>
      )}
    </div>
  )
}

export default WeekWeather