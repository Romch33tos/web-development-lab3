import { useState } from 'react';
import { useTodos } from '../state/TodoContext.jsx';

export function AddSubtaskForm({ taskId }) {
  const [title, setTitle] = useState('');
  const { dispatch } = useTodos();

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    dispatch({
      type: 'subtask/added',
      taskId,
      subtask: {
        id: crypto.randomUUID(),
        title: trimmed,
        done: false,
      },
    });
    setTitle('');
  }

  return (
    <form className="add-subtask-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="new-subtask">
        New subtask
      </label>
      <input
        id="new-subtask"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New subtask..."
        maxLength={100}
      />
      <button type="submit" className="alert__btn">Add</button>
    </form>
  );
}
