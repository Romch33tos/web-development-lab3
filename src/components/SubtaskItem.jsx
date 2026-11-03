import { useTodos } from '../state/TodoContext.jsx';

export function SubtaskItem({ taskId, subtask }) {
  const { dispatch } = useTodos();

  return (
    <li className="subtask-item">
      <input
        type="checkbox"
        checked={subtask.done}
        onChange={() =>
          dispatch({ type: 'subtask/toggled', taskId, id: subtask.id })
        }
        aria-label={`Отметить подзадачу «${subtask.title}»`}
      />
      <span className={subtask.done ? 'subtask-title subtask-title--done' : 'subtask-title'}>
        {subtask.title}
      </span>
      <button
        type="button"
        onClick={() =>
          dispatch({ type: 'subtask/removed', taskId, id: subtask.id })
        }
        aria-label={`Удалить подзадачу «${subtask.title}»`}
      >
        ✕
      </button>
    </li>
  );
}
