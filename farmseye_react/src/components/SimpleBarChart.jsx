import React from 'react'
import { XAxis, YAxis, Tooltip, Legend, LineChart, Line, ResponsiveContainer, CartesianGrid, Bar, BarChart } from 'recharts';

const SimpleBarChart = ({dataKey, rawData, legend = null, yAxis=''}) => {
  // 배열 데이터를 객체 형태로 변환
  const formattedData = rawData.map((value, index) => ({
    no: `${index * 2} 시`, // Y축에 표시될 값
    value: value,  // X축에 표시될 값
  }));

  const CustomLabel = ({ x, y, value }) => (
    <text x={x + 30} y={y + 16} fill="#eee" fontSize={14} textAnchor='start' fontWeight={'bold'} >
      {value} ℃
    </text>
  );

  

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart key={Math.random()} data={formattedData} layout="vertical">
        <CartesianGrid
          stroke="#ccc"
          strokeDasharray="5 5"
          strokeLinecap="round"
          horizontal={false}
          vertical={true}
        />

        <XAxis
          type="number" // X축을 숫자형으로 설정
          padding={{ left:10, right : 30 }}
          tick={false}
          tickLine={false}
          axisLine={{ stroke: '#000000' }}
        />

        <YAxis
          padding={{top : 10, bottom : 10}}
          type="category" // Y축을 범주형으로 설정
          dataKey="no" // Y축 데이터 키
          tickFormatter={(value) => `${value}`}
          tickLine={{ strokeDasharray: '3 3', stroke: '#888', strokeWidth: 1 }}
          tickSize={10}
          axisLine={{ stroke: '#000000' }}
        />

        <Tooltip
          labelStyle={{ color: '#333', fontWeight: 'bold' }}
          wrapperStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
          cursor={false}
        />

        <Legend content={legend} />

        <Bar 
          dataKey="value" 
          fill="#aaa" 
          strokeDasharray="3 3" 
          label={<CustomLabel />} 
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default SimpleBarChart