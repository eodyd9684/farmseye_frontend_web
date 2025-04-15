import React, { useState } from 'react';
import GaugeComponent from 'react-gauge-component';

const GaugeDesign = ({appropriate}) => {
  const temperature = appropriate.now
  const limit1 = appropriate.min
  const limit2 = appropriate.max

  return (
    <div style={{ position: 'relative', width:'350px' }}>
      <GaugeComponent
        type="semicircle"
        arc={{
          width: 0.2,
          padding: 0.005,
          subArcs: [
            { limit: limit1, color: '#FFC145' },
            { limit: limit2, color: '#16C47F' },
            { color: '#FFC145' },
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
        minValue={appropriate.min - 5}
        maxValue={appropriate.max + 5}
      />
      <div style={{
        position: 'absolute',
        top: '25%', // 위치 조정
        left: '15%', // 위치 조정
        fontSize: '0.8rem',
        color: '#bbb',
      }}>
        {limit1} 
      </div>
      <div style={{
        position: 'absolute',
        top: '25%', // 위치 조정
        right: '15%', // 위치 조정
        fontSize: '0.8rem',
        color: '#bbb',
      }}>
        {limit2} 
      </div>

    </div>
  )
}

export default GaugeDesign