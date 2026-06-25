const STARS = [1, 2, 3, 4, 5]

function StarRating({ value, onChange }) {
  function handleClick(star) {
    onChange(star === value ? 0 : star)
  }

  return (
    <div className="stars" role="group" aria-label="Your rating">
      {STARS.map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${star <= value ? 'star-filled' : ''}`}
          onClick={() => handleClick(star)}
          aria-label={`${star} star${star === 1 ? '' : 's'}`}
          aria-pressed={star <= value}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export default StarRating
