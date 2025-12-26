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
        const solved = complaints.filter(c => (c.Status || c.status) === 'Resolved').length;
        const unsolved = complaints.filter(c => (c.Status || c.status) === 'Pending').length;
        const inProgress = complaints.filter(c => (c.Status || c.status) === 'In Progress').length;

        // Category: ["IT Dept", "Maintenance Dept", "Academic Affairs", "Security"]
        // Access nested category name safely. Handle potential array if association was hasMany.
        const getCatName = (c) => {
          if (!c.Category) return '';
          const catNameVal = c.Category.CategoryName || c.Category.CategoryNames;
          // If it's an array (old hasMany), take first. If object (new hasOne), take direct.
          const obj = Array.isArray(catNameVal) ? catNameVal[0] : catNameVal;
          return obj?.Category_name || '';
        };

        const it = complaints.filter(c => getCatName(c) === 'IT').length;
        const maint = complaints.filter(c => getCatName(c) === 'Maintenance').length;
        const acad = complaints.filter(c => getCatName(c) === 'Academic').length;
        const sec = complaints.filter(c => getCatName(c) === 'Security').length;

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
          { x: 0, y: 10 },
          { x: 1, y: 25 },
          { x: 2, y: 18 },
          { x: 3, y: 30 },
          { x: 4, y: 45 },
          { x: 5, y: 35 },
          { x: 6, y: 55 },
          { x: 7, y: 40 },
          { x: 8, y: 60 },
          { x: 9, y: 50 },
          { x: 10, y: 75 },
          { x: 11, y: 65 },
          { x: 12, y: 85 },
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
        max: 12,
        ticks: {
          callback: function (value) {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            return months[value] || "";
          },
          stepSize: 1,
          font: {
            size: 10 // Smaller font for mobile
          }
        },
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 25,
        },
        grid: {
          color: "#f0f0f0",
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Cleaner look
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
        position: "bottom", // Bottom legend for better mobile stacking
        labels: {
          usePointStyle: true,
          padding: 20,
          boxWidth: 10,
        },
      },
    },
    maintainAspectRatio: false,
  };

  // Pie Chart (Department)
  const pieData = {
    labels: ["IT Dept", "Maintenance", "Academic", "Security"],
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
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
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
        data: stats.categoryCounts, // Use dynamic data
        backgroundColor: "#2C3E89",
        borderRadius: 4,
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
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
      <main className="my-container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">Dashboard</h2>

        {/* Top Row - Two Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Total Complaints Scatter Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm uppercase font-semibold tracking-wider mb-1">Total Complaints</p>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">{stats.total}</h3>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">Total Complaints Registered</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
            </div>
            <div className="h-64 mt-4">
              <Scatter data={scatterData} options={scatterOptions} />
            </div>
          </div>

          {/* Status Doughnut Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm uppercase font-semibold tracking-wider mb-1">Complaint Status</p>
                <p className="text-gray-400 text-xs sm:text-sm">Solved vs Unsolved vs In Progress</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center relative">
              <Doughnut data={doughnutData} options={doughnutOptions} />
              {/* Optional: Center Text for Doughnut */}
              {/* <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400 pointer-events-none mb-6">Status</div> */}
            </div>
          </div>
        </div>

        {/* Bottom Row - Two Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Department Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm uppercase font-semibold tracking-wider mb-1">By Department</p>
                <p className="text-gray-400 text-xs sm:text-sm">Distribution across departments</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>

          {/* Category Bar Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm uppercase font-semibold tracking-wider mb-1">Volume by Dept</p>
                <p className="text-gray-400 text-xs sm:text-sm">Complaint volume overview</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
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