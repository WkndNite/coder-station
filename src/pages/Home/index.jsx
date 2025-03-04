import { Line } from '@ant-design/charts';
const data = [
  {
    Date: '2021-01-01',
    scales: 0.1,
  },
  {
    Date: '2021-01-02',
    scales: 0.33,
  },
  {
    Date: '2021-01-03',
    scales: 0.6,
  },
  {
    Date: '2021-01-04',
    scales: 2.1,
  },
];

const config = {
  data,
  padding: 'auto',
  xField: 'Date',
  yField: 'scales',
  xAxis: {
    // type: 'time',
    tickCount: 5,
  },
  smooth: true,
};
const HomePage = () => {
  return <Line {...config} />;
};

export default HomePage;
