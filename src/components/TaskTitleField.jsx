import { useState } from 'react';
import { useTodos } from '../state/TodoContext.jsx';

export function TaskTitleField({ task }) {
  const { dispatch } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.title);

  function save() {
    const trimmed = value.trim();
    if (!trimmed) {
      setValue(task.title);
      setIsEditing(false);
      return;
    }
    dispatch({ type: 'task/updated', id: task.id, changes: { title: trimmed } });
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      save();
    }
    if (e.key === 'Escape') {
      setValue(task.title);
      setIsEditing(false);
    }
  }

  if (isEditing) {
    return (
      <div className="task-card__title-field">
        <label className="visually-hidden" htmlFor="task-title-input">Название задачи</label>
        <input
          id="task-title-input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={save}
          onKeyDown={handleKeyDown}
          maxLength={100}
          autoFocus
        />
      </div>
    );
  }

  return (
    <h2
      className="task-card__title"
      tabIndex={0}
      onClick={() => {
        setValue(task.title);
        setIsEditing(true);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setValue(task.title);
          setIsEditing(true);
        }
      }}
      style={{ cursor: 'pointer' }}
    >
      {task.title}
    </h2>
  );
}
