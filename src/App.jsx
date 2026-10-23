import { useEffect, useMemo, useState } from 'react'
import AddFilmForm from './components/AddFilmForm.jsx'
import FilterTabs from './components/FilterTabs.jsx'
import FilmList from './components/FilmList.jsx'
import Summary from './components/Summary.jsx'
import { normalizeTitle, selectFilms } from './filmData.js'
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
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('newest')
  const [storageError, setStorageError] = useState(false)
  const usableFilms = useMemo(() => selectFilms(films), [films])

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(films)); setStorageError(false) }
    catch { setStorageError(true) }
  }, [films])

  function addFilm({ title, genre, note }) {
    if (!title) {
      return { ok: false, message: 'Type a title before adding.' }
    }

    const exists = usableFilms.some(
      (film) => normalizeTitle(film.title) === normalizeTitle(title),
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
          film?.id === id
          ? { ...film, status: film.status === WATCHED ? WANT : WATCHED }
          : film,
      ),
    )
  }

  function deleteFilm(id) {
    setFilms((current) => current.filter((film) => film?.id !== id))
  }

  function updateFilm(id, changes) {
    setFilms((current) =>
      current.map((film) => (film?.id === id ? { ...film, ...changes } : film)),
    )
  }

  function rateFilm(id, rating) {
    updateFilm(id, { rating })
  }

  const visibleFilms = useMemo(() => {
    return selectFilms(usableFilms, { status: filter, query, sort })
  }, [usableFilms, filter, query, sort])

  const counts = useMemo(
    () => ({
      All: usableFilms.length,
      [WANT]: usableFilms.filter((film) => film.status === WANT).length,
      [WATCHED]: usableFilms.filter((film) => film.status === WATCHED).length,
    }),
    [usableFilms],
  )

  const averageRating = useMemo(() => {
    const rated = usableFilms.filter(
      (film) => film.status === WATCHED && film.rating > 0,
    )
    if (rated.length === 0) return null
    const sum = rated.reduce((total, film) => total + film.rating, 0)
    return sum / rated.length
  }, [usableFilms])

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

      <p className="storage-note">Your list stays in this browser. Clearing site data removes it.</p>
      {storageError && <p className="form-error" role="alert">Your changes could not be saved in this browser. Keep this tab open to avoid losing them.</p>}
      {usableFilms.length !== films.length && <p role="alert">Some saved entries could not be displayed. They remain in browser storage.</p>}
      <div className="list-tools">
        <label className="field"><span className="field-label">Search films, genres or notes</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <label className="field"><span className="field-label">Sort films</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="newest">Newest first</option><option value="title">Title A–Z</option><option value="rating">Highest rated</option></select></label>
        <p role="status">{visibleFilms.length} of {usableFilms.length} films</p>
      </div>

      <FilterTabs
        filters={FILTERS}
        active={filter}
        counts={counts}
        onChange={setFilter}
      />

      <FilmList
        films={visibleFilms}
        filter={filter}
        searching={!!query.trim()}
        onToggleStatus={toggleStatus}
        onDelete={deleteFilm}
        onUpdate={updateFilm}
        onRate={rateFilm}
      />
    </div>
  )
}

export default App
