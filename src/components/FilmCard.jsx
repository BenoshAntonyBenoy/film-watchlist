import StarRating from './StarRating.jsx'

function FilmCard({ film, onToggleStatus, onDelete, onUpdate, onRate }) {
  const isWatched = film.status === 'Watched'

  return (
    <article className={`film-card ${isWatched ? 'is-watched' : ''}`}>
      <div className="film-head">
        <h3 className="film-title">{film.title}</h3>
        <span className={`status-pill ${isWatched ? 'pill-watched' : 'pill-want'}`}>
          {film.status}
        </span>
      </div>

      <div className="film-fields">
        <label className="inline-field">
          <span className="inline-label">Genre</span>
          <input
            type="text"
            placeholder="Add a genre"
            value={film.genre}
            onChange={(event) => onUpdate(film.id, { genre: event.target.value })}
          />
        </label>

        <label className="inline-field">
          <span className="inline-label">Note</span>
          <input
            type="text"
            placeholder="Add a note"
            value={film.note}
            onChange={(event) => onUpdate(film.id, { note: event.target.value })}
          />
        </label>
      </div>

      <div className="film-rating">
        <span className="inline-label">Rating</span>
        <StarRating value={film.rating} onChange={(value) => onRate(film.id, value)} />
      </div>

      <div className="film-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onToggleStatus(film.id)}
        >
          {isWatched ? 'Move back to watchlist' : 'Mark as watched'}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => onDelete(film.id)}
        >
          Remove
        </button>
      </div>
    </article>
  )
}

export default FilmCard
