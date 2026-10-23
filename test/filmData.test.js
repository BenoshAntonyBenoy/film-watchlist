import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeTitle, selectFilms } from '../src/filmData.js'

const films = [
  { id: 'one', title: 'Arrival', genre: 'Sci-fi', note: 'Language', rating: 4, status: 'Watched', createdAt: 10 },
  { id: 'two', title: 'Dune', genre: 'Sci-fi', note: '', rating: 0, status: 'Want to Watch', createdAt: 20 },
  { id: 'three', title: 'Alien', genre: 'Horror', note: 'Space', rating: 5, status: 'Watched', createdAt: 30 },
]

test('search combines with status and matches title, genre and notes', () => {
  assert.deepEqual(selectFilms(films, { query: ' SCI-FI ', status: 'Watched' }).map((film) => film.id), ['one'])
  assert.deepEqual(selectFilms(films, { query: 'language' }).map((film) => film.id), ['one'])
  assert.equal(selectFilms(films, { query: 'absent' }).length, 0)
})

test('sorts are stable and never mutate the saved collection', () => {
  assert.deepEqual(selectFilms(films, { sort: 'title' }).map((film) => film.title), ['Alien', 'Arrival', 'Dune'])
  assert.deepEqual(selectFilms(films, { sort: 'rating' }).map((film) => film.rating), [5, 4, 0])
  assert.deepEqual(films.map((film) => film.id), ['one', 'two', 'three'])
  assert.equal(selectFilms([null, {}, ...films]).length, 3)
})

test('duplicate titles match whitespace and Unicode-width variants', () => {
  assert.equal(normalizeTitle('  The   Ｍａｔｒｉｘ '), normalizeTitle('the matrix'))
})
