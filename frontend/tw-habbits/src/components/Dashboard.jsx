/*
Dashboard component
It displays a personalized user progress using different charts.
*/

import React from 'react';
import PieChart from './PieChart'; 
import BarChart from './BarChart'; 
import DashboardIntro from './DashboardIntro';

const Dashboard = ({ isDarkMode }) => {
  // Sample data for the pie chart
  const dailySuccessData = [80, 20]; // 80% success, 20% failure

  // Sample data for the bar chart
  const competitionData = {
    labels: ['You', 'Alice', 'Charlie'],
    values: [75, 60, 90], // Completion percentages
  };

  return (
    <div className="mx-auto py-6 sm:px-6 lg:px-8 dark:bg-slate-900">
      <div className="px-4 py-6 sm:px-0">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Hello, Meital</h2>
        <div>
          <DashboardIntro/>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-2 bg-white border border-slate-900 overflow-hidden shadow rounded-lg p-5 dark:bg-slate-800">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Competition with Friends
              </h3>
              <BarChart data={competitionData} width={800} height={400} />
          </div>
          <div className="bg-white border border-slate-900 overflow-hidden shadow rounded-lg p-5 dark:bg-slate-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Daily Success Rate
            </h3>
            <PieChart data={dailySuccessData} isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
