import { useState } from 'react';
import { useTodos } from '../state/TodoContext.jsx';

export function TaskDescriptionField({ task }) {
  const { dispatch } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.body || '');

  function save() {
    dispatch({ type: 'task/updated', id: task.id, changes: { body: value.trim() } });
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      save();
    }
    if (e.key === 'Escape') {
      setValue(task.body || '');
      setIsEditing(false);
    }
  }

  if (isEditing) {
    return (
      <div className="task-card__desc-field">
        <label className="visually-hidden" htmlFor="task-desc-input">Описание задачи</label>
        <textarea
          id="task-desc-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={save}
          onKeyDown={handleKeyDown}
          maxLength={200}
          autoFocus
        />
      </div>
    );
  }

  return (
    <p
      className="task-card__desc"
      tabIndex={0}
      onClick={() => {
        setValue(task.body || '');
        setIsEditing(true);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setValue(task.body || '');
          setIsEditing(true);
        }
      }}
      style={{ cursor: 'pointer' }}
    >
      {task.body || 'Добавить описание...'}
    </p>
  );
}
