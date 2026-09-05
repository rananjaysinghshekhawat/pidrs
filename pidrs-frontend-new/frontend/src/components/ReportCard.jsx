const statusStyle = {
  Pending: "text-signal",
  "In Progress": "text-steel",
  Resolved: "text-civic",
};

const ReportCard = ({ report, isAuthority, onStatusChange, onDelete }) => {
  return (
    <div className="ticket flex flex-col overflow-hidden">
      {report.imageUrl && (
        <img src={report.imageUrl} alt={report.title} className="w-full h-40 object-cover" />
      )}

      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-ink leading-snug">{report.title}</h3>
          <span className={`stamp ${statusStyle[report.status]}`}>{report.status}</span>
        </div>

        <p className="text-xs uppercase tracking-wide text-ink/40">{report.category}</p>
        <p className="text-sm text-ink/70">{report.description}</p>

        {report.location?.address && (
          <p className="text-xs text-ink/45">Near {report.location.address}</p>
        )}
        {isAuthority && report.reportedBy?.name && (
          <p className="text-xs text-ink/45">Filed by {report.reportedBy.name}</p>
        )}
      </div>

      {(isAuthority || onDelete) && (
        <div className="perforation px-4 py-3 flex justify-between items-center">
          {isAuthority ? (
            <select
              value={report.status}
              onChange={(e) => onStatusChange(report._id, e.target.value)}
              className="border border-ink/20 rounded-sm px-2 py-1 text-sm bg-white focus-ring"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          ) : <span />}

          {onDelete && (
            <button
              onClick={() => onDelete(report._id)}
              className="text-signal text-xs hover:underline focus-ring"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportCard;
