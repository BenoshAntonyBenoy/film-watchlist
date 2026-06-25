function Summary({ total, watched, wantToWatch, averageRating }) {
  return (
    <section className="summary">
      <div className="summary-card">
        <span className="summary-value">{total}</span>
        <span className="summary-label">Films</span>
      </div>
      <div className="summary-card">
        <span className="summary-value">{watched}</span>
        <span className="summary-label">Watched</span>
      </div>
      <div className="summary-card">
        <span className="summary-value">{wantToWatch}</span>
        <span className="summary-label">Want to watch</span>
      </div>
      <div className="summary-card">
        <span className="summary-value">
          {averageRating === null ? '—' : averageRating.toFixed(1)}
        </span>
        <span className="summary-label">
          {averageRating === null ? 'No ratings yet' : 'Average rating'}
        </span>
      </div>
    </section>
  )
}

export default Summary
