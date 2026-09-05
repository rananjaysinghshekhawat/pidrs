import { useEffect, useState } from "react";
import api from "../api/axios";
import ReportCard from "../components/ReportCard";

const filters = ["All", "Pending", "In Progress", "Resolved"];

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const { data } = await api.get("/reports");
      setReports(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleStatusChange = async (id, status) => {
    const { data } = await api.put(`/reports/${id}/status`, { status });
    setReports(reports.map((r) => (r._id === id ? data : r)));
  };

  const filteredReports = filter === "All" ? reports : reports.filter((r) => r.status === filter);

  const stats = [
    { label: "Total filed", value: reports.length, tone: "text-ink" },
    { label: "Pending", value: reports.filter((r) => r.status === "Pending").length, tone: "text-signal" },
    { label: "In progress", value: reports.filter((r) => r.status === "In Progress").length, tone: "text-steel" },
    { label: "Resolved", value: reports.filter((r) => r.status === "Resolved").length, tone: "text-civic" },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-14 px-6">
      <p className="text-xs text-ink/50 mb-2">Authority view</p>
      <h2 className="font-display font-700 text-3xl text-ink mb-8">Dashboard</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="ticket p-4 text-center">
            <p className={`font-display text-3xl ${s.tone}`}>{s.value}</p>
            <p className="text-xs text-ink/50 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-6 border-b border-ink/15 pb-px">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-2 text-sm border-b-2 -mb-px focus-ring ${
              filter === f ? "border-amber text-ink font-medium" : "border-transparent text-ink/50 hover:text-ink"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-ink/50 text-sm">Loading…</p>
      ) : filteredReports.length === 0 ? (
        <div className="ticket p-8 text-center">
          <p className="text-ink/60">No reports in this queue.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredReports.map((r) => (
            <ReportCard key={r._id} report={r} isAuthority onStatusChange={handleStatusChange} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
