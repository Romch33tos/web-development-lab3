import { useState } from 'react';
import { useTodos } from '../state/TodoContext.jsx';

export function AddTaskForm({ listId }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useTodos();

  function handleSubmit(event) {
    event.preventDefault();
    const value = title.trim();
    if (!value) {
      setError('Please enter a task title');
      return;
    }

    const newTask = {
      id: crypto.randomUUID(),
      listId,
      title: value,
      body: body.trim(),
      done: false,
      createdAt: Date.now(),
      subtasks: [],
    };

    dispatch({ type: 'task/added', task: newTask });
    setTitle('');
    setBody('');
    setError('');
  }

  return (
    <form className="add-form" onSubmit={handleSubmit} noValidate>
      <div className="add-form__inputs">
        <label className="visually-hidden" htmlFor="new-task-title">
          Task title
        </label>
        <input
          id="new-task-title"
          type="text"
          value={title}
          maxLength={100}
          placeholder="Task Title..."
          aria-invalid={error ? 'true' : undefined}
          aria-describedby="new-task-error"
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
        />
        <label className="visually-hidden" htmlFor="new-task-body">
          Task description
        </label>
        <input
          id="new-task-body"
          type="text"
          value={body}
          maxLength={200}
          placeholder="Task body about this task..."
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <button className="add-form__button" type="submit" aria-label="Add task">
        <span className="add-form__plus" aria-hidden="true"></span>
      </button>
      <p className="add-form__error" id="new-task-error" aria-live="polite">
        {error}
      </p>
    </form>
  );
}
