import React, { useState } from 'react';
import GaugeComponent from 'react-gauge-component';

const GaugeDesign = () => {
  const [temperature, setTemperature] = useState(25);
  const [limit1, setLimit1] = useState(22);
  const [limit2, setLimit2] = useState(28);

  return (
    <div style={{ position: 'relative' }}>
      <GaugeComponent
        type="semicircle"
        arc={{
          width: 0.2,
          padding: 0.005,
          subArcs: [
            { limit: limit1, color: '#F5CD19' },
            { limit: limit2, color: '#5BE12C' },
            { color: '#EA4228' },
          ],
        }}
        pointer={{
          color: '#000000',
          length: 0.8,
          width: 5,
        }}
        labels={{
          valueLabel: {
            formatTextValue: (value) => `${value}°C`,
            style: {
              fontSize: '20px',
              fill: '#eee',
              transform: 'translate(0px, 150px)'
            }
          },
        }}
        value={temperature}
        minValue={0}
        maxValue={40}
      />
      <div style={{
        position: 'absolute',
        top: '35%', // 위치 조정
        left: '13%', // 위치 조정
        fontSize: '2rem',
        color: '#000',
      }}>
        {limit1} °C
      </div>
      <div style={{
        position: 'absolute',
        top: '35%', // 위치 조정
        right: '13%', // 위치 조정
        fontSize: '2rem',
        color: '#000',
      }}>
        {limit2} °C
      </div>

      <div style={{
        position: 'absolute',
        top: '92%', // 위치 조정
        left: '5%', // 위치 조정
        fontSize: '2rem',
        color: '#000',
      }}>
        0°C
      </div>
      <div style={{
        position: 'absolute',
        top: '92%', // 위치 조정
        right: '4%', // 위치 조정
        fontSize: '2rem',
        color: '#000',
      }}>
        40 °C
      </div>
    </div>
  )
}

export default GaugeDesign