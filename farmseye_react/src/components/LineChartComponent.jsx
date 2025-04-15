import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const LineChartComponent = ({envData}) => (
  

  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={envData}>
      <CartesianGrid 
        stroke="#ddd"
        strokeDasharray="5 5"
        strokeLinecap="round"
        horizontal={true}
        vertical={true}
      />

      <XAxis dataKey="time"padding={{left : 20}} />

      <YAxis 
        padding={{top : 40}}
      />

      <Tooltip
        labelStyle={{ color: '#333', fontWeight: 'bold' }}
        wrapperStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
        cursor={true}
      />

      <Legend />
      <Line type="monotone" dataKey="temp" stroke="#f87171" name="온도" />
      <Line type="monotone" dataKey="humi" stroke="#60a5fa" name="습도" />
      <Line type="monotone" dataKey="illumi" stroke="#34d399" name="조도" />
    </LineChart>
  </ResponsiveContainer>
);

export default LineChartComponent