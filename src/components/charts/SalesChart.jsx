import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function SalesChart({ salesData }) {
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Sales and Order Data",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const labels = salesData?.map((each) => each?.date);

  const data = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: salesData?.map((each) => each?.sales),
        borderColor: "#198753",
        backgroundColor: "rgba(42,117,83,0.5)",
        yAxisID: "y",
      },
      {
        label: "Orders",
        data: salesData?.map((each) => each?.numOrders),
        borderColor: "rgb(220,52,69)",
        backgroundColor: "rgba(201,68,82,0.5)",
        yAxisID: "y1",
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default SalesChart;
