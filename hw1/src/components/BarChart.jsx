/*
BarChar Component

This component creates a bar char.
The chart needs custom data, width and height.
*/

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register the components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ data, width = 400, height = 400 }) => {
  const barData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Read Spanish 20 min',
        data: data.values,
        backgroundColor: 'rgba(100,180,246,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={barData} width={width} height={height} />;
};

export default BarChart;
