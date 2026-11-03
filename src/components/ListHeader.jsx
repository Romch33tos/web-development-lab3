import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTodos } from '../state/TodoContext.jsx';
import { ConfirmDialog } from './ConfirmDialog.jsx';
import { usePageFocus } from '../hooks/usePageFocus.js';

export function ListHeader({ list }) {
  const { dispatch } = useTodos();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(list.title);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const headingRef = usePageFocus();

  function handleRename(event) {
    event.preventDefault();
    const value = title.trim();
    if (!value) return;
    dispatch({ type: 'list/renamed', id: list.id, title: value });
    setIsEditing(false);
  }

  function handleRemove() {
    dispatch({ type: 'list/removed', id: list.id });
    setIsConfirmOpen(false);
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
          className="add-list-form__input"
          type="text"
          value={title}
          maxLength={100}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <button type="submit" className="alert__btn alert__btn--accent">Сохранить</button>
        <button type="button" className="alert__btn" onClick={() => setIsEditing(false)}>Отмена</button>
      </form>
    );
  }

  return (
    <>
      <header className="list-header">
        <h2 className="list-header__title" tabIndex={-1} ref={headingRef}>
          {list.title}
        </h2>
        <div className="list-header__actions">
          <button type="button" className="alert__btn" onClick={() => setIsEditing(true)}>Переименовать</button>
          <button type="button" className="alert__btn" onClick={() => setIsConfirmOpen(true)}>Удалить</button>
        </div>
      </header>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title={`Удалить список «${list.title}» и все его задачи?`}
        onConfirm={handleRemove}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  );
}
