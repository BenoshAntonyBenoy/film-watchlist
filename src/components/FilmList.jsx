import FilmCard from './FilmCard.jsx'

const EMPTY_MESSAGES = {
  All: {
    title: 'Nothing here yet',
    body: 'Add your first film using the form above.',
  },
  'Want to Watch': {
    title: 'Your watchlist is clear',
    body: "Add a film to watch, or check what you've already seen.",
  },
  Watched: {
    title: 'No watched films yet',
    body: "Mark something as watched and it'll show up here.",
  },
}

function FilmList({ films, filter, onToggleStatus, onDelete, onUpdate, onRate }) {
  if (films.length === 0) {
    const message = EMPTY_MESSAGES[filter] || EMPTY_MESSAGES.All
    return (
      <div className="empty-state card">
        <p className="empty-title">{message.title}</p>
        <p className="empty-body">{message.body}</p>
      </div>
    )
  }

  return (
    <div className="film-grid">
      {films.map((film) => (
        <FilmCard
          key={film.id}
          film={film}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onRate={onRate}
        />
      ))}
    </div>
  )
}

export default FilmList
