// src/components/RuleEditor.js
import React, { useState } from 'react';

function RuleEditor() {
  const [rules, setRules] = useState([
    {
      id: 1,
      sensor: 'TEMP',
      condition: '>=',
      value: 30,
      action: 'servo',
      actionValue: 20,
      blinkInterval: 0.5
    },
    {
      id: 2,
      sensor: 'NH3',
      condition: '>=',
      value: 2,
      action: 'led',
      actionValue: 'blink',
      blinkInterval: 0.5
    }
  ]);
  
  const [status, setStatus] = useState('');

  const addRule = () => {
    const newRule = {
      id: Date.now(),
      sensor: 'TEMP',
      condition: '>=',
      value: 0,
      action: 'servo',
      actionValue: 0,
      blinkInterval: 0.5
    };
    
    setRules([...rules, newRule]);
  };

  const updateRule = (id, field, value) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, [field]: value } : rule
    ));
  };

  const deleteRule = (id) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const saveRules = async () => {
    try {
      setStatus('규칙 저장 중...');
      const response = await fetch('http://192.168.30.236:5000/api/auto-control', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rules),
      });
      
      if (!response.ok) {
        throw new Error('규칙 저장 중 오류가 발생했습니다.');
      }
      
      setStatus('규칙이 성공적으로 저장되었습니다.');
    } catch (error) {
      setStatus(`오류: ${error.message}`);
    }
  };

  return (
    <div className="rule-editor">
      <h2>자동화 규칙</h2>
      <p>센서 데이터를 기반으로 자동 제어 규칙을 설정하세요.</p>
      
      <div className="rules-list">
        {rules.map(rule => (
          <div key={rule.id} className="rule-card">
            <div className="rule-header">
              <h3>규칙 #{rule.id}</h3>
              <button 
                className="delete-button"
                onClick={() => deleteRule(rule.id)}
              >
                삭제
              </button>
            </div>
            
            <div className="rule-condition">
              <select
                value={rule.sensor}
                onChange={(e) => updateRule(rule.id, 'sensor', e.target.value)}
              >
                <option value="TEMP">온도 (TEMP)</option>
                <option value="HUMI">습도 (HUMI)</option>
                <option value="NO2">이산화질소 (NO2)</option>
                <option value="CO2">이산화탄소 (CO2)</option>
                <option value="NH3">암모니아 (NH3)</option>
                <option value="H2S">황화수소 (H2S)</option>
                <option value="TOLUENE">톨루엔 (TOLUENE)</option>
                <option value="ILLUMI">조도 (ILLUMI)</option>
              </select>
              
              <select
                value={rule.condition}
                onChange={(e) => updateRule(rule.id, 'condition', e.target.value)}
              >
                <option value=">=">크거나 같을 때 (≥)</option>
                <option value="<=">작거나 같을 때 (≤)</option>
                <option value=">">클 때 (j)</option>
                <option value="<">작을 때 (c)</option>
                <option value="==">같을 때 (=)</option>
              </select>
              
              <input
                type="number"
                step="0.1"
                value={rule.value}
                onChange={(e) => updateRule(rule.id, 'value', parseFloat(e.target.value))}
              />
            </div>
            
            <div className="rule-action">
              <select
                value={rule.action}
                onChange={(e) => updateRule(rule.id, 'action', e.target.value)}
              >
                <option value="servo">서보모터 각도 변경</option>
                <option value="led">LED 제어</option>
              </select>
              
              {rule.action === 'servo' ? (
                <div className="action-value">
                  <input
                    type="range"
                    min="0"
                    max="180"
                    value={rule.actionValue}
                    onChange={(e) => updateRule(rule.id, 'actionValue', parseInt(e.target.value))}
                  />
                  <span>{rule.actionValue}°</span>
                </div>
              ) : (
                <div className="action-value">
                  <select
                    value={rule.actionValue}
                    onChange={(e) => updateRule(rule.id, 'actionValue', e.target.value)}
                  >
                    <option value="on">켜기</option>
                    <option value="off">끄기</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="rule-buttons">
        <button onClick={addRule}>규칙 추가</button>
        <button onClick={saveRules} className="save-button">규칙 저장</button>
      </div>
      
      {status && <p className="status-message">{status}</p>}
    </div>
  );
}

export default RuleEditor;