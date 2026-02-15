/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";
import "./dashboard.css";

// ICONS
import {
  FaBook,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaRupeeSign,
} from "react-icons/fa";

// RECHARTS
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const AdminDashbord = ({ user }) => {
  const navigate = useNavigate();

  // 🔐 Admin protection
  if (user && user.role !== "admin") {
    navigate("/");
  }

  const [stats, setStats] = useState({
    totalCourses: 0,
    totalLectures: 0,
    totalUsers: 0,
    totalMaterials: 0,
  });

  // 📊 Fetch stats
  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setStats(data.stats);
    } catch (error) {
      console.log("Dashboard Stats Error:", error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  // 🥧 PIE DATA
  const pieData = [
    { name: "Courses", value: stats.totalCourses },
    { name: "Lectures", value: stats.totalLectures },
    { name: "Users", value: stats.totalUsers },
    { name: "Earnings", value: stats.totalMaterials },
  ];

  // 🎯 SCATTER DATA (FIXED)
  const scatterData = [
    { x: 1, y: stats.totalCourses, name: "Courses" },
    { x: 2, y: stats.totalLectures, name: "Lectures" },
    { x: 3, y: stats.totalUsers, name: "Users" },
    { x: 4, y: stats.totalMaterials, name: "Earnings" },
  ];

  const COLORS = ["#ffc107", "#00c49f", "#0088fe", "#4caf50"];

  return (
    <Layout>
      <div className="main-content">

        {/* ================= STAT CARDS ================= */}
        <div className="dashboard-boxes">

          <div className="box">
            <div className="icon course">
              <FaBook />
            </div>
            <p>Total Courses</p>
            <h2>{stats.totalCourses}</h2>
          </div>

          <div className="box">
            <div className="icon lecture">
              <FaChalkboardTeacher />
            </div>
            <p>Total Lectures</p>
            <h2>{stats.totalLectures}</h2>
          </div>

          <div className="box">
            <div className="icon user">
              <FaUserGraduate />
            </div>
            <p>Total Users</p>
            <h2>{stats.totalUsers}</h2>
          </div>

          <div className="box">
            <div className="icon earning">
              <FaRupeeSign />
            </div>
            <p>Total Earnings</p>
            <h2>₹ {stats.totalMaterials}</h2>
          </div>

        </div>

        {/* ================= CHARTS ================= */}
        <div className="chart-container">

          {/* 🥧 PIE CHART */}
          <div className="chart-box">
            <h3>Platform Overview</h3>
            <PieChart width={320} height={320}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                dataKey="value"
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* 🎯 SCATTER CHART (FIXED & WORKING) */}
          <div className="chart-box">
            <h3>Stats Distribution</h3>
            <ScatterChart width={400} height={320}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                type="number"
                dataKey="x"
                tickFormatter={(value) =>
                  ["", "Courses", "Lectures", "Users", "Earnings"][value]
                }
              />

              <YAxis type="number" dataKey="y" />

              <Tooltip
                formatter={(value, name, props) => [
                  value,
                  props.payload.name,
                ]}
              />

              <Scatter data={scatterData} fill="#7f3bd4" />
            </ScatterChart>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default AdminDashbord;
