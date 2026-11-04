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
          aria-label={`Mark "${task.title}" as done`}
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
        
        <div className="task__actions">
          {/* Кнопка редактирования (карандаш) */}
          <Link 
            to={taskLink} 
            className="task__action-btn" 
            aria-label={`Edit task "${task.title}"`}
            title="Edit task"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </Link>

          {/* Кнопка удаления (крестик) */}
          <button
            className="task__action-btn"
            type="button"
            onClick={handleRemove}
            aria-label={`Delete task "${task.title}"`}
            title="Delete task"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
      </div>
    </li>
  );
}
