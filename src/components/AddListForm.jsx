import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTodos } from '../state/TodoContext.jsx';

export function AddListForm() {
  const [title, setTitle] = useState('');
  const { dispatch } = useTodos();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const value = title.trim();
    if (!value) return;

    const newList = {
      id: crypto.randomUUID(),
      title: value,
    };

    dispatch({ type: 'list/added', list: newList });
    setTitle('');
    navigate(`/lists/${newList.id}`);
  }

  return (
    <form className="add-list-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="new-list-title">
        New list title
      </label>
      <input
        id="new-list-title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New list..."
        maxLength={100}
      />
      <button type="submit" className="add-list-form__button">
        Add
      </button>
    </form>
  );
}
