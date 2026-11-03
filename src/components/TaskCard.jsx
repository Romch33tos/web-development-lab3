import { Link, useParams, useSearchParams } from 'react-router';
import { useTodos } from '../state/TodoContext.jsx';
import { TaskTitleField } from './TaskTitleField.jsx';
import { TaskDescriptionField } from './TaskDescriptionField.jsx';
import { SubtaskList } from './SubtaskList.jsx';
import { AddSubtaskForm } from './AddSubtaskForm.jsx';
import { usePageFocus } from '../hooks/usePageFocus.js';

export function TaskCard() {
  const { listId, taskId } = useParams();
  const [searchParams] = useSearchParams();
  const { state } = useTodos();
  const headingRef = usePageFocus();

  const task = state.tasks.find(
    (t) => t.id === taskId && t.listId === listId
  );

  const queryString = searchParams.toString();
  const backLink = `/lists/${listId}${queryString ? `?${queryString}` : ''}`;

  if (!task) {
    return (
      <section className="task-card">
        <h2 tabIndex={-1} ref={headingRef}>Task not found</h2>
        <p>It might have been deleted.</p>
        <Link to={backLink}>Back to list</Link>
      </section>
    );
  }

  const done = task.subtasks.filter((s) => s.done).length;
  const total = task.subtasks.length;

  return (
    <section className="task-card" aria-labelledby="task-card-title">
      <h2 id="task-card-title" className="visually-hidden" tabIndex={-1} ref={headingRef}>
        Task Card: {task.title}
      </h2>
      <TaskTitleField task={task} />
      <TaskDescriptionField task={task} />

      <h3 className="task-card__subtitle">Subtasks</h3>
      {total > 0 && (
        <p className="task-card__progress">
          <progress value={done} max={total} />
          Completed {done} of {total}
        </p>
      )}

      <SubtaskList task={task} />
      <AddSubtaskForm taskId={task.id} />

      <Link to={backLink} className="task-card__close">
        Close card
      </Link>
    </section>
  );
}
