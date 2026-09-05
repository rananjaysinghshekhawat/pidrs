import { useEffect, useState } from "react";
import api from "../api/axios";
import ReportCard from "../components/ReportCard";

const MyReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const { data } = await api.get("/reports/my-reports");
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

  const handleDelete = async (id) => {
    if (!confirm("Delete this report?")) return;
    await api.delete(`/reports/${id}`);
    setReports(reports.filter((r) => r._id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto mt-14 px-6">
      <p className="text-xs text-ink/50 mb-2">Your filings</p>
      <h2 className="font-display font-700 text-3xl text-ink mb-8">My reports</h2>

      {loading ? (
        <p className="text-ink/50 text-sm">Loading…</p>
      ) : reports.length === 0 ? (
        <div className="ticket p-8 text-center">
          <p className="text-ink/60">You haven't filed any reports yet.</p>
          <p className="text-sm text-ink/40 mt-1">Spotted something broken? Report it and it'll show up here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reports.map((r) => (
            <ReportCard key={r._id} report={r} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReports;
