/*
PieChart Component
This component is for pie chart.
The chart needs custom data and isDarkMode flag.
*/

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, isDarkMode }) => {
  const pieData = {
    labels: ['Success', 'Failure'],
    datasets: [
      {
        data: data,
        backgroundColor: isDarkMode
          ? ['#5B2C6F', '#D81B60'] // Dark mode colors
          : ['#36A2EB', '#FF6384'], // Light mode colors
        hoverBackgroundColor: isDarkMode
          ? ['#9C27B0', '#EC407A'] // Dark mode colors
          : ['#36A2EB', '#FF6384'], // Light mode colors
      },
    ],
  };

  return <Pie data={pieData} />;
};

export default PieChart;
