import { useState } from 'react'

function AddFilmForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const result = onAdd({
      title: title.trim(),
      genre: genre.trim(),
      note: note.trim(),
    })

    if (!result.ok) {
      setError(result.message)
      return
    }

    setTitle('')
    setGenre('')
    setNote('')
    setError('')
  }

  return (
    <section className="add-form card">
      <form onSubmit={handleSubmit} noValidate>
        <div className="add-row">
          <label className="field field-title">
            <span className="field-label">Title</span>
            <input
              type="text"
              placeholder="Add a film by title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>

          <label className="field">
            <span className="field-label">Genre</span>
            <input
              type="text"
              placeholder="Drama, sci-fi, anything (optional)"
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
            />
          </label>
        </div>

        <label className="field">
          <span className="field-label">Note</span>
          <input
            type="text"
            placeholder="Why this one? (optional)"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
        </label>

        <div className="add-actions">
          <button type="submit" className="btn btn-primary">
            Add film
          </button>
          {error && <p className="form-error">{error}</p>}
        </div>
      </form>
    </section>
  )
}

export default AddFilmForm
