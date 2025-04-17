import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './Weather.module.css';

const Weather = ({ today }) => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Ulsan');
  const API_KEY = 'd2a371b0579c616f5a7b1edc780996c0';

  const weatherIcons = {
    Clear: '/images/icons8-태양.gif',
    Clouds: '/images/icons8-바람이-부는-날씨.gif',
    Rain: '/images/icons8-비.gif',
    Thunderstorm: '/images/icons8-구름_번개.gif',
    Snow: '/images/icons8-눈.gif',
    Mist: '/images/icons8-비조금.gif',
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`
        );
        setWeather(response.data);
      } catch (error) {
        console.error('날씨 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 60000);
    return () => clearInterval(interval);
  }, [city]);

  const getDayOfWeek = () => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[new Date(today).getDay()];
  };

  return (
    <>
      {weather ? (
        <div className={styles.weatherCard}>
          <div className={styles.mainInfo}>
            <img src={weatherIcons[weather.weather[0].main]} alt="weather icon" />
            <div>
              <h2>{weather.weather[0].main}</h2>
              <h1>{Math.round(weather.main.temp)}°C</h1>
              <p>{city} / {today} ({getDayOfWeek()})</p>
            </div>
          </div>

          <div className={styles.details}>
            <div><span>💧 습도:</span> {weather.main.humidity}%</div>
            <div><span>🌡 체감:</span> {weather.main.feels_like}°C</div>
            <div><span>🌬 풍속:</span> {weather.wind.speed} m/s</div>
            <div><span>🧭 풍향:</span> {weather.wind.deg}°</div>
            <div><span>🌧 강수량:</span> {weather.rain?.['1h'] ?? '0'} mm</div>
            <div><span>📈 기압:</span> {weather.main.pressure} hPa</div>
          </div>
        </div>
      ) : (
        <p>날씨 정보를 가져오는 중...</p>
      )}
    </>
  );
};

export default Weather;
