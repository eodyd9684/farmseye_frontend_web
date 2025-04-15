import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const LineChartComponent = ({envData}) => {
  
  return(
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={envData}>
      <CartesianGrid 
        stroke="#ddd"
        strokeDasharray="5 5"
        strokeLinecap="round"
        horizontal={true}
        vertical={true}
      />

      <XAxis 
        dataKey='timestamp'
        tickFormatter={(value) => `${value.slice(11, 16)}`}
        padding={{left : 20, right : 20}}
      />

      <YAxis 
        padding={{top : 40}}
      />

      <Tooltip
        labelFormatter={(label) => `시간: ${label.slice(11,16)}`}
        labelStyle={{ color: '#333', fontWeight: 'bold' }}
        contentStyle={{borderRadius: '10px', backgroundColor : '#fbfbfb', fontWeight : '700' }}
      />

      <Legend />

      <Line type="monotone" dataKey="temp" stroke="#f87171" name="온도" />
      <Line type="monotone" dataKey="humi" stroke="#60a5fa" name="습도" />
      <Line type="monotone" dataKey="illumi" stroke="#34d399" name="조도" />
    </LineChart>
  </ResponsiveContainer>
  );
}

export default LineChartComponent