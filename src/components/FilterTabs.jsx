function FilterTabs({ filters, active, counts, onChange }) {
  return (
    <div className="filter-tabs" role="tablist">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          role="tab"
          aria-selected={active === filter}
          className={`tab ${active === filter ? 'tab-active' : ''}`}
          onClick={() => onChange(filter)}
        >
          {filter}
          <span className="tab-count">{counts[filter]}</span>
        </button>
      ))}
    </div>
  )
}

export default FilterTabs
