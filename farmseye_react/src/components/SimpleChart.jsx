import React from 'react'
import { XAxis, YAxis, Tooltip, Legend, LineChart, Line, ResponsiveContainer, CartesianGrid } from 'recharts';

const SimpleChart = ({dataKey, data, legend = null, yAxis=''}) => {
  const CustomLabel = ({ x, y, value }) => (
    <text 
      x={x} 
      y={y - 10} 
      fill="#333" 
      fontSize={13} 
      textAnchor="middle" 
      fontWeight='600'
      style={{ fontFamily: 'Pretendard, sans-serif' }}
    >
      {value}
    </text>
  );


  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart key={Math.random()} data={data}>
        
        <linearGradient id="lineColor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="crimson" stopOpacity={0.8} />
          <stop offset="100%" stopColor="crimson" stopOpacity={0.2} />
        </linearGradient>

        <CartesianGrid 
          stroke='#ccc' 
          strokeDasharray={'5 5'} 
          strokeLinecap='round' 
          horizontal={false} 
          vertical={false} 
        />

        <XAxis 
          dataKey='timestamp'
          tickFormatter={(value) => `${value.slice(14, 16)}`}
          tickLine={{ strokeDasharray: '3 3', stroke: 'grey', strokeWidth: 1 }}
          tickSize={15}
          padding={{ left: 20, right: 20 }}
          axisLine={{ stroke: 'grey' }}
        />

        <YAxis 
          domain={([dataMin, dataMax]) => [
            Math.floor(dataMin / 10) * 10,
            Math.ceil(dataMax / 10) * 10,
          ]}
          tickFormatter={(value) => `${value} ${yAxis}`}
          tickLine={{ strokeDasharray: '3 3', stroke: 'grey', strokeWidth: 1 }}
          tickSize={15}
          padding={{ top: 30, bottom: 20 }}
          axisLine={{ stroke: 'grey' }}
        />

        {/* <Tooltip 
          // 라벨
          labelStyle={{ color: '#333', fontWeight: 'bold' }}
          // 외부 컨테이너 디자인
          wrapperStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
          //커서 효과 on/off
          cursor={false}
        /> */}
        <Tooltip
          formatter={(value, name) => [`${value} ${yAxis}`, name]}
          labelFormatter={(label) => `시간: ${label}`}
          contentStyle={{ backgroundColor: '#fefefe', border: '1px solid #bbb', borderRadius: '8px' }}
        />

        
        <Legend 
          // 컴포넌트로 교체하는 속성
          content={ legend }
        />

        <Line
          type="monotone"
          dataKey={dataKey}
          stroke="crimson"
          strokeWidth={2.5}
          dot={{ r: 5 }}
          activeDot={{ r: 8 }}
          isAnimationActive={true}
          animationDuration={1000}
          animationEasing="ease-in-out"
        />

        

      </LineChart>
    </ResponsiveContainer>
  )
}

export default SimpleChart