// src/MainController.js
import React, { useState, useEffect } from 'react';
import './MainController.css';

// 컴포넌트 가져오기
import SensorData from '../components/SensorData';
import ControlPanel from '../components/ControlPanel';
import RuleEditor from '../components/RuleEditor';
import axios from 'axios';

function MainController() {
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // 센서 데이터 가져오기
  const fetchSensorData = async () => {
    try {
      const response = await fetch('http://192.168.30.236:5000/api/sensor-data');
      if (!response.ok) {
        throw new Error('센서 데이터를 가져오는 중 오류가 발생했습니다.');
      }
      const data = await response.json();
      setSensorData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // const fetchSensorData1 = async () => {
  //   try {
  //     axios.get('http://192.168.30.236:5000/api/sensor-data')
  //     .then(res => {
  //       const data = res.data;
  //       setSensorData(data);
  //       setError(null);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       setError(e.message);
  //     });

  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // 자동화 규칙 체크 및 적용
  const checkRules = async () => {
    try {
      const response = await fetch('http://192.168.30.236:5000/api/rules/check');
      if (!response.ok) {
        throw new Error('규칙 체크 중 오류가 발생했습니다.');
      }
      const result = await response.json();
      console.log('규칙 체크 결과:', result);
      // 여기서 UI 업데이트가 필요하면 상태를 업데이트할 수 있습니다.
    } catch (err) {
      console.error('규칙 체크 오류:', err);
    }
  };

  // 컴포넌트 마운트 시 데이터 로딩 및 주기적인 데이터 업데이트
  useEffect(() => {
    fetchSensorData();

    // 10초마다 센서 데이터 및 규칙 체크
    const interval = setInterval(() => {
      fetchSensorData();
      checkRules();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>스마트 팜 모니터링 & 제어</h1>
        <nav>
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''} 
            onClick={() => setActiveTab('dashboard')}
          >
            대시보드
          </button>
          <button 
            className={activeTab === 'control' ? 'active' : ''} 
            onClick={() => setActiveTab('control')}
          >
            수동 제어
          </button>
          <button 
            className={activeTab === 'rules' ? 'active' : ''} 
            onClick={() => setActiveTab('rules')}
          >
            자동화 규칙
          </button>
        </nav>
      </header>

      <main>
        {loading ? (
          <p>데이터를 불러오는 중...</p>
        ) : error ? (
          <p className="error">오류: {error}</p>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <div className="dashboard">
                <SensorData data={sensorData} />
              </div>
            )}
            
            {activeTab === 'control' && (
              <div className="control-panel">
                <ControlPanel />
              </div>
            )}
            
            {activeTab === 'rules' && (
              <div className="rules-editor">
                <RuleEditor />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default MainController;