import React from 'react'
import { XAxis, YAxis, Tooltip, Legend, LineChart, Line, ResponsiveContainer, CartesianGrid } from 'recharts';

const SimpleChart = ({dataKey, data, legend = null, yAxis=''}) => {
  const CustomLabel = ({ x, y, value }) => (
    <text x={x} y={y - 10} fill="#555" fontSize={12} textAnchor="middle" fontWeight={'bold'} >
      {value}
    </text>
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart key={Math.random()} data={data}>

        <CartesianGrid 
          stroke='#ccc' 
          strokeDasharray={'5 5'} 
          strokeLinecap='round' 
          horizontal={true} 
          vertical={false} 
        />

        <XAxis 
          dataKey='timestamp'
          tickFormatter={(value) => `${value.slice(14, 16)}`}
          tickLine={{ strokeDasharray: '3 3', stroke: '#888', strokeWidth: 1 }}
          tickSize={15}
          padding={{ left: 20, right: 20 }}
          axisLine={{ stroke: '#000000' }}
        />

        <YAxis 
          domain={([dataMin, dataMax]) => [
            Math.floor(dataMin / 10) * 10,
            Math.ceil(dataMax / 10) * 10,
          ]}
          tickFormatter={(value) => `${value} ${yAxis}`}
          tickLine={{ strokeDasharray: '3 3', stroke: '#888', strokeWidth: 1 }}
          tickSize={15}
          padding={{ top: 30, bottom: 20 }}
          axisLine={{ stroke: '#000000' }}
        />

        <Tooltip 
          // 라벨
          labelStyle={{ color: '#333', fontWeight: 'bold' }}
          // 외부 컨테이너 디자인
          wrapperStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
          //커서 효과 on/off
          cursor={false}
        />

        <Legend 
          // 컴포넌트로 교체하는 속성
          content={ legend }
        />

        <Line 
          type="natural" 
          dataKey={dataKey} 
          stroke="crimson" 
          strokeDasharray={'3 3'}
          dot={{ r: 6 , fill: 'crimson', stroke: 'none' }}
          label={<CustomLabel />} 
          activeDot={{ r: 10 }} 
        />

      </LineChart>
    </ResponsiveContainer>
  )
}

export default SimpleChart