import { Link, useSearchParams, useNavigate } from 'react-router';
import { useTodos } from '../state/TodoContext.jsx';

export function TaskItem({ task }) {
  const { dispatch } = useTodos();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const doneSubtasks = task.subtasks.filter((s) => s.done).length;
  const totalSubtasks = task.subtasks.length;

  function handleToggle(e) {
    e.stopPropagation();
    dispatch({ type: 'task/toggled', id: task.id });
  }

  function handleRemove(e) {
    e.stopPropagation();
    dispatch({ type: 'task/removed', id: task.id });
  }

  const queryString = searchParams.toString();
  const taskLink = `/lists/${task.listId}/tasks/${task.id}${queryString ? `?${queryString}` : ''}`;

  return (
    <li className={task.done ? 'task task--done' : 'task'}>
      <div className="task" onClick={() => navigate(taskLink)} style={{ cursor: 'pointer' }}>
        <input
          className="task__check"
          type="checkbox"
          checked={task.done}
          onChange={handleToggle}
          onClick={(e) => e.stopPropagation()}
          aria-label={`Отметить «${task.title}» выполненной`}
        />
        <div className="task__content">
          <h3 className="task__title">
            {task.title}
          </h3>
          {task.body && <p className="task__body">{task.body}</p>}
          {totalSubtasks > 0 && (
            <p className="task__progress">
              {doneSubtasks}/{totalSubtasks}
            </p>
          )}
        </div>
        
        <div className="task__actions" onClick={(e) => e.stopPropagation()}>
          <Link to={taskLink} className="tool-btn" aria-label={`Редактировать задачу «${task.title}»`}>
            {/* Иконка карандаша (редактирование) прямо в коде */}
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </Link>
          
          <button
            className="task__delete"
            type="button"
            onClick={handleRemove}
            aria-label={`Удалить задачу «${task.title}»`}
          >
            <svg className="task__delete-icon" viewBox="0 0 32 32" aria-hidden="true">
              <line x1="10" y1="10" x2="22" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="22" y1="10" x2="10" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}
