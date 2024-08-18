import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = ({ chartData }) => {
  return (
    <Pie
      data={chartData}
      height={50}
      width={50}
    />
  );
};

export default PieChart;
