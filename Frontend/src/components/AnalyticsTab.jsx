import React, { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsTab = () => {
  const [dateRange, setDateRange] = useState("Last 30 days");

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Clicks",
        data: [12, 19, 15, 25, 22, 30, 28],
        fill: false,
        borderColor: "#00C464",
        tension: 0.4,
      },
    ],
  };

  const deviceChartData = {
    labels: ["iPhone", "iPad", "Mac", "Windows", "Android", "Other"],
    datasets: [
      {
        label: "Clicks by Device",
        data: [25, 10, 15, 20, 30, 5],
        backgroundColor: [
          "#00C464",
          "#34D399",
          "#6EE7B7",
          "#A7F3D0",
          "#D1FAE5",
          "#ECFDF5",
        ],
      },
    ],
  };

  const siteChartData = {
    labels: ["YouTube", "Facebook", "Instagram", "Twitter"],
    datasets: [
      {
        label: "Clicks by Site",
        data: [420, 230, 150, 100],
        backgroundColor: ["#FF0000", "#1877F2", "#E1306C", "#1DA1F2"],
        borderWidth: 0,
      },
    ],
  };

  const linkChartData = {
    labels: ["Link 1", "Link 2", "Link 3", "Link 4", "Link 5", "Link 6"],
    datasets: [
      {
        label: "Clicks by Link",
        data: [35, 45, 25, 60, 20, 40],
        backgroundColor: [
          "#00C464",
          "#34D399",
          "#00C464",
          "#34D399",
          "#00C464",
          "#34D399",
        ],
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div className="analytics-tab">
      <div className="analytics-header">
        <h1>Analytics</h1>
        <div className="date-range-selector">
          <button className="date-range-button">
            <Calendar size={16} />
            <span>{dateRange}</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="analytics-overview">
        <div className="overview-card">
          <h3>Clicks on Links</h3>
          <div className="stat-value">2,318</div>
        </div>
        <div className="overview-card">
          <h3>Clicks on Shop</h3>
          <div className="stat-value">7,265</div>
        </div>
        <div className="overview-card">
          <h3>CTR</h3>
          <div className="stat-value">156%</div>
        </div>
      </div>

      <div className="analytics-chart main-chart">
        <Line data={lineChartData} options={lineChartOptions} />
      </div>

      <div className="analytics-grid">
        <div className="analytics-chart">
          <h3>Traffic by Device</h3>
          <Bar data={deviceChartData} options={barChartOptions} />
        </div>
        <div className="analytics-chart">
          <h3>Sites</h3>
          <Pie data={siteChartData} options={pieChartOptions} />
        </div>
      </div>

      <div className="analytics-chart">
        <h3>Traffic by Links</h3>
        <Bar data={linkChartData} options={barChartOptions} />
      </div>
    </div>
  );
};

export default AnalyticsTab;