// src/components/ControlPanel.js
import React, { useState } from 'react';

function ControlPanel() {
  const [servoAngle, setServoAngle] = useState(0);
  const [ledState, setLedState] = useState('off');
  const [blinkInterval, setBlinkInterval] = useState(0.5);
  const [status, setStatus] = useState('');

  const controlServo = async () => {
    try {
      setStatus('서보모터 제어 중...');
      const response = await fetch('http://192.168.30.236:5000/api/control/servo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ angle: servoAngle }),
      });
      
      if (!response.ok) {
        throw new Error('서보모터 제어 중 오류가 발생했습니다.');
      }
      
      setStatus('서보모터가 성공적으로 제어되었습니다.');
    } catch (error) {
      setStatus(`오류: ${error.message}`);
    }
  };

  const controlLed = async (state) => {
    try {
      setStatus('LED 제어 중...');
      const requestBody = { state };
      
      if (state === 'blink') {
        requestBody.interval = blinkInterval;
      }
      
      const response = await fetch('http://192.168.30.236:5000/api/control/led', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        throw new Error('LED 제어 중 오류가 발생했습니다.');
      }
      
      setLedState(state);
      setStatus('LED가 성공적으로 제어되었습니다.');
    } catch (error) {
      setStatus(`오류: ${error.message}`);
    }
  };

  return (
    <div className="control-panel">
      <h2>수동 제어</h2>
      
      <div className="control-section">
        <h3>서보모터 제어</h3>
        <div className="control-row">
          <label>
            각도: 
            <input 
              type="range" 
              min="0" 
              max="180" 
              value={servoAngle} 
              onChange={(e) => setServoAngle(parseInt(e.target.value))} 
            />
            {servoAngle}°
          </label>
          <button onClick={controlServo}>서보 제어</button>
        </div>
      </div>
      
      <div className="control-section">
        <h3>LED 제어</h3>
        <div className="control-row">
          <button 
            className={ledState === 'on' ? 'active' : ''} 
            onClick={() => controlLed('on')}
          >
            켜기
          </button>
          <button 
            className={ledState === 'off' ? 'active' : ''} 
            onClick={() => controlLed('off')}
          >
            끄기
          </button>
          <button 
            className={ledState === 'blink' ? 'active' : ''} 
            onClick={() => controlLed('blink')}
          >
            깜빡임
          </button>
        </div>
        
        {ledState === 'blink' && (
          <div className="control-row">
            <label>
              깜빡임 간격: 
              <input 
                type="range" 
                min="0.1" 
                max="2" 
                step="0.1" 
                value={blinkInterval} 
                onChange={(e) => setBlinkInterval(parseFloat(e.target.value))} 
              />
              {blinkInterval}초
            </label>
            <button onClick={() => controlLed('blink')}>적용</button>
          </div>
        )}
      </div>
      
      {status && <p className="status-message">{status}</p>}
    </div>
  );
}

export default ControlPanel;