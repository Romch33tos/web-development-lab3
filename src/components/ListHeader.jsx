import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTodos } from '../state/TodoContext.jsx';

export function ListHeader({ list }) {
  const { dispatch } = useTodos();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(list.title);

  function handleRename(event) {
    event.preventDefault();
    const value = title.trim();
    if (!value) return;
    dispatch({ type: 'list/renamed', id: list.id, title: value });
    setIsEditing(false);
  }

  function handleRemove() {
    if (!window.confirm(`Удалить список «${list.title}» и все его задачи?`)) return;
    dispatch({ type: 'list/removed', id: list.id });
    navigate('/');
  }

  if (isEditing) {
    return (
      <form className="list-header" onSubmit={handleRename}>
        <label className="visually-hidden" htmlFor="list-title-input">
          Название списка
        </label>
        <input
          id="list-title-input"
          type="text"
          value={title}
          maxLength={100}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <button type="submit">Сохранить</button>
        <button type="button" onClick={() => setIsEditing(false)}>Отмена</button>
      </form>
    );
  }

  return (
    <header className="list-header">
      <h2 className="list-header__title">{list.title}</h2>
      <div className="list-header__actions">
        <button type="button" onClick={() => setIsEditing(true)}>Переименовать</button>
        <button type="button" onClick={handleRemove}>Удалить</button>
      </div>
    </header>
  );
}
