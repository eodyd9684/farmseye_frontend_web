import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EnviromentLineChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temp" stroke="#8884d8" name="온도" />
        <Line type="monotone" dataKey="humi" stroke="#82ca9d" name="습도" />
        <Line type="monotone" dataKey="illumi" stroke="#ffc658" name="조도" />
      </LineChart>
    </ResponsiveContainer>
  );
};
