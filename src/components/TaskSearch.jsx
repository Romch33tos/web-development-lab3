export function TaskSearch({ value, onChange, resultCount }) {
  return (
    <div className="task-search">
      <label className="visually-hidden" htmlFor="task-search-input">
        Search tasks
      </label>
      <input
        id="task-search-input"
        className="add-list-form__input"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
      />
      <p className="visually-hidden" aria-live="polite">
        Found tasks: {resultCount}
      </p>
    </div>
  );
}
