export const normalizeTitle = (value) => value.normalize('NFKC').trim().replace(/\s+/g, ' ').toLowerCase()

export function selectFilms(films, { status = 'All', query = '', sort = 'newest' } = {}) {
  const needle = normalizeTitle(query)
  const ids = new Set()
  return films.filter((film) => film && typeof film.title === 'string' && film.title.trim() && typeof film.id === 'string' && film.id
    && typeof film.genre === 'string' && typeof film.note === 'string'
    && ['Want to Watch', 'Watched'].includes(film.status)
    && Number.isFinite(film.createdAt) && Number.isInteger(film.rating) && film.rating >= 0 && film.rating <= 5)
    .filter((film) => { if (ids.has(film.id)) return false; ids.add(film.id); return true })
    .filter((film) => (status === 'All' || film.status === status)
      && (!needle || [film.title, film.genre, film.note].some((value) => typeof value === 'string' && normalizeTitle(value).includes(needle))))
    .sort((a, b) => sort === 'title' ? a.title.localeCompare(b.title)
      : sort === 'rating' ? b.rating - a.rating || b.createdAt - a.createdAt
        : b.createdAt - a.createdAt)
}
