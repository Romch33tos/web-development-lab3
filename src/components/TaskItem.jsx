import { Link, useSearchParams } from 'react-router';
import { useTodos } from '../state/TodoContext.jsx';

export function TaskItem({ task }) {
  const { dispatch } = useTodos();
  const [searchParams] = useSearchParams();

  const doneSubtasks = task.subtasks.filter((s) => s.done).length;
  const totalSubtasks = task.subtasks.length;

  function handleToggle() {
    dispatch({ type: 'task/toggled', id: task.id });
  }

  function handleRemove() {
    dispatch({ type: 'task/removed', id: task.id });
  }

  const queryString = searchParams.toString();
  const taskLink = `/lists/${task.listId}/tasks/${task.id}${queryString ? `?${queryString}` : ''}`;

  return (
    <li className={task.done ? 'task-item task-item--done' : 'task-item'}>
      <div className="task">
        <input
          className="task__check"
          type="checkbox"
          checked={task.done}
          onChange={handleToggle}
          aria-label={`Отметить «${task.title}» выполненной`}
        />
        <div className="task__content">
          <h3 className="task__title">
            <Link to={taskLink}>{task.title}</Link>
          </h3>
          {task.body && <p className="task__body">{task.body}</p>}
          {totalSubtasks > 0 && (
            <p className="task__progress">
              {doneSubtasks}/{totalSubtasks}
            </p>
          )}
        </div>
        <button
          className="task__delete"
          type="button"
          onClick={handleRemove}
          aria-label={`Удалить задачу «${task.title}»`}
        >
          <svg className="task__delete-icon" viewBox="0 0 32 32" aria-hidden="true">
            <line x1="10" y1="10" x2="22" y2="22" stroke="#FF8303" strokeWidth="2" strokeLinecap="round" />
            <line x1="22" y1="10" x2="10" y2="22" stroke="#FF8303" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </li>
  );
}
