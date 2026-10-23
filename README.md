# Watchlist

A film watchlist built with React and Vite. Add films you want to watch, mark
them off once you have, rate them with stars, and keep notes. Everything is
saved in your browser's localStorage, so your list is still there next time.

## What it does

- Add a film with a title, an optional genre, and an optional note
- New films start as "Want to Watch" with no rating
- Mark a film as watched, or move a watched film back to the watchlist
- Edit genre, notes, and star ratings at any time
- Rate films from one to five stars by clicking them
- Filter by All, Want to Watch, or Watched
- Search titles, genres and notes within the selected status; sort by newest,
  title or rating without changing the saved order
- See totals for films, watched, want to watch, and the average rating of
  watched films
- Newest films show up first
- Friendly messages when the list or a filter view is empty
- Your list is saved automatically and reloaded on your next visit

Titles are required, blank or spaces-only titles are ignored, and duplicate
titles are turned away.
Title matching also normalizes repeated spaces and Unicode-width variants.
If browser storage cannot save a change, a visible warning appears. Invalid
saved records are kept in storage but excluded from the displayed collection.
Run `npm test`, `npm run lint` and `npm run build` before releasing.

## Running it locally

You need Node.js 18 or newer.

```bash
npm install
npm run dev
```

Vite prints a local URL (usually http://localhost:5173). Open it in your
browser.

To make a production build:

```bash
npm run build
npm run preview
```

## Deploying to GitHub Pages

The repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.
Once the repo is on GitHub, open **Settings → Pages**, set the source to
**GitHub Actions**, and every push to `main` builds and publishes the site.

## Project layout

```
src/
  components/
    AddFilmForm.jsx   the add-a-film form and validation
    FilmCard.jsx      one film, with editing, rating, and actions
    FilmList.jsx      the grid of films and the empty states
    FilterTabs.jsx    All / Want to Watch / Watched tabs
    Summary.jsx       the totals row
    StarRating.jsx    the clickable star control
  App.jsx             state, localStorage, validation, and layout
  App.css             component styles
  index.css           base styles and the dark theme
  main.jsx            app entry point
```
