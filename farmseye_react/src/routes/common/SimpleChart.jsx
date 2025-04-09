import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, ResponsiveContainer, PolarGrid, CartesianGrid } from 'recharts';

const SimpleChart = ({data}) => {
  const CustomLabel = ({ x, y, value }) => (
    <text x={x} y={y - 10} fill="#555" fontSize={12} textAnchor="middle">
      {value}
    </text>
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart key={Math.random()} data={data}>
        <CartesianGrid stroke='#aaa' strokeDasharray={'5 5'} strokeLinecap='round' horizontal={true} vertical={false} />
        <XAxis dataKey="no" />
        <YAxis domain={([dataMin, dataMax]) => [
          Math.floor(dataMin / 10) * 10,
          Math.ceil(dataMax / 10) * 10,
        ]}/>
        <Tooltip />
        <Legend />
        <Line type="natural" dataKey="temp" stroke="red" label={<CustomLabel />} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default SimpleChart