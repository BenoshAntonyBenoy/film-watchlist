import { useEffect, useMemo, useState } from 'react'
import AddFilmForm from './components/AddFilmForm.jsx'
import FilterTabs from './components/FilterTabs.jsx'
import FilmList from './components/FilmList.jsx'
import Summary from './components/Summary.jsx'
import './App.css'

const STORAGE_KEY = 'film-watchlist:films'
const WANT = 'Want to Watch'
const WATCHED = 'Watched'
const FILTERS = ['All', WANT, WATCHED]

function loadFilms() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function App() {
  const [films, setFilms] = useState(loadFilms)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(films))
  }, [films])

  function addFilm({ title, genre, note }) {
    if (!title) {
      return { ok: false, message: 'Type a title before adding.' }
    }

    const exists = films.some(
      (film) => film.title.toLowerCase() === title.toLowerCase(),
    )
    if (exists) {
      return { ok: false, message: 'That film is already on your list.' }
    }

    const film = {
      id: crypto.randomUUID(),
      title,
      genre,
      note,
      status: WANT,
      rating: 0,
      createdAt: Date.now(),
    }
    setFilms((current) => [film, ...current])
    return { ok: true }
  }

  function toggleStatus(id) {
    setFilms((current) =>
      current.map((film) =>
        film.id === id
          ? { ...film, status: film.status === WATCHED ? WANT : WATCHED }
          : film,
      ),
    )
  }

  function deleteFilm(id) {
    setFilms((current) => current.filter((film) => film.id !== id))
  }

  function updateFilm(id, changes) {
    setFilms((current) =>
      current.map((film) => (film.id === id ? { ...film, ...changes } : film)),
    )
  }

  function rateFilm(id, rating) {
    updateFilm(id, { rating })
  }

  const sorted = useMemo(
    () => [...films].sort((a, b) => b.createdAt - a.createdAt),
    [films],
  )

  const visibleFilms = useMemo(() => {
    if (filter === 'All') return sorted
    return sorted.filter((film) => film.status === filter)
  }, [sorted, filter])

  const counts = useMemo(
    () => ({
      All: films.length,
      [WANT]: films.filter((film) => film.status === WANT).length,
      [WATCHED]: films.filter((film) => film.status === WATCHED).length,
    }),
    [films],
  )

  const averageRating = useMemo(() => {
    const rated = films.filter(
      (film) => film.status === WATCHED && film.rating > 0,
    )
    if (rated.length === 0) return null
    const sum = rated.reduce((total, film) => total + film.rating, 0)
    return sum / rated.length
  }, [films])

  return (
    <div className="page">
      <header className="masthead">
        <div className="brand">
          <span className="brand-mark">▦</span>
          <div>
            <h1>Watchlist</h1>
            <p>The films you mean to get to, and the ones you finally did.</p>
          </div>
        </div>
      </header>

      <Summary
        total={counts.All}
        watched={counts[WATCHED]}
        wantToWatch={counts[WANT]}
        averageRating={averageRating}
      />

      <AddFilmForm onAdd={addFilm} />

      <FilterTabs
        filters={FILTERS}
        active={filter}
        counts={counts}
        onChange={setFilter}
      />

      <FilmList
        films={visibleFilms}
        filter={filter}
        onToggleStatus={toggleStatus}
        onDelete={deleteFilm}
        onUpdate={updateFilm}
        onRate={rateFilm}
      />
    </div>
  )
}

export default App
