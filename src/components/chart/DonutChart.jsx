import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const DonutChart = ({ chartData }) => {
  return (
    <Doughnut
      data={chartData}
      height={40}
      width={40}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Expense Distribution",
          },
        },
      }}
    />
  );
};

export default DonutChart;
