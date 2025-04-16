import React, { useState } from 'react';
import GaugeComponent from 'react-gauge-component';

const GaugeDesign = ({appropriate, min, max}) => {
  const temperature = appropriate
  const limit1 = min
  const limit2 = max

  return (
    <div style={{ position: 'relative' }}>
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
              fontSize: '0rem',
              fill: 'red',
              transform: 'translate(0px, 0px)'
            }
          },
        }}
        value={temperature}
        minValue={limit1 - 5}
        maxValue={limit2 + 5}
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