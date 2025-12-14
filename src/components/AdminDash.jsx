import React, { useEffect, useState } from "react";
import { Scatter, Doughnut, Pie, Bar } from "react-chartjs-2";
import api from "../api/axios"; // Import our configured axios client
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const AdminDash = () => {
  // State for live data
  // State for live data - initialized with dummy data to preserve layout
  const [stats, setStats] = useState({
    total: 2671, // Original dummy value
    statusCounts: [45, 30, 25], // Original dummy distribution
    categoryCounts: [25, 35, 15, 25], // Original dummy distribution
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/complaints');
        const complaints = res.data;

        // Process Stats
        const total = complaints.length;

        // Status: solved (Resolved), unsolved (Pending), in progress (In Progress)
        // Note: doughnut labels are ["Solved", "Unsolved", "In Progress"]
        const solved = complaints.filter(c => c.status === 'Resolved').length;
        const unsolved = complaints.filter(c => c.status === 'Pending').length;
        const inProgress = complaints.filter(c => c.status === 'In Progress').length;

        // Category: ["IT Dept", "Maintenance Dept", "Academic Affairs", "Security"]
        // DB Categories: 'IT', 'Maintenance', 'Academics', 'Security'
        const it = complaints.filter(c => c.category === 'IT').length;
        const maint = complaints.filter(c => c.category === 'Maintenance').length;
        const acad = complaints.filter(c => c.category === 'Academics').length;
        const sec = complaints.filter(c => c.category === 'Security').length;

        setStats({
          total,
          statusCounts: [solved, unsolved, inProgress],
          categoryCounts: [it, maint, acad, sec]
        });

      } catch (error) {
        console.error("Error fetching admin data", error);
      }
    };

    fetchData();
  }, []);

  // Scatter Chart Data (Total Complaints over months) - Keeping dummy for visual consistency or creating random distribution
  const scatterData = {
    datasets: [
      {
        label: "Total",
        data: [
          { x: 0, y: -80 },
          { x: 1, y: 90 },
          { x: 2, y: -100 },
          { x: 2.5, y: -50 },
          { x: 3, y: 5 },
          { x: 3.5, y: -30 },
          { x: 4, y: -20 },
          { x: 5, y: 75 },
          { x: 5.5, y: 40 },
          { x: 6, y: 20 },
          { x: 7, y: -10 },
          { x: 8, y: -60 },
          { x: 9, y: -80 },
          { x: 10, y: 75 },
          { x: 10.5, y: 50 },
          { x: 11, y: 75 },
          { x: 12, y: 40 },
          { x: 13, y: 0 },
          { x: 14, y: -50 },
          { x: 15, y: 85 },
        ],
        backgroundColor: "#4A90E2",
        pointRadius: 6,
      },
    ],
  };

  const scatterOptions = {
    scales: {
      x: {
        type: "linear",
        min: 0,
        max: 16,
        ticks: {
          callback: function (value) {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
            const index = Math.floor(value / 2.3);
            return months[index] || "";
          },
          stepSize: 2.3,
        },
        grid: {
          display: false,
        },
      },
      y: {
        min: -100,
        max: 100,
        ticks: {
          stepSize: 50,
        },
        grid: {
          color: "#f0f0f0",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          boxWidth: 10,
        },
      },
    },
    maintainAspectRatio: false,
  };

  // Doughnut Chart (Status)
  const doughnutData = {
    labels: ["Solved", "Unsolved", "In Progress"],
    datasets: [
      {
        data: stats.statusCounts, // Use dynamic data
        backgroundColor: ["#2C3E89", "#9B59B6", "#E91E63"],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          usePointStyle: true,
          padding: 15,
        },
      },
    },
    maintainAspectRatio: false,
  };

  // Pie Chart (Department)
  const pieData = {
    labels: ["IT Dept", "Maintenance Dept", "Academic Affairs", "Security"],
    datasets: [
      {
        data: stats.categoryCounts, // Use dynamic data
        backgroundColor: ["#00CED1", "#E91E63", "#00FF7F", "#9B59B6"],
        borderWidth: 0,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          usePointStyle: true,
          padding: 10,
        },
      },
    },
    maintainAspectRatio: false,
  };

  // Bar Chart (Category) - Mapped to category counts for consistency
  const barData = {
    labels: ["IT", "Maint", "Acad", "Sec"],
    datasets: [
      {
        label: "Complaints",
        data: stats.categoryCounts.length === 4 ? stats.categoryCounts : [20, 35, 25, -15, 15, 50], // Fallback if data doesn't match
        backgroundColor: "#2C3E89",
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        min: -20, // Restored to match original design
        // max: 100, // Remove max to allow scaling
        ticks: {
          stepSize: 20, // Restored step size
        },
        grid: {
          color: "#f0f0f0",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}


      {/* Main Content */}
      <main className="my-container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

        {/* Top Row - Two Cards */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Total Complaints Scatter Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-500 text-sm uppercase mb-2">Total Complaints</p>
                <h3 className="text-4xl font-bold">{stats.total}</h3>
                <p className="text-gray-400 text-sm mt-1">Total Complaints Registered</p>
              </div>
              <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs">
                i
              </div>
            </div>
            <div className="h-64">
              <Scatter data={scatterData} options={scatterOptions} />
            </div>
          </div>

          {/* Status Doughnut Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-500 text-sm uppercase mb-2">Total Complaints</p>
                <p className="text-gray-400 text-sm">Solved and Unsolved Complaints</p>
              </div>
              <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs">
                i
              </div>
            </div>
            <div className="h-64 flex items-center justify-center">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>
        </div>

        {/* Bottom Row - Two Cards */}
        <div className="grid grid-cols-2 gap-6">
          {/* Department Pie Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-500 text-sm uppercase mb-2">Complaints by Department</p>
                <p className="text-gray-400 text-sm">Showing data of week</p>
              </div>
              <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs">
                i
              </div>
            </div>
            <div className="h-64 flex items-center justify-center">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>

          {/* Category Bar Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-500 text-sm uppercase mb-2">Complaint by Category</p>
                <p className="text-gray-400 text-sm">Source of Complaint</p>
              </div>
              <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs">
                i
              </div>
            </div>
            <div className="h-64">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDash;