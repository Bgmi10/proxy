import { useEffect, useState } from "react";
import axios from "axios";

const basurl = import.meta.env.VITE_BASEURL
function App() {
  const [stats, setStats] = useState({ active: 0, failed: 0, retries: 0 , success: 0, successRate: 0, totalStarted: 0 });

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await axios.get(`${basurl}/stats`);
      setStats(res.data);
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  function Card({ title, value }) {
    return (
      <div style={{
        padding: "20px",
        borderRadius: "16px",
        background: "#1e293b",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        transition: "0.3s"
      }}>
        <h3 style={{ opacity: 0.7 }}>{title}</h3>
        <p style={{ fontSize: "28px", marginTop: "10px", transition: "all 0.3s ease" }}>
         {value}
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px", fontFamily: "monospace", background: "#0f172a", color: "#fff", minHeight: "100vh" }}>
    <h1 style={{ marginBottom: "30px" }}>⚡ Session Stability Dashboard</h1>
  
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
      
      <Card title="🟢 Active" value={stats.active} />
      <Card title="🔴 Failed" value={stats.failed} />
      <Card title="🔁 Retries" value={stats.retries} />
      <Card title="✅ Success" value={stats.success} />
      <Card title="📊 Success Rate" value={`${stats.successRate}%`} />
      <Card title="🚀 Total Sessions" value={stats.totalStarted} />
  
    </div>
  </div>
  );
}

export default App;