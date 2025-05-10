// src/components/SensorData.js
import React from 'react';

function SensorData({ data }) {
  if (!data) return <p>데이터가 없습니다.</p>;

  return (
    <div className="sensor-data">
      <h2>센서 데이터</h2>
      <div className="sensor-grid">
        <div className="sensor-card">
          <h3>온도</h3>
          <p className="sensor-value">{data.TEMP}°C</p>
        </div>
        <div className="sensor-card">
          <h3>습도</h3>
          <p className="sensor-value">{data.HUMI}%</p>
        </div>
        <div className="sensor-card">
          <h3>이산화질소 (NO2)</h3>
          <p className="sensor-value">{data.NO2} ppm</p>
        </div>
        <div className="sensor-card">
          <h3>이산화탄소 (CO2)</h3>
          <p className="sensor-value">{data.CO2} ppm</p>
        </div>
        <div className="sensor-card">
          <h3>암모니아 (NH3)</h3>
          <p className="sensor-value">{data.NH3} ppm</p>
        </div>
        <div className="sensor-card">
          <h3>황화수소 (H2S)</h3>
          <p className="sensor-value">{data.H2S} ppm</p>
        </div>
        <div className="sensor-card">
          <h3>톨루엔</h3>
          <p className="sensor-value">{data.TOLUENE} ppm</p>
        </div>
        <div className="sensor-card">
          <h3>조도</h3>
          <p className="sensor-value">{data.ILLUMI}</p>
        </div>
      </div>
      <p className="timestamp">마지막 업데이트: {data.TIMESTAMP}</p>
    </div>
  );
}

export default SensorData;
