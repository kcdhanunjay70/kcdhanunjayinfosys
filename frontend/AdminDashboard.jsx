import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend
} from "recharts";

function AdminDashboard() {
  const [analytics, setAnalytics] = useState({});
  const [scoreData, setScoreData] = useState([]);
  const [attemptData, setAttemptData] = useState([]);
  const [topStudents, setTopStudents] = useState([]);
  const [recentSubmissions, setRecentSubmissions] = useState([]);

  const [filters, setFilters] = useState({
    exam_id: "",
    date: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllData();
  }, [filters]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get("/api/admin/full-analytics", {
        params: filters
      });

      setAnalytics(res.data.analytics || {});
      setScoreData(res.data.scoreDistribution || []);
      setAttemptData(res.data.attemptsPerExam || []);
      setTopStudents(res.data.topStudents || []);
      setRecentSubmissions(res.data.recentSubmissions || []);

    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2>Loading dashboard...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Admin Dashboard</h1>

      {/* 🔥 Filters */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        
        <input
          type="text"
          placeholder="Filter by Exam ID"
          value={filters.exam_id}
          onChange={(e) =>
            setFilters({ ...filters, exam_id: e.target.value })
          }
        />

        <input
          type="date"
          value={filters.date}
          onChange={(e) =>
            setFilters({ ...filters, date: e.target.value })
          }
        />

      </div>

      {/* 🔥 Charts */}
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>

        {/* Score Distribution */}
        <div>
          <h3>Score Distribution</h3>
          {scoreData.length === 0 ? (
            <p>No data available</p>
          ) : (
            <PieChart width={300} height={300}>
              <Pie
                data={scoreData}
                dataKey="value"
                nameKey="range"
                outerRadius={100}
                label
              >
                {scoreData.map((entry, index) => (
                  <Cell key={index} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          )}
        </div>

        {/* Attempts Per Exam */}
        <div>
          <h3>Attempts Per Exam</h3>
          {attemptData.length === 0 ? (
            <p>No data available</p>
          ) : (
            <BarChart width={400} height={300} data={attemptData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="exam_name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="attempts" />
            </BarChart>
          )}
        </div>

      </div>

      {/* 🔥 Top Students Table */}
      <div style={{ marginTop: "40px" }}>
        <h3>🏆 Top 10 Students</h3>
        {topStudents.length === 0 ? (
          <p>No data available</p>
        ) : (
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Exam</th>
              </tr>
            </thead>
            <tbody>
              {topStudents.map((s, i) => (
                <tr key={i}>
                  <td>{s.name}</td>
                  <td>{s.score}</td>
                  <td>{s.exam}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 🔥 Recent Submissions */}
      <div style={{ marginTop: "40px" }}>
        <h3>🕒 Recent Submissions</h3>
        {recentSubmissions.length === 0 ? (
          <p>No data available</p>
        ) : (
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>User</th>
                <th>Exam</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentSubmissions.map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td>
                  <td>{r.exam}</td>
                  <td>{r.score}</td>
                  <td>{new Date(r.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

export default AdminDashboard;