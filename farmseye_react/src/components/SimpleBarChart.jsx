// import React from 'react'
// import { XAxis, YAxis, Tooltip, Legend, LineChart, Line, ResponsiveContainer, CartesianGrid, Bar, BarChart } from 'recharts';

// const SimpleBarChart = ({dataKey, rawData, legend = null, yAxis=''}) => {
//   // 배열 데이터를 객체 형태로 변환
//   const formattedData = rawData.map((value, index) => ({
//     no: `${index * 2} 시`, // Y축에 표시될 값
//     value: value,  // X축에 표시될 값
//   }));

//   const CustomLabel = ({ x, y, value }) => (
//     <text x={x + 30} y={y + 16} fill="#eee" fontSize={14} textAnchor='start' fontWeight={'bold'} >
//       {value} ℃
//     </text>
//   );

  

//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <BarChart key={Math.random()} data={formattedData} layout="vertical">
//         <CartesianGrid
//           stroke="#ccc"
//           strokeDasharray="5 5"
//           strokeLinecap="round"
//           horizontal={false}
//           vertical={true}
//         />

//         <XAxis
//           type="number" // X축을 숫자형으로 설정
//           padding={{ left:10, right : 30 }}
//           tick={false}
//           tickLine={false}
//           axisLine={{ stroke: '#000000' }}
//         />

//         <YAxis
//           padding={{top : 10, bottom : 10}}
//           type="category" // Y축을 범주형으로 설정
//           dataKey="no" // Y축 데이터 키
//           tickFormatter={(value) => `${value}`}
//           tickLine={{ strokeDasharray: '3 3', stroke: '#888', strokeWidth: 1 }}
//           tickSize={10}
//           axisLine={{ stroke: '#000000' }}
//         />

//         <Tooltip
//           labelStyle={{ color: '#333', fontWeight: 'bold' }}
//           wrapperStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
//           cursor={false}
//         />

//         <Legend content={legend} />

//         <Bar 
//           dataKey="value" 
//           fill="#aaa" 
//           strokeDasharray="3 3" 
//           label={<CustomLabel />} 
//         />
//       </BarChart>
//     </ResponsiveContainer>
//   )
// }

// export default SimpleBarChart

import React from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

const SimpleBarChart = ({ rawData, legend = null, yAxis = '' }) => {
  const formattedData = rawData.map((value, index) => ({
    no: `${index * 2}시`, // Y축 값
    value
  }));

  const CustomLabel = ({ x, y, value }) => (
    <text
      x={x + 10}
      y={y + 14}
      fill="#4A90E2"
      fontSize={13}
      textAnchor="start"
      fontWeight="500"
      fontFamily="Pretendard"
    >
      {value}
    </text>
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={formattedData} layout="vertical">
        <CartesianGrid
          stroke="#f0f0f0"
          strokeDasharray="3 3"
          vertical={true}
          horizontal={false}
        />

        <XAxis
          type="number"
          tick={false}
          axisLine={false}
        />

        <YAxis
          type="category"
          dataKey="no"
          axisLine={false}
          tickLine={false}
          tick={{
            fill: '#444',
            fontSize: 13,
            fontWeight: 500,
            fontFamily: 'Pretendard',
          }}
        />

        <Tooltip
          formatter={(value) => [`${value} ${yAxis}`, '측정값']}
          labelFormatter={(label) => `시간: ${label}`}
          contentStyle={{
            backgroundColor: '#ffffff',
            border: '1px solid #ddd',
            borderRadius: 8,
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            fontFamily: 'Pretendard',
            fontSize: 13,
          }}
          itemStyle={{ color: '#4A90E2' }}
        />

        <Legend
          content={legend}
          wrapperStyle={{
            fontFamily: 'Pretendard',
            fontSize: 14,
            marginTop: 10,
          }}
        />

        <Bar
          dataKey="value"
          fill="#4A90E2"
          radius={[0, 6, 6, 0]}
          barSize={20}
          label={<CustomLabel />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarChart;
