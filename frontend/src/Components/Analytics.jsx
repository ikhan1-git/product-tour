import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CommonHeader from './Common/CommonHeader';
import SelectInput from './Common/SelectInput';
const data = [
  { name: 'Jan', views: 400, completions: 240 },
  { name: 'Feb', views: 300, completions: 139 },
  { name: 'Mar', views: 200, completions: 980 },
  { name: 'Apr', views: 278, completions: 390 },
  { name: 'May', views: 189, completions: 480 },
];
  const filterData = [
    { value: 'Last 3 days', label: 'Last 3 days' },
    { value: 'Last 30 days', label: 'Last 30 days' },
    { value: 'Last 3 months', label: 'Last 3 months' },
  ];
function Analytics() {
  return (
    <>
    <CommonHeader title ="Dashboard" action={<SelectInput options={filterData} />} /> 
    {/* // also learn about renderSelect if you forgot */}
    <ResponsiveContainer width="50%" height={300}>
    <p>Analytics Overview</p>
    <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="views" stroke="#8884d8" />
        <Line type="monotone" dataKey="completions" stroke="#82ca9d" />
    </LineChart>
    </ResponsiveContainer>
    </>
  );
}

export default Analytics;
