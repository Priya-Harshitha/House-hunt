function InquiriesList({ inquiries }) {
  if (inquiries.length === 0) return <p>No inquiries yet.</p>;

  return (
    <div className="inquiry-list">
      {inquiries.map((inq, idx) => (
        <div key={idx} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{inq.renter} → {inq.property}</h5>
            <p className="card-subtitle text-muted mb-2">Date: {inq.date}</p>
            <p className="card-text" style={{ whiteSpace: "pre-wrap" }}>{inq.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InquiriesList;


